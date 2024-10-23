// models/PrivacyPolicy.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const TermsAndConditionSchema = new Schema({
  lastUpdated: {
    type: String, // You can change this to Date if needed
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TermsAndCondition = mongoose.model(
  "TermsAndCondition",
  TermsAndConditionSchema
);

export default TermsAndCondition;
