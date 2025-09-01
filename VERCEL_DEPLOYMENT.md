# 🚀 Vercel Deployment Guide for Digi-Farm

This guide will walk you through deploying both the frontend and backend of Digi-Farm to Vercel.

## 📋 Prerequisites

- GitHub account with your Digi-Farm repository
- Vercel account (free tier available)
- MongoDB Atlas database (already configured)

## 🔗 Step 1: Connect GitHub to Vercel

1. **Go to [Vercel](https://vercel.com) and sign in**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Select the `digi-farm` repository**

## 🏗️ Step 2: Deploy Backend API

### Configure Backend Project

1. **Project Name**: `digi-farm-backend` (or your preferred name)
2. **Framework Preset**: Select "Node.js"
3. **Root Directory**: `backend`
4. **Build Command**: Leave empty (not needed for API)
5. **Output Directory**: Leave empty
6. **Install Command**: `npm install`

### Environment Variables

Add these environment variables in the Vercel dashboard:

```env
MONGODB_URI=mongodb+srv://mungaisamuel624_db_user:XblLkU7hu9q6Xa9x@cluster0.kclxcyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_secure_jwt_secret_key_here
JWT_EXPIRE=24h
UPLOAD_PATH=./uploads/
MAX_FILE_SIZE=5242880
```

### Deploy Backend

1. **Click "Deploy"**
2. **Wait for deployment to complete**
3. **Note the deployment URL** (e.g., `https://digi-farm-backend.vercel.app`)

## 🎨 Step 3: Deploy Frontend

### Configure Frontend Project

1. **Create another project in Vercel**
2. **Project Name**: `digi-farm-frontend` (or your preferred name)
3. **Framework Preset**: Select "Create React App"
4. **Root Directory**: `frontend`
5. **Build Command**: `npm run build`
6. **Output Directory**: `build`
7. **Install Command**: `npm install`

### Environment Variables

Add these environment variables:

```env
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

**Important**: Replace `your-backend-url` with your actual backend Vercel URL.

### Deploy Frontend

1. **Click "Deploy"**
2. **Wait for deployment to complete**
3. **Note the deployment URL** (e.g., `https://digi-farm-frontend.vercel.app`)

## ⚙️ Step 4: Configure CORS

Update your backend `server.js` to allow your frontend domain:

```javascript
// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-url.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

## 🔄 Step 5: Update Frontend API URL

After backend deployment, update the frontend environment variable with the correct backend URL.

## 📱 Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Test the application functionality**
3. **Check that API calls work correctly**
4. **Verify authentication flows**

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check for syntax errors in your code

#### 2. Environment Variables
- Ensure all required variables are set
- Check for typos in variable names
- Verify MongoDB connection string

#### 3. CORS Errors
- Update CORS configuration with correct frontend URL
- Check browser console for CORS error messages

#### 4. API Endpoints Not Working
- Verify backend deployment URL
- Check environment variables in Vercel dashboard
- Test API endpoints directly

### Debug Commands

```bash
# Check backend logs in Vercel
vercel logs --follow

# Check frontend build logs
vercel logs --follow

# Test API endpoints
curl https://your-backend-url.vercel.app/api/health
```

## 🔧 Advanced Configuration

### Custom Domains

1. **In Vercel dashboard, go to your project**
2. **Click "Settings" → "Domains"**
3. **Add your custom domain**
4. **Configure DNS records as instructed**

### Environment-Specific Deployments

Create different environment configurations:

```bash
# Development
vercel --env MONGODB_URI=dev_mongodb_uri

# Production
vercel --env MONGODB_URI=prod_mongodb_uri --prod
```

### Automatic Deployments

- **GitHub Integration**: Automatic deployment on push to main branch
- **Preview Deployments**: Automatic deployment on pull requests
- **Branch Deployments**: Deploy different branches to different URLs

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Vercel Analytics** in your project settings
2. **Monitor performance metrics**
3. **Track user interactions**

### Error Monitoring

1. **Set up error logging** in your application
2. **Monitor Vercel function logs**
3. **Set up alerts for critical errors**

## 🔒 Security Considerations

### Environment Variables

- **Never commit sensitive data** to Git
- **Use Vercel's encrypted environment variables**
- **Rotate JWT secrets regularly**

### API Security

- **Implement rate limiting**
- **Validate all inputs**
- **Use HTTPS (automatic with Vercel)**

## 📈 Performance Optimization

### Frontend

- **Enable Vercel's Edge Network**
- **Optimize images and assets**
- **Implement lazy loading**

### Backend

- **Use Vercel's serverless functions efficiently**
- **Implement caching strategies**
- **Optimize database queries**

## 🎯 Next Steps

After successful deployment:

1. **Set up monitoring and logging**
2. **Configure custom domains**
3. **Set up CI/CD pipelines**
4. **Implement backup strategies**
5. **Plan for scaling**

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **GitHub Issues**: Create issues in your repository

---

**Happy Deploying! 🚀**
