import mongoose from 'mongoose';

const disclaimerSchema = new mongoose.Schema({
  lastUpdated: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a model from the schema
const Disclaimer = mongoose.model('Disclaimer', disclaimerSchema);

export default Disclaimer; // Export the model
