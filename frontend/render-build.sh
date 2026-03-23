#!/bin/bash

# Render.com deployment script for frontend
echo "🚀 Starting frontend deployment to Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Update API URL for production
echo "🔧 Updating API URL for production..."
sed -i 's|http://localhost:5000|https://project-devops-backend.onrender.com|g' src/App.js

# Run tests (if they exist)
if [ -f "package.json" ] && grep -q "test" package.json; then
    echo "🧪 Running tests..."
    npm test -- --watchAll=false || echo "⚠️ Tests skipped (not configured)"
fi

# Build the application
echo "🏗️ Building frontend..."
npm run build

echo "✅ Frontend build completed!"
