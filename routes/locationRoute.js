// routes/locationRoutes.js
import express from 'express';
import { getLocations } from '../controllers/getLocation.js';
import { query, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @route   GET /api/locations
 * @desc    Get locations for Twitter trends
 * @access  Public
 */
router.get(
  '/',
  [
    // Example: Validate 'country' query parameter if used
    query('country').optional().isString().withMessage('Country must be a string'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  getLocations
);

export default router;
