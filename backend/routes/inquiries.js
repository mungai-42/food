const express = require('express');
const { body, validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');
const { protect, authorize, checkApproval } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Create new inquiry (farmers only)
// @access  Private (Farmers only)
router.post('/', protect, authorize('farmer'), checkApproval, [
  body('service').optional().isMongoId().withMessage('Invalid service ID'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority level'),
  body('contactPreference').optional().isIn(['email', 'phone', 'whatsapp', 'in_person']).withMessage('Invalid contact preference'),
  body('preferredDate').optional().isISO8601().withMessage('Invalid preferred date')
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

    const inquiryData = {
      ...req.body,
      farmer: req.user.id
    };

    const inquiry = await Inquiry.create(inquiryData);
    
    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate('farmer', 'name email phone')
      .populate('service', 'name provider');

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: populatedInquiry
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during inquiry creation'
    });
  }
});

// @route   GET /api/inquiries/farmer/mine
// @desc    Get farmer's own inquiries
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
      sort: { createdAt: -1 },
      populate: [
        { path: 'service', select: 'name provider' },
        { path: 'response.respondedBy', select: 'name email' }
      ]
    };

    const inquiries = await Inquiry.paginate(query, options);
    
    res.json({
      success: true,
      data: inquiries
    });
  } catch (error) {
    console.error('Get farmer inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/inquiries/:id
// @desc    Get single inquiry
// @access  Private (Inquiry owner or admin)
router.get('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('farmer', 'name email phone')
      .populate('service', 'name provider')
      .populate('response.respondedBy', 'name email');
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Check if user is owner or admin
    if (inquiry.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this inquiry'
      });
    }
    
    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry (farmer can update their own, admin can update any)
// @access  Private
router.put('/:id', protect, [
  body('subject').optional().trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('message').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority level'),
  body('status').optional().isIn(['pending', 'in_progress', 'completed', 'cancelled']).withMessage('Invalid status')
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

    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Check if user is owner or admin
    if (inquiry.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this inquiry'
      });
    }

    // Farmers can only update certain fields
    if (req.user.role === 'farmer') {
      const allowedFields = ['subject', 'message', 'priority', 'contactPreference', 'preferredDate'];
      const filteredBody = {};
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          filteredBody[field] = req.body[field];
        }
      });
      req.body = filteredBody;
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('farmer', 'name email phone')
     .populate('service', 'name provider')
     .populate('response.respondedBy', 'name email');

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updatedInquiry
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during inquiry update'
    });
  }
});

// @route   POST /api/inquiries/:id/respond
// @desc    Respond to inquiry (admin only)
// @access  Private (Admin only)
router.post('/:id/respond', protect, authorize('admin'), [
  body('message').trim().isLength({ min: 5, max: 2000 }).withMessage('Response message must be between 5 and 2000 characters')
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

    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Update inquiry with response
    inquiry.response = {
      message: req.body.message,
      respondedBy: req.user.id,
      respondedAt: new Date()
    };

    // Update status if provided
    if (req.body.status) {
      inquiry.status = req.body.status;
    }

    await inquiry.save();

    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate('farmer', 'name email phone')
      .populate('service', 'name provider')
      .populate('response.respondedBy', 'name email');

    res.json({
      success: true,
      message: 'Response sent successfully',
      data: populatedInquiry
    });
  } catch (error) {
    console.error('Respond to inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during inquiry response'
    });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete inquiry
// @access  Private (Inquiry owner or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Check if user is owner or admin
    if (inquiry.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this inquiry'
      });
    }

    await Inquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during inquiry deletion'
    });
  }
});

module.exports = router;
