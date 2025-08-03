#!/bin/bash

echo "🚀 Starting deployment process..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Build frontend
echo "🔨 Building frontend..."
cd frontend && npm run build && cd ..

echo "✅ Deployment preparation complete!"
echo "🌐 Your app is ready to deploy to Render!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Render"
echo "3. Set environment variables in Render dashboard"
echo "4. Deploy!" 