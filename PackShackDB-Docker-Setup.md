# PackShackDB-Docker-Setup-Guide

Welcome to the **PackShackDB-Docker-Setup-Guide!** This document will help you set up Docker and run the `docker-compose.yml` file provided in the repository to get your PackShackDB environment up and running.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
   - [1. Install Docker](#1-install-docker)
   - [2. Install Docker Compose](#2-install-docker-compose)
   - [3. Clone the Repository](#3-clone-the-repository)
   - [4. Navigate to the Project Directory](#4-navigate-to-the-project-directory)
   - [5. Configure Environment Variables](#5-configure-environment-variables)
   - [6. Start the Docker Containers](#6-start-the-docker-containers)
3. [Accessing the Services](#accessing-the-services)
4. [Stopping the Containers](#stopping-the-containers)
5. [Troubleshooting](#troubleshooting)
6. [Additional Resources](#additional-resources)

## Prerequisites

- A machine running a recent version of **Linux**, **macOS**, or **Windows**.
- Administrative privileges to install software.
- Basic knowledge of command-line operations.

## Installation Steps

### 1. Install Docker

#### For Linux:

Follow the official Docker installation guide for your specific Linux distribution:

- **Ubuntu/Debian:**

  ```bash
  sudo apt update
  sudo apt install docker.io
  ```

  - **Fedora:**

    ```bash
    sudo dnf install docker
    ```

  - **Arch Linux:**

    ```bash
    sudo pacman -S docker
    ```

  After installation, start and enable Docker:

  ```bash
  sudo systemctl start docker
  sudo systemctl enable docker
  ```

#### For macOS:

Download and install Docker Desktop for Mac from the official website: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)

#### For Windows:

Download and install Docker Desktop for Windows: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

Note: Ensure that virtualization is enabled in your BIOS settings.

### 2. Install Docker Compose

Docker Compose is often included with Docker Desktop on macOS and Windows. For Linux users, you may need to install it separately.

For Linux:

Check the latest version on the Docker Compose GitHub releases page and replace `x.y.z` with the latest version.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/x.y.z/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Set the permissions:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

Verify the installation:

```bash
docker-compose --version
```

Alternatively, you can install Docker Compose using `pip`:

```bash
sudo pip install docker-compose
```

### 3. Clone the Repository

Use `git` to clone the PackShackDB repository to your local machine:

```bash
git clone https://github.com/Mr-Hubiverse/PackShackDB.git
```

If you don't have `git` installed, you can download the repository as a ZIP file from GitHub and extract it.

### 4. Navigate to the Project Directory

Change your current directory to the cloned repository:

```bash
cd PackShackDB
```

### 5. Configure Environment Variables

This project uses two environment variable files: `frontend.env` and `backend.env`. These files are provided in the repository and contain configuration settings for the frontend and backend services, respectively.

Edit the Environment Files:

Open each environment file and set the necessary environment variables according to your setup.

`frontend.env`:

```
# Frontend environment variables
# Example:
REACT_APP_API_URL=http://localhost:5000/api
```

`backend.env`:

```
# Backend environment variables
# Example:
DATABASE_URL=postgresql://user:password@db:5432/packshackdb
```

Note: Replace the placeholders with your actual configuration settings. Ensure that sensitive information like passwords are kept secure.

### 6. Start the Docker Containers

Use Docker Compose to build and start the services defined in the `docker-compose.yml` file:

```bash
docker-compose up -d
```

The `-d` flag runs the containers in detached mode (in the background). Docker Compose will pull the necessary images, build the services, and start them.

## Accessing the Services

Once the containers are up and running, you can access the services as follows:

- Frontend Application: Visit `http://localhost:3000` (replace `3000` with the appropriate port if different).
- Backend API: Access the API at `http://localhost:5000/api` (replace `5000` with the appropriate port if different).

## Stopping the Containers

To stop and remove the containers, use:

```bash
docker-compose down
```

This command stops the containers and removes the networks created by Docker Compose. Data stored in volumes will persist unless you remove them explicitly.

## Troubleshooting

1. **Permission Denied Errors:**
   If you encounter permission issues, you may need to run commands with `sudo` (for Linux) or ensure your user is added to the docker group:

   ```bash
   sudo usermod -aG docker $USER
   ```

   Log out and log back in for the changes to take effect.

2. **Port Conflicts:**
   If a port is already in use, edit the `docker-compose.yml` file to change the exposed ports.

3. **Container Logs:**
   Check logs for a specific service:

   ```bash
   docker-compose logs service_name
   ```

   Replace `service_name` with the name defined in the `docker-compose.yml`.

4. **Rebuilding Containers:**
   If you make changes to the Dockerfile or configurations, rebuild the containers:

   ```bash
   docker-compose up -d --build
   ```

## Additional Resources

- Docker Documentation: [https://docs.docker.com/](https://docs.docker.com/)
- Docker Compose Documentation: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- Docker Cheat Sheet: [Docker Cheat Sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf)
