import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: [
    {
      subtitle: {
        type: String,
      },
      body: {
        type: String,
      },
    },
  ],
});

export const Homepage = mongoose.model("Homepage", homepageSchema);
