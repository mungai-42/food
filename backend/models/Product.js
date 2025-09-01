const mongoose = require('mongoose');
const paginate = require('./pagination');

const productSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['vegetables', 'fruits', 'grains', 'dairy', 'meat', 'poultry', 'fish', 'herbs', 'other']
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  unit: {
    type: String,
    required: [true, 'Product unit is required'],
    enum: ['kg', 'pound', 'piece', 'dozen', 'bundle', 'bag', 'liter', 'gallon']
  },
  images: [{
    type: String,
    required: [true, 'At least one product image is required']
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    trim: true
  },
  harvestDate: {
    type: Date
  },
  expiryDate: {
    type: Date
  },
  organic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ title: 'text', description: 'text', category: 'text' });

// Add pagination plugin
productSchema.plugin(paginate);

module.exports = mongoose.model('Product', productSchema);
