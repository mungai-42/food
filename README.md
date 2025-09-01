# 🌱 Digi-Farm MVP

A comprehensive digital farming platform that connects farmers with agricultural experts and buyers using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Project Overview

Digi-Farm is a modern web application designed to bridge the gap between farmers, agricultural experts, and potential buyers. The platform provides a marketplace for farm products, expert consultation services, and inquiry management systems.

### Key Features

- **Multi-Role System**: Support for Farmers, Admins, and Public Users
- **Product Marketplace**: Farmers can list and sell their products
- **Expert Services**: Agricultural experts can offer consultation services
- **Inquiry Management**: Farmers can request expert assistance
- **Admin Dashboard**: Comprehensive management tools for administrators
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Live data synchronization across the platform

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM)
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Express-validator** - Input validation
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - User interface library
- **React Router DOM** - Client-side routing
- **React Query (TanStack Query)** - Data fetching and caching
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
digi-farm/
├── backend/                 # Node.js/Express.js API
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Custom middleware
│   ├── uploads/            # File uploads directory
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── config.env          # Environment variables
├── frontend/               # React.js application
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digi-farm
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   **Backend** (`backend/config.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/digi_farm
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   JWT_EXPIRE=24h
   UPLOAD_PATH=./uploads/
   MAX_FILE_SIZE=5242880
   ```

   **Frontend** (`frontend/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the development servers**

   **Backend** (in `backend` directory):
   ```bash
   npm run dev
   ```

   **Frontend** (in `frontend` directory):
   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 👥 User Roles & Features

### 🌾 Farmer
- **Registration & Profile Management**
- **Product Management**: List, edit, and manage farm products
- **Inquiry System**: Request expert assistance
- **Dashboard**: View statistics and manage activities

### 👨‍💼 Admin
- **User Management**: Approve farmers, manage user accounts
- **Product Approval**: Review and approve product listings
- **Service Management**: Manage expert services
- **Inquiry Management**: Respond to farmer inquiries
- **Analytics Dashboard**: View platform statistics

### 🌐 Public Users
- **Browse Products**: View approved farm products
- **Service Directory**: Explore expert services
- **Contact Information**: Access platform contact details

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Farmer registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all approved products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (farmer only)
- `PUT /api/products/:id` - Update product (farmer only)
- `DELETE /api/products/:id` - Delete product (farmer only)
- `PUT /api/products/:id/approve` - Approve product (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)
- `POST /api/services/:id/review` - Add service review (farmer only)

### Inquiries
- `POST /api/inquiries` - Create inquiry (farmer only)
- `GET /api/inquiries/farmer/mine` - Get farmer's inquiries
- `GET /api/inquiries/:id` - Get single inquiry
- `PUT /api/inquiries/:id` - Update inquiry (farmer only)
- `DELETE /api/inquiries/:id` - Delete inquiry (farmer only)
- `POST /api/inquiries/:id/respond` - Respond to inquiry (admin only)

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard stats
- `GET /api/admin/farmers` - Get all farmers
- `PUT /api/admin/farmers/:id/approve` - Approve farmer
- `PUT /api/admin/farmers/:id/status` - Update farmer status
- `DELETE /api/admin/farmers/:id` - Delete farmer
- `GET /api/admin/products` - Get all products (admin view)
- `GET /api/admin/inquiries` - Get all inquiries (admin view)
- `POST /api/admin/users` - Create admin/farmer users

## 🗄 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['farmer', 'admin']),
  phone: String,
  address: String,
  profileImage: String,
  isApproved: Boolean,
  isActive: Boolean,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  farmer: ObjectId (ref: User),
  title: String,
  description: String,
  price: Number,
  category: String,
  quantity: Number,
  unit: String,
  images: [String],
  status: String (enum: ['pending', 'approved', 'rejected']),
  isAvailable: Boolean,
  location: String,
  harvestDate: Date,
  expiryDate: Date,
  organic: Boolean,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Services Collection
```javascript
{
  name: String,
  description: String,
  category: String,
  provider: String,
  contact: String,
  price: Number,
  priceType: String,
  location: String,
  isAvailable: Boolean,
  rating: Number,
  reviews: [{
    farmer: ObjectId (ref: User),
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Inquiries Collection
```javascript
{
  farmer: ObjectId (ref: User),
  service: ObjectId (ref: Service),
  subject: String,
  message: String,
  status: String (enum: ['pending', 'in-progress', 'completed', 'cancelled']),
  priority: String (enum: ['low', 'medium', 'high']),
  contactPreference: String,
  preferredDate: Date,
  response: {
    message: String,
    respondedBy: ObjectId (ref: User),
    respondedAt: Date
  },
  attachments: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: Express-validator for data validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Controlled cross-origin requests
- **Security Headers**: Helmet middleware for security headers
- **Role-Based Access Control**: Granular permission system

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and intuitive interface
- **Animations**: Smooth transitions with Framer Motion
- **Toast Notifications**: User feedback with React Hot Toast
- **Loading States**: Better user experience during data fetching
- **Form Validation**: Real-time form validation
- **Search & Filter**: Advanced product and service discovery

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud database
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Set up proper CORS origins for frontend domain

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Configure environment variables for production API URL

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📝 Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/backend/README.md` and `/frontend/README.md`

## 🔮 Future Enhancements

- **Real-time Chat**: Live communication between farmers and experts
- **Payment Integration**: Secure payment processing for products and services
- **Mobile App**: Native mobile applications
- **AI Recommendations**: Smart product and service recommendations
- **Weather Integration**: Local weather data for farming decisions
- **Analytics Dashboard**: Advanced analytics for farmers and admins
- **Multi-language Support**: Internationalization for global reach

---

**Built with ❤️ for the farming community**
