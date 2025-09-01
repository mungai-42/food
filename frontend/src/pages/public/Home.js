import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaLeaf, 
  FaUsers, 
  FaHandshake, 
  FaChartLine, 
  FaShieldAlt, 
  FaMobileAlt,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: FaUsers,
      title: 'Connect with Experts',
      description: 'Get expert advice from agricultural specialists and consultants.'
    },
    {
      icon: FaHandshake,
      title: 'Direct Market Access',
      description: 'Sell your products directly to buyers without intermediaries.'
    },
    {
      icon: FaChartLine,
      title: 'Market Insights',
      description: 'Access real-time market data and pricing information.'
    },
    {
      icon: FaShieldAlt,
      title: 'Quality Assurance',
      description: 'Verified products and trusted service providers.'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Friendly',
      description: 'Access the platform from anywhere, anytime.'
    },
    {
      icon: FaLeaf,
      title: 'Sustainable Practices',
      description: 'Promote and adopt sustainable farming methods.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Farmers' },
    { number: '50+', label: 'Expert Consultants' },
    { number: '1000+', label: 'Products Listed' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Organic Farmer',
      content: 'Digi-Farm has transformed how I sell my products. The direct market access has increased my profits significantly.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Agricultural Consultant',
      content: 'As a consultant, I can now reach more farmers and provide valuable advice through this platform.',
      rating: 5
    },
    {
      name: 'Mike Davis',
      role: 'Buyer',
      content: 'I love the quality and variety of products available. The platform makes sourcing farm products so easy.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Connecting{' '}
                <span className="text-green-600">Farmers</span>{' '}
                with{' '}
                <span className="text-green-600">Experts</span>{' '}
                & Buyers
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Empowering agriculture through technology. Join our digital marketplace 
                to buy, sell, and get expert advice for sustainable farming.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center"
                >
                  Get Started
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/products"
                  className="btn-secondary text-lg px-8 py-3 flex items-center justify-center"
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  <FaLeaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Join Digi-Farm Today
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start your journey towards sustainable and profitable farming
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Farmers</span>
                      <span className="font-semibold text-green-600">500+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Products</span>
                      <span className="font-semibold text-green-600">1000+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Experts</span>
                      <span className="font-semibold text-green-600">50+</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Digi-Farm?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers comprehensive solutions for modern agriculture, 
              connecting all stakeholders in the farming ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover text-center p-8"
              >
                <feature.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from farmers, experts, and buyers who have transformed their 
              agricultural practices with Digi-Farm.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-green-600">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already benefiting from our platform. 
              Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Register as Farmer
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
