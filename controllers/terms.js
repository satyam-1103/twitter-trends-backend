// controllers/TermsAndConditonsController.js
import TermsAndCondition from "../models/terms.js";

// Controller to handle adding privacy policy content
export const addTermsAndConditons = async (req, res) => {
  try {
    const { lastUpdated, description } = req.body;

    // Validation check
    if (!lastUpdated || !description) {
      return res
        .status(400)
        .json({ message: "Last updated and description are required." });
    }

    // Using the `create` method to add a new privacy policy
    const termsCondtions = await TermsAndCondition.create({
      lastUpdated,
      description,
    });

    return res.status(201).json({
      message: "Terms and Conditions added successfully.",
      data: termsCondtions,
    });
  } catch (error) {
    console.error("Error adding terms and conditions", error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the terms and conditions." });
  }
};

export const getTermsAndConditons = async (req, res) => {
  try {
    const response = await TermsAndCondition.find();

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "Terms and conditions not found" });
    }

    res.status(200).json({ message: "Fetched terms and conditions", response });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    res
      .status(500)
      .json({ message: "Server Error: Could not fetch terms and conditions" });
  }
};

export const editTermsAndConditons = async (req, res) => {
  const { id } = req.params;
  const { lastUpdated, description } = req.body;

  try {
    // Find the privacy policy by ID and update it with new data
    const updatedPolicy = await TermsAndConditons.findByIdAndUpdate(
      id,
      { lastUpdated, description },
      { new: true } // `new: true` ensures the updated document is returned
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Terms and conditions not found" });
    }

    return res.status(200).json({
      message: "Terms and conditions updated successfully",
      response: updatedPolicy,
    });
  } catch (error) {
    console.error("Error updating terms and conditions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTermsAndConditons = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TermsAndConditons.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Terms and conditions not found." });
    }

    res.json({ message: "Terms and conditions deleted successfully." });
  } catch (error) {
    console.error("Error deleting terms and conditions:", error);
    res.status(500).json({ message: "Failed to delete terms and conditions." });
  }
};
