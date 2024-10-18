import express from "express";
import { getTrendsByLocation } from "../controllers/getTrends.js"; // Adjust the path if necessary

const router = express.Router();

// Route to get trends
// router.get("/:id", getTrendsByLocation);

// fetch Country

router.get("/:id", getTrendsByLocation);

export default router;
