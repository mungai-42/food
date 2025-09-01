#!/bin/bash

# 🌱 Digi-Farm Deployment Script
# This script helps deploy the application to Vercel

echo "🚀 Starting Digi-Farm deployment process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is ready"

# Deploy Backend
echo "🏗️  Deploying Backend API..."
cd backend
vercel --prod

# Get backend URL
BACKEND_URL=$(vercel ls | grep digi-farm-backend | awk '{print $2}')
echo "✅ Backend deployed at: $BACKEND_URL"

# Deploy Frontend
echo "🎨 Deploying Frontend..."
cd ../frontend

# Update environment variable with backend URL
echo "REACT_APP_API_URL=$BACKEND_URL/api" > .env.production

vercel --prod

# Get frontend URL
FRONTEND_URL=$(vercel ls | grep digi-farm-frontend | awk '{print $2}')
echo "✅ Frontend deployed at: $FRONTEND_URL"

echo "🎉 Deployment complete!"
echo "🌐 Frontend: $FRONTEND_URL"
echo "🔌 Backend: $BACKEND_URL"
echo ""
echo "📝 Next steps:"
echo "1. Test the application at $FRONTEND_URL"
echo "2. Verify API endpoints at $BACKEND_URL/api/health"
echo "3. Check Vercel dashboard for any issues"
echo "4. Update custom domains if needed"
