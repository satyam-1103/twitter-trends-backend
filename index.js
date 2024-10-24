// index.js
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import locationRoute from "./routes/locationRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import rateLimit from "express-rate-limit";
import trendRoute from "./routes/trendRoute.js";
import privacyPolicyRoute from "./routes/privacyPolicyRoute.js";
import homepageRoute from "./routes/homeRoute.js";
import termsRoute from "./routes/termsRoute.js";
import disclaimerRoute from "./routes/disclaimerRoute.js";
import adminRoute from "./routes/admin.js"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {

  origin: [ 'https://twitter-trends-phi.vercel.app/','https://twitter-trends-frontend.vercel.app', 'http://localhost:3000' ], // Removed trailing slashes
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Accept-Encoding',
    'Accept-Language',
    'Origin',
    'Referer',
    'User-Agent'
  ], // Add any additional headers you might need
  credentials: true, // If you're sending cookies or other credentials

};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// HTTP request logger
app.use(morgan("combined"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
app.use(limiter);

// Connect to MongoDB
const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Start Server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Routes
app.use("/api/locations", locationRoute);
app.use("/api/trends", trendRoute);
app.use("/api/privacy-policy", privacyPolicyRoute);
app.use("/api/homepage", homepageRoute);
app.use("/api/terms-conditions", termsRoute);
app.use("/api/disclaimer", disclaimerRoute);
app.use('/api/admin', adminRoute)

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Twitter Trends Location API!");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Error Handling Middleware
app.use(errorHandler);
