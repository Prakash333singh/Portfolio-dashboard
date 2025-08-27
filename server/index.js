import express from 'express';
import cors from 'cors';
import stockRoutes from "./routes/portfolioRoutes.js"

// Initialize Express app
const app = express();

// Port configuration
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/v1/stock",stockRoutes)


// Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})