// backend/routes/admin.js

import express from "express";
import { adminProtectedRoute, loginAdmin, verifyToken } from "../controllers/admin.js";

const router = express.Router();

// Route for admin login
router.post("/login", loginAdmin);

router.use(verifyToken);
// Example protected route that requires a valid JWT token
router.get("/", verifyToken, adminProtectedRoute);


export default router;
