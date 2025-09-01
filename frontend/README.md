# Digi-Farm Frontend

A modern React.js frontend application for the Digi-Farm platform - connecting farmers with experts and buyers.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Role-based Access**: Different interfaces for farmers, admins, and public users
- **Authentication**: Secure login/register with JWT tokens
- **Product Management**: Browse, create, edit, and manage farm products
- **Service Marketplace**: Expert services for farmers
- **Inquiry System**: Communication between farmers and experts
- **Real-time Updates**: React Query for efficient data fetching
- **Mobile Responsive**: Works perfectly on all devices
- **Animations**: Smooth animations with Framer Motion
- **Form Validation**: Comprehensive form validation with React Hook Form

## 🛠 Tech Stack

- **Framework**: React.js 18
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **UI Components**: Custom components with Tailwind

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digi-farm/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create environment file
   cp .env.example .env
   
   # Edit environment variables
   nano .env
   ```

4. **Environment Variables**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_NAME=Digi-Farm
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── forms/          # Form components
│   └── ui/             # UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
│   ├── public/         # Public pages
│   ├── auth/           # Authentication pages
│   ├── farmer/         # Farmer dashboard pages
│   ├── admin/          # Admin dashboard pages
│   ├── products/       # Product pages
│   └── services/       # Service pages
├── utils/              # Utility functions
├── styles/             # Global styles
└── App.js              # Main App component
```

## 🎨 UI Components

### Button Components
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.btn-danger` - Destructive action buttons

### Form Components
- `.input-field` - Standard input fields
- Form validation with error messages
- File upload components

### Card Components
- `.card` - Standard card layout
- `.card-hover` - Cards with hover effects

## 🔐 Authentication

The app uses JWT tokens for authentication with the following features:

- **Automatic Token Management**: Tokens are stored in localStorage
- **Route Protection**: Protected routes for authenticated users
- **Role-based Access**: Different access levels for farmers and admins
- **Auto-logout**: Automatic logout on token expiration

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🎭 Animations

Smooth animations powered by Framer Motion:

- Page transitions
- Component entrance animations
- Hover effects
- Loading states

## 📊 Data Management

- **React Query**: Efficient data fetching and caching
- **Optimistic Updates**: Immediate UI updates
- **Error Handling**: Comprehensive error states
- **Loading States**: Loading indicators for better UX

## 🧪 Testing

To run tests:
```bash
npm test
```

## 🏗 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deployment

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables

### Vercel
1. Connect your repository to Vercel
2. Vercel will auto-detect React settings
3. Add environment variables in Vercel dashboard

### Other Platforms
The app can be deployed to any static hosting service that supports React applications.

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Style

- ESLint configuration included
- Prettier for code formatting
- Consistent component structure
- TypeScript-ready (can be added later)

## 📚 API Integration

The frontend integrates with the backend API through:

- **Axios**: HTTP client with interceptors
- **Automatic Token Handling**: JWT tokens in headers
- **Error Interceptors**: Automatic error handling
- **Base URL Configuration**: Environment-based API URLs

## 🎨 Customization

### Colors
The app uses a green color scheme that can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0fdf4',
    // ... other shades
    900: '#14532d',
  }
}
```

### Fonts
The app uses Inter font family, which can be changed in the Tailwind config.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team.
