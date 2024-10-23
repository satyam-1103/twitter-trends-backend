import express from "express";
import { addContent, getContent } from "../controllers/homepage.js"; // Adjust the path if necessary

const router = express.Router();

// Route to get trends
// router.get("/:id", getTrendsByLocation);

// fetch Country

router.post("/", addContent);
router.get("/", getContent)
export default router;
