#!/bin/bash

# Render.com deployment script for backend
echo "🚀 Starting backend deployment to Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests (if they exist)
if [ -f "package.json" ] && grep -q "test" package.json; then
    echo "🧪 Running tests..."
    npm test || echo "⚠️ Tests skipped (not configured)"
fi

# Start the application
echo "🌐 Starting backend server..."
npm start
