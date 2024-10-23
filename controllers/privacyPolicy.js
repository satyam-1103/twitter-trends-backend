// controllers/privacyPolicyController.js
import PrivacyPolicy from "../models/privacyPolicy.js";

// Controller to handle adding privacy policy content
export const addPrivacyPolicy = async (req, res) => {
  try {
    const { lastUpdated, description } = req.body;

    // Validation check
    if (!lastUpdated || !description) {
      return res
        .status(400)
        .json({ message: "Last updated and description are required." });
    }

    // Using the `create` method to add a new privacy policy
    const privacyPolicy = await PrivacyPolicy.create({
      lastUpdated,
      description,
    });

    return res.status(201).json({
      message: "Privacy Policy added successfully.",
      data: privacyPolicy,
    });
  } catch (error) {
    console.error("Error adding privacy policy:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the privacy policy." });
  }
};

export const getPrivacyPolicy = async (req, res) => {
  try {
    const response = await PrivacyPolicy.find();

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }

    res.status(200).json({ message: "Fetched Privacy Policy", response });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    res
      .status(500)
      .json({ message: "Server Error: Could not fetch privacy policy" });
  }
};

export const editPrivacyPolicy = async (req, res) => {
  const { id } = req.params;
  const { lastUpdated, description } = req.body;

  try {
    // Find the privacy policy by ID and update it with new data
    const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
      id,
      { lastUpdated, description },
      { new: true } // `new: true` ensures the updated document is returned
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Privacy Policy not found" });
    }

    return res.status(200).json({
      message: "Privacy Policy updated successfully",
      response: updatedPolicy,
    });
  } catch (error) {
    console.error("Error updating privacy policy:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deletePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PrivacyPolicy.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Privacy policy not found." });
    }

    res.json({ message: "Privacy policy deleted successfully." });
  } catch (error) {
    console.error("Error deleting privacy policy:", error);
    res.status(500).json({ message: "Failed to delete privacy policy." });
  }
};
