import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaTractor, FaChartLine, FaUsers, FaGlobe } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaSeedling className="text-4xl text-green-600" />,
      title: "Crop Planning & Management",
      description: "Expert guidance on crop selection, planting schedules, and field management strategies.",
      features: ["Seasonal planning", "Crop rotation", "Field mapping", "Yield optimization"]
    },
    {
      icon: <FaLeaf className="text-4xl text-green-600" />,
      title: "Organic Farming Certification",
      description: "Support for farmers transitioning to organic practices and obtaining certifications.",
      features: ["Organic standards", "Certification process", "Market access", "Premium pricing"]
    },
    {
      icon: <FaTractor className="text-4xl text-green-600" />,
      title: "Precision Agriculture",
      description: "Technology-driven farming solutions for improved efficiency and sustainability.",
      features: ["GPS mapping", "Soil analysis", "Irrigation systems", "Data analytics"]
    },
    {
      icon: <FaChartLine className="text-4xl text-green-600" />,
      title: "Market Analysis & Pricing",
      description: "Market insights and pricing strategies to maximize farm profitability.",
      features: ["Market trends", "Price forecasting", "Demand analysis", "Export opportunities"]
    },
    {
      icon: <FaUsers className="text-4xl text-green-600" />,
      title: "Farmer Training Programs",
      description: "Comprehensive training on modern farming techniques and best practices.",
      features: ["Workshop sessions", "Online courses", "Field demonstrations", "Expert mentoring"]
    },
    {
      icon: <FaGlobe className="text-4xl text-green-600" />,
      title: "Export & International Trade",
      description: "Support for farmers looking to access international markets and export opportunities.",
      features: ["Export regulations", "Quality standards", "Logistics support", "Market entry"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-gray-800 mb-6"
          >
            Expert Agricultural Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Access professional expertise to improve your farming operations, increase yields, and maximize profits
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="text-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-center">
                  <button className="text-white font-semibold hover:underline">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">How Our Services Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple steps to connect with agricultural experts and get the support you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse Services",
                description: "Explore our comprehensive range of agricultural services and expert consultations."
              },
              {
                step: "2",
                title: "Connect with Experts",
                description: "Get matched with qualified agricultural professionals in your area of need."
              },
              {
                step: "3",
                title: "Implement Solutions",
                description: "Receive personalized guidance and support to improve your farming operations."
              }
            ].map((step, index) => (
              <motion.div 
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-green-400 to-blue-500 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Network */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Expert Network</h2>
              <p className="text-lg text-gray-600 mb-6">
                We've built a network of over 500 certified agricultural experts, including agronomists, 
                soil scientists, market analysts, and sustainable farming specialists.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                All our experts are vetted professionals with proven track records in their respective 
                fields, ensuring you receive the highest quality advice and support.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600">Certified Experts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50+</div>
                  <div className="text-gray-600">Specializations</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Expert Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Crop Specialists</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Grain Crops</li>
                    <li>• Vegetables</li>
                    <li>• Fruits</li>
                    <li>• Herbs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Experts</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Soil Science</li>
                    <li>• Irrigation</li>
                    <li>• Pest Management</li>
                    <li>• Technology</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Service Pricing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options to suit different needs and budgets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                plan: "Basic Consultation",
                price: "$50",
                duration: "per hour",
                features: [
                  "One-on-one expert consultation",
                  "Basic farm assessment",
                  "Written recommendations",
                  "Email follow-up support"
                ]
              },
              {
                plan: "Premium Package",
                price: "$200",
                duration: "per month",
                features: [
                  "Unlimited expert consultations",
                  "Comprehensive farm planning",
                  "Regular progress reviews",
                  "Priority support access"
                ],
                popular: true
              },
              {
                plan: "Enterprise Solution",
                price: "Custom",
                duration: "tailored",
                features: [
                  "Dedicated expert team",
                  "Full farm transformation",
                  "Ongoing monitoring",
                  "24/7 support access"
                ]
              }
            ].map((plan, index) => (
              <motion.div 
                key={plan.plan}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                  plan.popular ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.plan}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-green-600">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                    plan.popular 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Transform Your Farm?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with agricultural experts today and take the first step towards improved yields, 
              better profits, and sustainable farming practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Book a Consultation</button>
              <button className="btn-secondary">View Expert Profiles</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
