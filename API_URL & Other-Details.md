# PackShackDB API URL Configuration Guide

[Previous sections remain the same...]

## CORS Configuration

### Direct CORS Setup (Backend)
```javascript
// backend/server.js
const cors = require('cors');

// Basic CORS setup
app.use(cors({
  origin: 'http://192.168.50.83:3000',       // Frontend URL
  credentials: true,                         // Allow credentials
  methods: ['GET', 'POST', 'OPTIONS'],       // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Multiple origins setup
const allowedOrigins = [
  'http://192.168.50.83:3000',
  'http://localhost:3000',
  'https://your-production-domain.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### CORS Headers for Specific Routes
```javascript
app.get('/api/download/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://192.168.50.83:3000');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Rest of your download logic...
});
```

## Reverse Proxy Configuration

### NGINX Reverse Proxy
```nginx
# /etc/nginx/conf.d/packshack.conf

# Frontend proxy
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://192.168.50.83:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API proxy
server {
    listen 80;
    server_name api.your-domain.com;

    # Handle CORS preflight requests
    location / {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'http://your-domain.com';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
            add_header 'Access-Control-Max-Age' 86400;
            return 204;
        }

        proxy_pass http://192.168.50.82:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' 'http://your-domain.com';
        add_header 'Access-Control-Allow-Credentials' 'true';
    }

    # Large file uploads configuration
    client_max_body_size 100M;
    proxy_read_timeout 300;
    proxy_connect_timeout 300;
    proxy_send_timeout 300;
}
```

### Docker Compose with NGINX
```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - app_network

  frontend:
    environment:
      - REACT_APP_API_URL=https://api.your-domain.com
    networks:
      - app_network

  backend:
    networks:
      - app_network

networks:
  app_network:
    driver: bridge
```

## API URL Configuration with Reverse Proxy

### Development
```javascript
// frontend/.env.development
REACT_APP_API_URL=http://localhost:3001/api

// Alternative with nginx
REACT_APP_API_URL=http://api.localhost/api
```

### Production
```javascript
// frontend/.env.production
REACT_APP_API_URL=https://api.your-domain.com/api
```

## Common Reverse Proxy Issues and Solutions

### 1. WebSocket Connection Issues
Add these headers in your NGINX configuration:
```nginx
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_http_version 1.1;
```

### 2. File Upload Issues
Adjust NGINX body size limits:
```nginx
client_max_body_size 100M;
```

### 3. Timeouts
Configure appropriate timeouts for large operations:
```nginx
proxy_connect_timeout 300;
proxy_send_timeout 300;
proxy_read_timeout 300;
send_timeout 300;
```

### 4. SSL/HTTPS Configuration
```nginx
server {
    listen 443 ssl;
    server_name api.your-domain.com;

    ssl_certificate /etc/nginx/ssl/your-cert.pem;
    ssl_certificate_key /etc/nginx/ssl/your-key.pem;
    
    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

    # Rest of your configuration...
}
```

Remember to:
1. Always test CORS configuration in development
2. Use secure HTTPS in production
3. Configure appropriate timeouts for your use case
4. Monitor proxy logs for issues
5. Implement proper error handling in both frontend and backend

