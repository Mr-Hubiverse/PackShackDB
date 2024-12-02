
# PackShackDB

PackShackDB is a media management backend designed to handle audio files, metadata, and related data such as sample packs, manufacturers, and categories. It supports file uploads, metadata extraction, and offers an API for managing and querying audio files.

## ✨ Features

- Upload and process audio files with automatic validation
- Generate and store audio file fingerprints for duplicate detection
- Comprehensive metadata extraction:
  - Duration, sample rate, BPM
  - Format details and technical specifications
  - Embedded metadata parsing
- Audio file categorization system:
  - Manufacturer management
  - Sample pack organization
  - Custom category tagging
- Health check endpoint for monitoring API status
- Rate limiting and security measures for uploads
- Docker containerization for easy deployment

## 🚀 Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (or a compatible database)
- **FFmpeg** for audio processing
- **Chromaprint** for audio fingerprinting
- **Docker** and **Docker Compose** for containerized deployment

## 💻 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/PackShackDB.git
cd PackShackDB
```

### 2. Configure Docker Environment

The project uses Docker Compose for containerization. You'll need to:

1. Review and modify `docker-compose.yml`:
   - Update volume mappings to match your host system paths
   - Choose between:
     - Using a Docker macvlan named "Lan" (current setup)
     - Creating a bridge network (simpler deployment)

2. Update API endpoints in:
   - Frontend: [`frontend/src/App.js`](frontend/src/App.js)
   - Upload component: [`frontend/src/components/AudioFileUploader.js`](frontend/src/components/AudioFileUploader.js)
   - Backend: [`backend/server.js`](backend/server.js)

### 3. Build and Deploy

```bash
# Build Docker images
docker-compose build

# Start the containers
docker-compose up -d
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=packshack
DB_USER=your_username
DB_PASSWORD=your_password
API_PORT=3000
RATE_LIMIT=100
MAX_FILE_SIZE=100mb
```

### Network Configuration

#### Option 1: macvlan Network (Current Setup)
- Requires Docker macvlan network named "Lan"
- Provides direct network access to containers

#### Option 2: Bridge Network (Alternative)
- Simpler configuration
- Containers communicate through internal Docker network

## 📝 API Documentation

The API provides endpoints for:

- File upload and management
- Metadata operations
- Category and tag management
- Health monitoring

For detailed API documentation, see the [API Documentation README](https://github.com/Mr-Hubiverse/PackShackDB/blob/main/API_URL%20%26%20Other-Details.md).

## 📄 Related Files

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
- [Docker Setup](docker/README.md)

## 🖼️ Images

- ![PackShackDB Frontend](https://github.com/Mr-Hubiverse/PackShackDB/blob/main/PackShackDB-Frontend.png)

- ![PackShackDB pgAdmin](https://github.com/Mr-Hubiverse/PackShackDB/blob/main/PackShackDB-pgAdmin.png)

- ![Schema-Diagram](https://github.com/Mr-Hubiverse/PackShackDB/blob/main/Schema-Diagram.svg)

## 📋 Development Status

For information about the current development status of PackShackDB, see the [Development Status README](https://github.com/Mr-Hubiverse/PackShackDB/blob/main/PackShackDB-Development-Status.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔍 Support

For issues and feature requests, please use the GitHub issue tracker.
