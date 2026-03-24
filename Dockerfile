# Production Dockerfile for backend
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY backend/server.js ./

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
