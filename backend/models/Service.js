const mongoose = require('mongoose');
const paginate = require('./pagination');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['consultation', 'soil_testing', 'pest_control', 'irrigation', 'harvesting', 'marketing', 'financial', 'technology', 'other']
  },
  provider: {
    type: String,
    required: [true, 'Service provider name is required'],
    trim: true
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative']
  },
  priceType: {
    type: String,
    enum: ['hourly', 'daily', 'weekly', 'monthly', 'per_service', 'free'],
    default: 'per_service'
  },
  location: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Add pagination plugin
serviceSchema.plugin(paginate);

module.exports = mongoose.model('Service', serviceSchema);
