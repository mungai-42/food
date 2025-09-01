import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaBox, FaUsers, FaDollarSign } from 'react-icons/fa';

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-8"
        >
          Farmer Dashboard
        </motion.h1>
        
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🌾</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Farmer Dashboard Coming Soon</h2>
          <p className="text-gray-500">This page is under development</p>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
