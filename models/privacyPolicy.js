// models/PrivacyPolicy.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const PrivacyPolicySchema = new Schema({
  lastUpdated: {
    type: String, // You can change this to Date if needed
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', PrivacyPolicySchema);

export default PrivacyPolicy;
