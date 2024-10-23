import express from "express";
import {
  addTermsAndConditons,
  getTermsAndConditons,
  editTermsAndConditons,
  deleteTermsAndConditons,
} from "../controllers/terms.js"; // Adjust the path if necessary

const router = express.Router();

// Route to get trends
// router.get("/:id", getTrendsByLocation);

// fetch Country

router.post("/", addTermsAndConditons);
router.get("/", getTermsAndConditons);
router.put("/:id", editTermsAndConditons);
router.delete("/:id", deleteTermsAndConditons);
export default router;
