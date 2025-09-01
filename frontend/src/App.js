import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Farmer Pages
import FarmerDashboard from './pages/farmer/Dashboard';
import FarmerProducts from './pages/farmer/Products';
import FarmerProfile from './pages/farmer/Profile';
import FarmerInquiries from './pages/farmer/Inquiries';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminFarmers from './pages/admin/Farmers';
import AdminProducts from './pages/admin/Products';
import AdminServices from './pages/admin/Services';
import AdminInquiries from './pages/admin/Inquiries';

// Product Pages
import ProductDetail from './pages/products/ProductDetail';
import ProductList from './pages/products/ProductList';

// Service Pages
import ServiceDetail from './pages/services/ServiceDetail';
import ServiceList from './pages/services/ServiceList';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            {/* Farmer Routes */}
            <Route 
              path="/farmer" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/products" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerProducts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/profile" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer/inquiries" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerInquiries />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/farmers" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminFarmers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminProducts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/services" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminServices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/inquiries" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminInquiries />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="btn-primary">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
