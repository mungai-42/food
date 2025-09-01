# 🌱 Digi-Farm MVP

A comprehensive digital agriculture platform connecting farmers with agricultural experts and buyers through innovative technology solutions.

## 🚀 Live Demo

- **Frontend**: [Coming Soon - Deploy to Vercel]
- **Backend API**: [Coming Soon - Deploy to Vercel]

## ✨ Features

### 🌾 For Farmers
- **Product Management**: List and manage farm products
- **Expert Consultation**: Connect with agricultural specialists
- **Market Access**: Reach buyers and expand market reach
- **Dashboard**: Monitor sales, inquiries, and performance

### 👨‍💼 For Admins
- **Farmer Management**: Approve and manage farmer accounts
- **Product Oversight**: Monitor and moderate product listings
- **Service Management**: Manage expert services and consultations
- **Analytics**: Track platform performance and user engagement

### 🌍 For Buyers
- **Product Discovery**: Browse fresh, locally grown products
- **Quality Assurance**: Verified farmer profiles and organic certifications
- **Direct Connection**: Connect directly with farmers
- **Service Access**: Access agricultural expertise and consulting

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Declarative animations
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **React Icons** - Scalable vector icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

### Infrastructure
- **MongoDB Atlas** - Cloud database hosting
- **Vercel** - Frontend and backend deployment
- **GitHub** - Version control and CI/CD

## 📁 Project Structure

```
digi-farm/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React context providers
│   │   ├── pages/          # Application pages
│   │   │   ├── public/     # Public website pages
│   │   │   ├── auth/       # Authentication pages
│   │   │   ├── farmer/     # Farmer dashboard pages
│   │   │   ├── admin/      # Admin management pages
│   │   │   ├── products/   # Product-related pages
│   │   │   └── services/   # Service-related pages
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main application component
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── models/             # Mongoose data models
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   ├── uploads/            # File upload directory
│   └── server.js           # Main server file
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
# Create .env file with your MongoDB connection string
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h
UPLOAD_PATH=./uploads/
MAX_FILE_SIZE=5242880
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create new service
- `GET /api/services/:id` - Get service details

### Admin
- `GET /api/admin/farmers` - List all farmers
- `PUT /api/admin/farmers/:id/approve` - Approve farmer account
- `GET /api/admin/stats` - Platform statistics

## 🎨 UI Components

The application uses a comprehensive set of reusable components:

- **Navigation**: Responsive navigation with role-based access
- **Forms**: Validated forms with error handling
- **Cards**: Product and service display cards
- **Modals**: Interactive dialogs for actions
- **Tables**: Data display with sorting and pagination
- **Charts**: Data visualization components

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for farmers and admins
- **Input Validation**: Server-side validation using express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing configuration
- **Helmet**: Security headers for Express.js

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes and orientations

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy both frontend and backend
4. Set up custom domains if needed

### Environment Variables for Production
- Update `MONGODB_URI` with production database
- Set `NODE_ENV=production`
- Configure `JWT_SECRET` with strong secret
- Update CORS origins for production domains

## 🧪 Testing

The application includes comprehensive testing:
- Unit tests for components
- Integration tests for API endpoints
- End-to-end testing for user workflows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Mobile App**: Native iOS and Android applications
- **AI Integration**: Machine learning for crop recommendations
- **Blockchain**: Transparent supply chain tracking
- **IoT Integration**: Sensor data integration for precision farming
- **Marketplace**: Advanced e-commerce features
- **Analytics**: Advanced reporting and insights

## 🎯 Roadmap

### Phase 1 (Current - MVP)
- ✅ User authentication and authorization
- ✅ Basic product management
- ✅ Farmer and admin dashboards
- ✅ Service listing and management

### Phase 2
- 🔄 Advanced product features
- 🔄 Payment integration
- 🔄 Real-time messaging
- 🔄 Mobile optimization

### Phase 3
- 📋 AI-powered recommendations
- 📋 Advanced analytics
- 📋 Third-party integrations
- 📋 International expansion

---

**Built with ❤️ for the agricultural community**
