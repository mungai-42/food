import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaUsers, FaGlobe, FaHandshake } from 'react-icons/fa';

const About = () => {
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
            About Digi-Farm
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Connecting farmers with agricultural experts and buyers through innovative digital solutions
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To revolutionize agriculture by creating a digital ecosystem that empowers farmers, 
              connects them with experts, and opens new market opportunities through technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FaLeaf className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainable Farming</h3>
              <p className="text-gray-600">Promoting eco-friendly agricultural practices</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-blue-100 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FaUsers className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Building</h3>
              <p className="text-gray-600">Creating a network of farmers and experts</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-yellow-100 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FaGlobe className="text-3xl text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Access</h3>
              <p className="text-gray-600">Connecting local farmers to global markets</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-purple-100 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FaHandshake className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Partnership</h3>
              <p className="text-gray-600">Building strong farmer-expert relationships</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
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
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Digi-Farm was born from a simple observation: farmers often struggle to access 
                expert advice, market their products, and connect with buyers. We saw an opportunity 
                to bridge these gaps using technology.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a small project has grown into a comprehensive platform that 
                serves thousands of farmers across the country, helping them improve yields, 
                reduce costs, and access better markets.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to be part of the agricultural revolution, making farming 
                more sustainable, profitable, and connected than ever before.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Key Milestones</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Platform Launch (2023)
                </li>
                <li className="flex items-center">
                  <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  1000+ Farmers Registered
                </li>
                <li className="flex items-center">
                  <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  50+ Expert Partners
                </li>
                <li className="flex items-center">
                  <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  $2M+ in Transactions
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A dedicated group of agricultural experts, technologists, and business professionals 
              committed to transforming farming through digital innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Chief Agricultural Officer",
                bio: "20+ years in sustainable agriculture and crop science"
              },
              {
                name: "Michael Chen",
                role: "Chief Technology Officer",
                bio: "Expert in agricultural technology and digital platforms"
              },
              {
                name: "Maria Rodriguez",
                role: "Head of Farmer Relations",
                bio: "Former farmer with deep understanding of agricultural challenges"
              }
            ].map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl text-center"
              >
                <div className="bg-gradient-to-br from-green-400 to-blue-500 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Join the Agricultural Revolution</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're a farmer looking to improve your operations, an expert wanting to share 
              knowledge, or a buyer seeking quality products, Digi-Farm is your platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Get Started Today</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
