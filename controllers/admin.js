// backend/controllers/adminController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtSecret, adminCredentials } from "../config.js";

// Function to log in the admin and generate a JWT token
export const loginAdmin = (req, res) => {
  

  // Check if the email matches the environment variable
  const { email, password } = req.body;

  // Check if the provided email matches the admin email from the environment variable
  if (email === adminCredentials.email) {
    // Check if the provided password matches the admin password from the environment variable
    if (password === adminCredentials.password) {
      // Generate JWT token with the email as payload
      const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
      return res.status(200).json({ token }); // Send the token back to the client
    }
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(401).json({ message: "Invalid email or password" });
};

// Middleware to verify the JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from the Authorization header

  if (!token) return res.sendStatus(401); // If no token, return Unauthorized

  // Verify the token
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, return Forbidden
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Protected admin route (for token verification)
export const adminProtectedRoute = (req, res) => {
    res.status(200).json({ message: "Access granted to admin content" });
  };
  
