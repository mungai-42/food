# Digi-Farm Backend API

A Node.js/Express.js backend API for the Digi-Farm platform - connecting farmers with experts and buyers.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Farmer Management**: Registration, approval workflow, profile management
- **Product Management**: CRUD operations for farm products with approval system
- **Service Management**: Expert services offered to farmers
- **Inquiry System**: Service requests and communication between farmers and experts
- **Admin Dashboard**: Comprehensive admin panel for managing the platform
- **Pagination**: Efficient data pagination for all list endpoints
- **Search & Filtering**: Advanced search and filtering capabilities
- **File Upload**: Image upload support for products and profiles
- **Security**: Input validation, rate limiting, CORS, and security headers

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, express-rate-limit
- **File Upload**: multer
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digi-farm/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment file
   cp config.env.example config.env
   
   # Edit the environment variables
   nano config.env
   ```

4. **Environment Variables**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/digi_farm
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   JWT_EXPIRE=24h
   UPLOAD_PATH=./uploads/
   MAX_FILE_SIZE=5242880
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new farmer
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Products (Public)
- `GET /api/products` - Get all approved products
- `GET /api/products/:id` - Get single product

### Products (Private - Farmers)
- `POST /api/products` - Create new product
- `GET /api/products/farmer/mine` - Get farmer's products
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Products (Private - Admin)
- `PUT /api/products/:id/approve` - Approve/reject product

### Services (Public)
- `GET /api/services` - Get all available services
- `GET /api/services/:id` - Get single service

### Services (Private - Admin)
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Services (Private - Farmers)
- `POST /api/services/:id/review` - Add review to service

### Inquiries (Private - Farmers)
- `POST /api/inquiries` - Create new inquiry
- `GET /api/inquiries/farmer/mine` - Get farmer's inquiries
- `GET /api/inquiries/:id` - Get single inquiry
- `PUT /api/inquiries/:id` - Update inquiry
- `DELETE /api/inquiries/:id` - Delete inquiry

### Inquiries (Private - Admin)
- `POST /api/inquiries/:id/respond` - Respond to inquiry

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/farmers` - Get all farmers
- `PUT /api/admin/farmers/:id/approve` - Approve/reject farmer
- `PUT /api/admin/farmers/:id/status` - Activate/deactivate farmer
- `DELETE /api/admin/farmers/:id` - Delete farmer
- `GET /api/admin/products` - Get all products (admin view)
- `GET /api/admin/inquiries` - Get all inquiries
- `POST /api/admin/users` - Create admin user

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📊 Database Schema

### User
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String, enum: ['farmer', 'admin'])
- `phone` (String, optional)
- `address` (String, optional)
- `profileImage` (String, optional)
- `isApproved` (Boolean, default: false)
- `isActive` (Boolean, default: true)

### Product
- `farmer` (ObjectId, ref: User)
- `title` (String, required)
- `description` (String, required)
- `price` (Number, required)
- `category` (String, enum: product categories)
- `quantity` (Number, required)
- `unit` (String, enum: units)
- `images` (Array of Strings, required)
- `status` (String, enum: ['pending', 'approved', 'rejected'])
- `isAvailable` (Boolean, default: true)
- `location` (String, optional)
- `harvestDate` (Date, optional)
- `expiryDate` (Date, optional)
- `organic` (Boolean, default: false)
- `tags` (Array of Strings, optional)

### Service
- `name` (String, required)
- `description` (String, required)
- `category` (String, enum: service categories)
- `provider` (String, required)
- `contact` (Object: phone, email, website)
- `price` (Number, required)
- `priceType` (String, enum: price types)
- `location` (String, optional)
- `isAvailable` (Boolean, default: true)
- `rating` (Number, default: 0)
- `reviews` (Array of review objects)
- `image` (String, optional)

### Inquiry
- `farmer` (ObjectId, ref: User)
- `service` (ObjectId, ref: Service, optional)
- `subject` (String, required)
- `message` (String, required)
- `status` (String, enum: status types)
- `priority` (String, enum: priority levels)
- `contactPreference` (String, enum: contact methods)
- `preferredDate` (Date, optional)
- `response` (Object: message, respondedBy, respondedAt)
- `attachments` (Array of attachment objects)

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure MongoDB Atlas or production MongoDB instance
- Set up proper CORS origins
- Configure file upload storage (AWS S3, etc.)

## 🔒 Security Features

- **Input Validation**: All inputs are validated using express-validator
- **Password Hashing**: Passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Cross-origin resource sharing configuration
- **Security Headers**: Helmet.js for security headers
- **Role-based Access**: Different access levels for farmers and admins

## 📝 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Validation errors if any
}
```

## 🧪 Testing

To run tests (when implemented):
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.
