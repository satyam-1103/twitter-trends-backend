// controllers/disclaimerController.js
import Disclaimer from "../models/disclaimer.js"; // Adjust the path as needed

// Controller to handle adding disclaimer content
export const addDisclaimer = async (req, res) => {
  try {
    const { lastUpdated, description } = req.body;

    // Validation check
    if (!lastUpdated || !description) {
      return res.status(400).json({
        message: "Last updated and description are required.",
      });
    }

    // Using the `create` method to add a new disclaimer
    const disclaimer = await Disclaimer.create({
      lastUpdated,
      description,
    });

    return res.status(201).json({
      message: "Disclaimer added successfully.",
      data: disclaimer,
    });
  } catch (error) {
    console.error("Error adding disclaimer:", error);
    return res.status(500).json({
      message: "An error occurred while adding the disclaimer.",
    });
  }
};

// Controller to fetch all disclaimers
export const getDisclaimer = async (req, res) => {
  try {
    const response = await Disclaimer.find();

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No disclaimers found." });
    }

    res.status(200).json({ message: "Fetched disclaimers", response });
  } catch (error) {
    console.error("Error fetching disclaimers:", error);
    res.status(500).json({
      message: "Server Error: Could not fetch disclaimers.",
    });
  }
};

// Controller to edit a disclaimer
export const editDisclaimer = async (req, res) => {
  const { id } = req.params;
  const { lastUpdated, description } = req.body;

  try {
    // Find the disclaimer by ID and update it with new data
    const updatedDisclaimer = await Disclaimer.findByIdAndUpdate(
      id,
      { lastUpdated, description },
      { new: true } // `new: true` ensures the updated document is returned
    );

    if (!updatedDisclaimer) {
      return res.status(404).json({ message: "Disclaimer not found." });
    }

    return res.status(200).json({
      message: "Disclaimer updated successfully.",
      response: updatedDisclaimer,
    });
  } catch (error) {
    console.error("Error updating disclaimer:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Controller to delete a disclaimer
export const deleteDisclaimer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Disclaimer.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Disclaimer not found." });
    }

    res.json({ message: "Disclaimer deleted successfully." });
  } catch (error) {
    console.error("Error deleting disclaimer:", error);
    res.status(500).json({ message: "Failed to delete disclaimer." });
  }
};
