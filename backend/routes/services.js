const express = require('express');
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/services
// @desc    Get all available services (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    const query = { isAvailable: true };
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } }
      ];
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const services = await Service.paginate(query, options);
    
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/services
// @desc    Create new service (admin only)
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), [
  body('name').trim().isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').isIn(['consultation', 'soil_testing', 'pest_control', 'irrigation', 'harvesting', 'marketing', 'financial', 'technology', 'other']).withMessage('Invalid category'),
  body('provider').trim().isLength({ min: 2, max: 100 }).withMessage('Provider name must be between 2 and 100 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('priceType').isIn(['hourly', 'daily', 'weekly', 'monthly', 'per_service', 'free']).withMessage('Invalid price type'),
  body('contact.phone').optional().trim(),
  body('contact.email').optional().isEmail().withMessage('Invalid email'),
  body('contact.website').optional().isURL().withMessage('Invalid website URL'),
  body('location').optional().trim(),
  body('image').optional().trim()
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

    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during service creation'
    });
  }
});

// @route   PUT /api/services/:id
// @desc    Update service (admin only)
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), [
  body('name').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
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

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during service update'
    });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete service (admin only)
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during service deletion'
    });
  }
});

// @route   POST /api/services/:id/review
// @desc    Add review to service (farmers only)
// @access  Private (Farmers only)
router.post('/:id/review', protect, authorize('farmer'), [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
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

    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if user already reviewed this service
    const existingReview = service.reviews.find(
      review => review.farmer.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this service'
      });
    }

    // Add review
    service.reviews.push({
      farmer: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    });

    // Calculate average rating
    const totalRating = service.reviews.reduce((sum, review) => sum + review.rating, 0);
    service.rating = totalRating / service.reviews.length;

    await service.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      data: service
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during review addition'
    });
  }
});

module.exports = router;
