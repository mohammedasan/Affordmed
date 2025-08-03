# 🚀 Render Deployment Guide

This guide will walk you through deploying your bike service app to Render step by step.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account**: For database (free tier available)

## 🗄️ Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (choose the free tier)

### 1.2 Configure Database
1. **Create Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set privileges to "Read and write to any database"

2. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Render deployment)
   - Click "Confirm"

3. **Get Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `bike-service`

**Example connection string:**
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/bike-service?retryWrites=true&w=majority
```

## 🌐 Step 2: Deploy to Render

### 2.1 Connect Your Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account if not already connected
4. Select your bike-service-app repository

### 2.2 Configure the Service

**Basic Settings:**
- **Name**: `bike-service-app` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build & Deploy Settings:**
- **Build Command**: 
  ```bash
  npm install && cd backend && npm install && cd ../frontend && npm install && npm run build
  ```
- **Start Command**: 
  ```bash
  cd backend && npm start
  ```

### 2.3 Set Environment Variables

Click "Environment" tab and add these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `MONGODB_URI` | Your MongoDB connection string | Database connection |
| `JWT_SECRET` | A secure random string | JWT token secret |
| `PORT` | `10000` | Render's default port |

**Generate JWT Secret:**
You can generate a secure JWT secret using:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Render will automatically start building and deploying your app
3. Wait for the build to complete (usually 5-10 minutes)

## 🔧 Step 3: Verify Deployment

### 3.1 Check Build Logs
- If build fails, check the logs in Render dashboard
- Common issues:
  - Missing environment variables
  - Incorrect MongoDB connection string
  - Build command errors

### 3.2 Test Your App
- Your app will be available at: `https://your-app-name.onrender.com`
- Test the following features:
  - User registration and login
  - Service creation (as owner)
  - Booking creation (as customer)
  - Status updates (as owner)

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check if all dependencies are in package.json
   - Verify build command is correct
   - Check for syntax errors in code

2. **Database Connection Error**:
   - Verify MongoDB URI is correct
   - Check if database user has proper permissions
   - Ensure network access allows Render's IPs

3. **CORS Errors**:
   - The app is configured to handle CORS automatically
   - If issues persist, check the CORS configuration in server.js

4. **Environment Variables**:
   - Double-check all environment variables are set
   - Ensure no typos in variable names or values

### Debug Steps:
1. Check Render logs for error messages
2. Verify MongoDB Atlas connection
3. Test API endpoints using Postman or similar tool
4. Check browser console for frontend errors

## 🔄 Step 4: Update Frontend API URLs

After successful deployment, your frontend will automatically use the correct API URLs thanks to the `apiService.js` configuration.

## 📊 Monitoring

### Render Dashboard Features:
- **Logs**: View real-time application logs
- **Metrics**: Monitor CPU, memory usage
- **Deployments**: Track deployment history
- **Environment**: Manage environment variables

### Health Checks:
- Your app includes a health check endpoint: `/api/services`
- Render will monitor this endpoint for uptime

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **JWT Secret**: Use a strong, random secret
3. **MongoDB**: Use strong passwords for database users
4. **CORS**: Configured to only allow your domain in production

## 🚀 Advanced Configuration

### Custom Domain (Optional):
1. Go to your service settings in Render
2. Click "Custom Domains"
3. Add your domain and configure DNS

### Auto-Deploy:
- Render automatically deploys when you push to your main branch
- You can disable this in service settings

## 📞 Support

If you encounter issues:

1. **Check Render Documentation**: [docs.render.com](https://docs.render.com)
2. **MongoDB Atlas Support**: Available in Atlas dashboard
3. **Application Logs**: Check Render logs for specific errors

## 🎉 Success!

Once deployed, your bike service app will be live at:
`https://your-app-name.onrender.com`

**Features Available:**
- ✅ User registration and authentication
- ✅ Service management for owners
- ✅ Booking system for customers
- ✅ Real-time status updates
- ✅ Beautiful, responsive UI
- ✅ Mobile-friendly design

---

**Happy Deploying! 🚀** 