import React, { useState } from 'react';
import axios from 'axios';

const DownloadButton = ({ fileId, originalFilename }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    
    try {
      const response = await axios({
        url: `http://192.168.50.83:3001/api/download/${fileId}`,
        method: 'GET',
        responseType: 'blob',
        withCredentials: true,
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/*'
        }
      });

      // Handle error responses that might come as JSON
      if (response.data.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          const error = JSON.parse(reader.result);
          throw new Error(error.message || 'Download failed');
        };
        reader.readAsText(response.data);
        return;
      }

      // Create blob URL and trigger download
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Get filename from Content-Disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      const downloadFilename = contentDisposition 
        ? decodeURIComponent(contentDisposition.split('filename="')[1].split('"')[0])
        : originalFilename || 'download';

      link.href = url;
      link.download = downloadFilename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download error:', error);
      alert(error.message || 'Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="download-button-container">
      <button 
        onClick={handleDownload}
        disabled={isDownloading}
        className={`download-button ${isDownloading ? 'downloading' : ''}`}
      >
        {isDownloading 
          ? `Downloading... ${progress}%` 
          : 'Download'}
      </button>
      {isDownloading && progress > 0 && progress < 100 && (
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default DownloadButton;