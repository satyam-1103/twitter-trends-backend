// backend/config.js
import dotenv from "dotenv";
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;

export const adminCredentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD, // Change this to a strong password
};
