import express from "express";
import {
  getDisclaimer,
  addDisclaimer,
  editDisclaimer,
  deleteDisclaimer,
} from "../controllers/disclaimer.js"; // Adjust the path if necessary

const router = express.Router();

// Route to add a new disclaimer
router.post("/", addDisclaimer);

// Route to fetch all disclaimers
router.get("/", getDisclaimer);

// Route to edit a disclaimer by ID
router.put("/:id", editDisclaimer);

// Route to delete a disclaimer by ID
router.delete("/:id", deleteDisclaimer);

export default router;
