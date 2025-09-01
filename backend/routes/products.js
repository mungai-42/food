const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { protect, authorize, checkApproval } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all approved products (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, sort = 'createdAt' } = req.query;
    
    const query = { status: 'approved', isAvailable: true };
    
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
      sort: { [sort]: -1 },
      populate: {
        path: 'farmer',
        select: 'name email phone location'
      }
    };

    const products = await Product.paginate(query, options);
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmer', 'name email phone location');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Farmers only)
router.post('/', protect, authorize('farmer'), checkApproval, [
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['vegetables', 'fruits', 'grains', 'dairy', 'meat', 'poultry', 'fish', 'herbs', 'other']).withMessage('Invalid category'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('unit').isIn(['kg', 'pound', 'piece', 'dozen', 'bundle', 'bag', 'liter', 'gallon']).withMessage('Invalid unit'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
  body('location').optional().trim(),
  body('harvestDate').optional().isISO8601().withMessage('Invalid harvest date'),
  body('expiryDate').optional().isISO8601().withMessage('Invalid expiry date'),
  body('organic').optional().isBoolean().withMessage('Organic must be a boolean'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
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

    const productData = {
      ...req.body,
      farmer: req.user.id
    };

    const product = await Product.create(productData);
    
    const populatedProduct = await Product.findById(product._id)
      .populate('farmer', 'name email phone location');

    res.status(201).json({
      success: true,
      message: 'Product created successfully. Pending admin approval.',
      data: populatedProduct
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during product creation'
    });
  }
});

// @route   GET /api/products/farmer/mine
// @desc    Get farmer's own products
// @access  Private (Farmers only)
router.get('/farmer/mine', protect, authorize('farmer'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { farmer: req.user.id };
    if (status) {
      query.status = status;
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const products = await Product.paginate(query, options);
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Get farmer products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Product owner or admin)
router.put('/:id', protect, [
  body('title').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('isAvailable').optional().isBoolean().withMessage('isAvailable must be a boolean')
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

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is owner or admin
    if (product.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('farmer', 'name email phone location');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during product update'
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Product owner or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is owner or admin
    if (product.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during product deletion'
    });
  }
});

// @route   PUT /api/products/:id/approve
// @desc    Approve/reject product (admin only)
// @access  Private (Admin only)
router.put('/:id/approve', protect, authorize('admin'), [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected')
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

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    ).populate('farmer', 'name email phone location');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: `Product ${req.body.status} successfully`,
      data: product
    });
  } catch (error) {
    console.error('Approve product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during product approval'
    });
  }
});

module.exports = router;
