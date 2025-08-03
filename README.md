<<<<<<< HEAD
# 🚲 Bike Service Booking App

A full-stack web application for bike service booking and management. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **User Authentication**: Register and login for customers and service owners
- **Service Management**: Owners can add, edit, and delete bike services
- **Booking System**: Customers can book services with date selection
- **Booking Management**: Owners can update booking status (pending, ready, completed)
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Real-time Updates**: Live status updates and notifications

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 🚀 Deployment to Render

### Prerequisites
1. MongoDB Atlas account (free tier available)
2. Render account (free tier available)
3. GitHub repository with your code

### Step 1: Prepare Your Database

1. **Create MongoDB Atlas Cluster**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account
   - Create a new cluster (free tier)
   - Create a database user
   - Get your connection string

2. **Set up Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT tokens
   - `NODE_ENV`: Set to "production"

### Step 2: Deploy to Render

1. **Connect Your Repository**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**:
   ```
   Name: bike-service-app
   Environment: Node
   Build Command: npm install && cd backend && npm install && cd ../frontend && npm install && npm run build
   Start Command: cd backend && npm start
   ```

3. **Set Environment Variables**:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: 10000 (Render's default)

4. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### Step 3: Update Frontend API URLs

After deployment, update your frontend API calls to use the production URL:

```javascript
// In your frontend components, replace:
const API_URL = 'http://localhost:5000/api';

// With:
const API_URL = 'https://your-app-name.onrender.com/api';
```

## 📁 Project Structure

```
bike-service-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── package.json
└── render.yaml
```

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd bike-service-app
   ```

2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**:
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your MongoDB URI and JWT secret

4. **Start development servers**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Services
- `GET /api/services` - Get all services (public)
- `GET /api/services/owner` - Get owner's services
- `POST /api/services` - Create new service
- `DELETE /api/services/:id` - Delete service

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/owner` - Get owner's bookings
- `PUT /api/bookings/:id` - Update booking status

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS configuration for production
- Environment variable protection
- Input validation and sanitization

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 UI Features

- Modern gradient designs
- Smooth animations and transitions
- Loading states and error handling
- Beautiful cards and forms
- Status indicators and badges

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues during deployment:

1. Check Render logs for build errors
2. Verify environment variables are set correctly
3. Ensure MongoDB connection string is valid
4. Check CORS configuration for production

## 🚀 Live Demo

Your deployed app will be available at:
`https://your-app-name.onrender.com`

---

**Happy Deploying! 🚀** 
=======
# BikeService
>>>>>>> 543ebdcdf0cff747b7f319af04127eadf81c930c
