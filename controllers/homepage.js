import { Homepage } from "../models/homepageContent.js";

export const addContent = async (req, res) => {
    const { title, content } = req.body; // content should be an array of objects

  try {
    // Create a new home content entry using Mongoose's create method
    const newContent = await Homepage.create({
      title,
      content, // Pass the content array directly
    });

    res.status(201).json({ message: "Homepage content created successfully.", newContent });
  } catch (error) {
    console.error("Error creating homepage content:", error);
    res.status(500).json({ message: "Failed to create homepage content." });
  }
};

export const getContent = async (req, res) => {
    try {
        // Fetch the homepage content from the database
        const homepageContent = await Homepage.find();
    
        // If no content is found, return a message
        if (!homepageContent || homepageContent.length === 0) {
          return res.status(404).json({ message: "No homepage content found." });
        }
    
        // Send the content as a response
        res.status(200).json({ response: homepageContent });
      } catch (error) {
        console.error("Error fetching homepage content:", error);
        res.status(500).json({ message: "Server error while fetching homepage content." });
      }
}

