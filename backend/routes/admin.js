const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require admin role
router.use(protect, authorize('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Admin only)
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await Promise.all([
      User.countDocuments({ role: 'farmer' }),
      User.countDocuments({ role: 'farmer', isApproved: false }),
      Product.countDocuments(),
      Product.countDocuments({ status: 'pending' }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'pending' })
    ]);

    const [totalFarmers, pendingFarmers, totalProducts, pendingProducts, totalInquiries, pendingInquiries] = stats;

    res.json({
      success: true,
      data: {
        totalFarmers,
        pendingFarmers,
        totalProducts,
        pendingProducts,
        totalInquiries,
        pendingInquiries
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/farmers
// @desc    Get all farmers with pagination
// @access  Private (Admin only)
router.get('/farmers', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = { role: 'farmer' };
    
    // Filter by approval status
    if (status === 'pending') {
      query.isApproved = false;
    } else if (status === 'approved') {
      query.isApproved = true;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      select: '-password'
    };

    const farmers = await User.paginate(query, options);
    
    res.json({
      success: true,
      data: farmers
    });
  } catch (error) {
    console.error('Get farmers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/farmers/:id/approve
// @desc    Approve/reject farmer
// @access  Private (Admin only)
router.put('/farmers/:id/approve', [
  body('isApproved').isBoolean().withMessage('isApproved must be a boolean')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const farmer = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: req.body.isApproved },
      { new: true, runValidators: true }
    ).select('-password');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    if (farmer.role !== 'farmer') {
      return res.status(400).json({
        success: false,
        message: 'User is not a farmer'
      });
    }

    res.json({
      success: true,
      message: `Farmer ${req.body.isApproved ? 'approved' : 'rejected'} successfully`,
      data: farmer
    });
  } catch (error) {
    console.error('Approve farmer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during farmer approval'
    });
  }
});

// @route   PUT /api/admin/farmers/:id/status
// @desc    Activate/deactivate farmer
// @access  Private (Admin only)
router.put('/farmers/:id/status', [
  body('isActive').isBoolean().withMessage('isActive must be a boolean')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const farmer = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    res.json({
      success: true,
      message: `Farmer ${req.body.isActive ? 'activated' : 'deactivated'} successfully`,
      data: farmer
    });
  } catch (error) {
    console.error('Update farmer status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during status update'
    });
  }
});

// @route   DELETE /api/admin/farmers/:id
// @desc    Delete farmer
// @access  Private (Admin only)
router.delete('/farmers/:id', async (req, res) => {
  try {
    const farmer = await User.findById(req.params.id);
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }

    if (farmer.role !== 'farmer') {
      return res.status(400).json({
        success: false,
        message: 'User is not a farmer'
      });
    }

    // Delete associated products and inquiries
    await Promise.all([
      Product.deleteMany({ farmer: req.params.id }),
      Inquiry.deleteMany({ farmer: req.params.id })
    ]);

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Farmer and associated data deleted successfully'
    });
  } catch (error) {
    console.error('Delete farmer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during farmer deletion'
    });
  }
});

// @route   GET /api/admin/products
// @desc    Get all products with pagination (admin view)
// @access  Private (Admin only)
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, search } = req.query;
    
    const query = {};
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: {
        path: 'farmer',
        select: 'name email phone'
      }
    };

    const products = await Product.paginate(query, options);
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/inquiries
// @desc    Get all inquiries with pagination
// @access  Private (Admin only)
router.get('/inquiries', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority } = req.query;
    
    const query = {};
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by priority
    if (priority) {
      query.priority = priority;
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        { path: 'farmer', select: 'name email phone' },
        { path: 'service', select: 'name provider' }
      ]
    };

    const inquiries = await Inquiry.paginate(query, options);
    
    res.json({
      success: true,
      data: inquiries
    });
  } catch (error) {
    console.error('Get admin inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/admin/users
// @desc    Create admin user
// @access  Private (Admin only)
router.post('/users', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'farmer']).withMessage('Role must be admin or farmer')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      isApproved: role === 'admin' ? true : false // Admins are auto-approved
    });

    res.status(201).json({
      success: true,
      message: `${role} user created successfully`,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during user creation'
    });
  }
});

module.exports = router;
