# Simple Web Application with CI/CD Pipeline

![CI/CD Pipeline](https://github.com/GANESHSUTHOJU/Project-DevOps/workflows/CI%2CD%20Pipeline/badge.svg)
![Docker Build](https://github.com/GANESHSUTHOJU/Project-DevOps/workflows/Docker%20Build%20and%20Test/badge.svg)

A modern web application built with React frontend, Node.js backend, containerized with Docker, and deployed using GitHub Actions CI/CD pipeline.

## 🏗️ Architecture

- **Frontend**: React 18 with modern UI/UX
- **Backend**: Node.js with Express.js API
- **Containerization**: Docker and Docker Compose
- **CI/CD**: GitHub Actions with automated testing, building, and deployment
- **Security**: Integrated security scanning with Trivy
- **Monitoring**: Health checks and logging

## 📁 Project Structure

```
projectdev/
├── backend/                 # Node.js API server
│   ├── src/
│   ├── server.js           # Main application file
│   ├── package.json
│   ├── Dockerfile          # Production Docker image
│   └── Dockerfile.dev      # Development Docker image
├── frontend/               # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile          # Production Docker image
│   ├── Dockerfile.dev      # Development Docker image
│   └── nginx.conf          # Nginx configuration
├── .github/
│   └── workflows/
│       ├── ci-cd.yml       # Main CI/CD pipeline
│       └── docker-build.yml # Docker build and test
├── docker-compose.yml      # Production compose
├── docker-compose.dev.yml  # Development compose
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (2.0+)
- [Node.js](https://nodejs.org/) (18+) - for local development
- [Git](https://git-scm.com/)

### Option 1: Using Docker (Recommended)

#### Production Environment

```bash
# Clone the repository
git clone <repository-url>
cd projectdev

# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

Access the application at:
- Frontend: http://localhost
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

#### Development Environment

```bash
# Use development compose file
docker-compose -f docker-compose.dev.yml up -d

# View development logs
docker-compose -f docker-compose.dev.yml logs -f
```

Access the development application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Option 2: Local Development

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## 🧪 Testing

### Run Tests Locally

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Run Tests with Docker

```bash
# Build and test with Docker Compose
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
```

## 🔄 CI/CD Pipeline

### Pipeline Stages

1. **Test**: Run unit and integration tests
2. **Security Scan**: Vulnerability scanning with Trivy
3. **Build**: Build Docker images
4. **Push**: Push images to container registry
5. **Deploy**: Deploy to staging/production environments
6. **Notify**: Send deployment notifications

### Branch Strategy

- `main`: Production deployments
- `develop`: Staging deployments
- `feature/*`: Feature branches (tested only)

### Environment Variables

Create GitHub repository secrets:

```bash
# Required for container registry
GITHUB_TOKEN: Automatically provided by GitHub Actions

# Optional: Add your deployment secrets
DEPLOY_HOST: Your deployment server
DEPLOY_USER: SSH user for deployment
DEPLOY_KEY: SSH private key for deployment
SLACK_WEBHOOK: For Slack notifications
```

## 🐳 Docker Commands

### Build Images

```bash
# Build backend image
docker build -t webapp-backend ./backend

# Build frontend image
docker build -t webapp-frontend ./frontend
```

### Run Containers

```bash
# Run backend
docker run -d -p 5000:5000 --name backend webapp-backend

# Run frontend
docker run -d -p 80:80 --name frontend webapp-frontend
```

### Clean Up

```bash
# Stop and remove containers
docker-compose down -v

# Remove images
docker rmi webapp-backend webapp-frontend

# Clean up unused resources
docker system prune -a
```

## 📊 Monitoring and Health Checks

### Health Endpoints

- Backend Health: `GET /api/health`
- Frontend Health: HTTP 200 response on root path

### Logs

```bash
# View application logs
docker-compose logs -f backend
docker-compose logs -f frontend

# View specific service logs
docker logs <container-name>
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
NODE_ENV=production
PORT=5000
```

#### Frontend

Configuration is handled through nginx.conf in production.

### Customization

1. **Modify API Endpoints**: Edit `backend/server.js`
2. **Update UI Components**: Edit `frontend/src/App.js`
3. **Change Styling**: Edit `frontend/src/App.css`
4. **Update Docker Configuration**: Modify Dockerfiles and compose files

## 🚀 Deployment

### Manual Deployment

```bash
# Build and push to registry
docker build -t your-registry/webapp-backend:latest ./backend
docker build -t your-registry/webapp-frontend:latest ./frontend

docker push your-registry/webapp-backend:latest
docker push your-registry/webapp-frontend:latest
```

### Automated Deployment

The CI/CD pipeline automatically deploys when:
- Code is pushed to `main` (production)
- Code is pushed to `develop` (staging)

### Kubernetes Deployment

Use the generated `deployment-manifest.yml` for Kubernetes deployments:

```bash
kubectl apply -f deployment-manifest.yml
```

## 🔒 Security

### Security Features

- **Vulnerability Scanning**: Automated Trivy scans
- **Security Headers**: Nginx security configuration
- **Dependency Updates**: Regular dependency updates
- **Secrets Management**: GitHub repository secrets

### Security Best Practices

1. Regularly update dependencies
2. Use non-root users in containers
3. Implement rate limiting
4. Enable HTTPS in production
5. Monitor security advisories

## 🛠️ Troubleshooting

### Common Issues

#### Port Conflicts

```bash
# Check what's using ports
netstat -tulpn | grep :80
netstat -tulpn | grep :5000

# Kill processes using ports
sudo kill -9 <PID>
```

#### Docker Issues

```bash
# Reset Docker
docker system prune -a
docker volume prune

# Rebuild containers
docker-compose down -v
docker-compose up -d --build
```

#### Application Errors

```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Enter container for debugging
docker exec -it <container-name> sh
```

### Performance Optimization

1. **Image Size**: Use multi-stage builds
2. **Caching**: Implement proper caching strategies
3. **Resource Limits**: Set container resource limits
4. **Load Balancing**: Use multiple replicas

## 📚 API Documentation

### Endpoints

#### GET `/`
Returns server information

#### GET `/api/health`
Health check endpoint

#### GET `/api/users`
Returns list of users

#### POST `/api/users`
Creates a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Create pull request
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [GitHub Issues](../../issues)
3. Create a new issue with detailed information

## 🗺️ Roadmap

- [ ] Add authentication and authorization
- [ ] Implement database integration
- [ ] Add monitoring and alerting
- [ ] Implement caching strategies
- [ ] Add API documentation with Swagger
- [ ] Implement automated backups
- [ ] Add performance monitoring
- [ ] Implement blue-green deployments

---

**Built with ❤️ using modern web technologies**
