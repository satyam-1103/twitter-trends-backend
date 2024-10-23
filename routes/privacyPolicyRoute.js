import express from "express";
import {
  getPrivacyPolicy,
  addPrivacyPolicy,
  editPrivacyPolicy,
  deletePrivacyPolicy,
} from "../controllers/privacyPolicy.js"; // Adjust the path if necessary

const router = express.Router();

// Route to get trends
// router.get("/:id", getTrendsByLocation);

// fetch Country

router.post("/", addPrivacyPolicy);
router.get("/", getPrivacyPolicy);
router.put("/:id", editPrivacyPolicy);
router.delete("/:id", deletePrivacyPolicy);
export default router;
