import express from "express"
import { getAllStockData } from "../controllers/portfolioController.js"
import limiter from "../middleware/rateLimiter.js"
import cache from "../middleware/cache.js"

// Initialize router
const router = express.Router()

// GET /api/v1/stock/ - Get all stock data
router.get("/", limiter, cache("15 seconds"), getAllStockData)

export default router
