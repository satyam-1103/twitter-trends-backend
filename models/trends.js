// models/Trend.js
import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    trending: {
      name: {
        type: String,
        required: true,
      },
      placeID: {
        type: String,
        required: true,
      },
      locationType: {
        type: String,
        required: true,
      },
      trends: [
        {
          name: { type: String },
          postCount: { type: Number },
          domain: { type: String },
          rank: { type: Number },
          mobileIntent: { type: String },
          webUrl: { type: String },
        },
      ],
    },
    fetchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Trend = mongoose.model("Trend", TrendSchema);

export default Trend;
