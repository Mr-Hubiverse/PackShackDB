# API_URL Configuration Guide for PackShackDB

## Introduction

This guide provides detailed instructions on setting up Cross-Origin Resource Sharing (CORS), configuring Nginx, and configuring the API URL for the PackShackDB program. Following these steps will ensure your application can communicate securely and efficiently with the PackShackDB API.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up CORS](#setting-up-cors)
3. [Configuring Nginx](#configuring-nginx)
4. [Setting the API URL for PackShackDB](#setting-the-api-url-for-packshackdb)
5. [Testing the Configuration](#testing-the-configuration)
6. [Troubleshooting](#troubleshooting)
7. [Conclusion](#conclusion)

## Prerequisites

1. **Server Access**: Ensure you have administrative access to your server.
2. **Nginx Installed**: Confirm that Nginx is installed on your server.
3. **PackShackDB Installed**: The PackShackDB application should be properly installed.

## Setting Up CORS

CORS is a security feature that allows controlled access to resources located outside of a given domain.

### Server-Side Configuration

1. **Install CORS Middleware (if necessary)**
   - For Node.js applications using Express:
     ```
     npm install cors
     ```
2. **Enable CORS in Your Application**
   - In your main server file (e.g., `app.js`), add:
     ```javascript
     const express = require('express');
     const cors = require('cors');
     const app = express();

     app.use(cors());

     // Rest of your server code
     ```
3. **Customize CORS Options (Optional)**
   - You can specify allowed origins and methods:
     ```javascript
     app.use(cors({
       origin: 'https://your-allowed-origin.com',
       methods: ['GET', 'POST']
     }));
     ```

### Nginx Configuration for CORS

1. **Edit Nginx Configuration File**
   ```
   sudo nano /etc/nginx/sites-available/default
   ```
2. **Add CORS Headers**
   - Inside the server block, add:
     ```nginx
     location / {
         add_header 'Access-Control-Allow-Origin' '*';
         add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
         add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';
         
         if ($request_method = 'OPTIONS') {
             return 204;
         }
         
         # Proxy settings
         proxy_pass http://localhost:3000;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
     }
     ```
     - Replace `http://localhost:3000` with your application's URL and port.
3. **Save and Exit**
   - Press `CTRL + X`, then `Y`, and `Enter` to save.
4. **Test Nginx Configuration**
   ```
   sudo nginx -t
   ```
5. **Restart Nginx**
   ```
   sudo systemctl restart nginx
   ```

## Configuring Nginx

Proper Nginx configuration ensures efficient request handling and can improve security.

1. **Open Nginx Configuration File**
   ```
   sudo nano /etc/nginx/sites-available/default
   ```
2. **Configure Server Block**
   - Update your server block as follows:
     ```nginx
     server {
         listen 80;
         server_name yourdomain.com www.yourdomain.com;

         location / {
             proxy_pass http://localhost:3000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }

         # Other configurations...
     }
     ```
     - Replace `yourdomain.com` with your actual domain and adjust the proxy settings as needed.
3. **Enable Site Configuration**
   - If you created a new config file:
     ```
     sudo ln -s /etc/nginx/sites-available/yourconfig /etc/nginx/sites-enabled/
     ```
4. **Test and Restart Nginx**
   ```
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Setting the API URL for PackShackDB

The API URL is crucial for your application to communicate with the PackShackDB API.

1. **Locate Configuration File**
   - Find where the API URL is set, such as in a `.env` file or a configuration file.
2. **Set the API URL**
   - In your `.env` file:
     ```
     API_URL=https://yourdomain.com/api
     ```
   - Or in your configuration file:
     ```javascript
     const API_URL = 'https://yourdomain.com/api';
     ```
3. **Update Application Code**
   - Ensure your application uses this API URL variable when making API requests.
4. **Restart Application**
   - Apply changes by restarting your application:
     - For PM2-managed applications:
       ```
       pm2 restart your-app-name
       ```

## Testing the Configuration

1. **Check CORS Headers**
   - Use cURL to verify CORS headers:
     ```
     curl -I https://yourdomain.com
     ```
   - Look for `Access-Control-Allow-Origin` in the response headers.
2. **Test API Requests**
   - From a client application or using tools like Postman, send a request to the API endpoint to ensure it's working.
3. **Browser Testing**
   - Access your application in a browser and check the console for any CORS-related errors.

## Troubleshooting

1. **CORS Errors Persist**
   - Double-check the allowed origins in your CORS configuration.
   - Ensure there are no typos in your Nginx or server configuration files.
2. **Nginx Fails to Restart**
   - Run `sudo nginx -t` to identify syntax errors.
   - Check for conflicting server blocks or ports.
3. **Environment Variables Not Loaded**
   - Confirm that the `.env` file is properly formatted.
   - Restart your application to load new environment variables.

## Conclusion

By following this guide, you have successfully set up CORS, configured Nginx, and set the API URL for the PackShackDB program. Your application should now be able to interact with the PackShackDB API seamlessly.
