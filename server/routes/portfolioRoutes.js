import express from "express"
import apicache from "apicache"
import rateLimit from "express-rate-limit"
import { getAllStockData } from "../controllers/portfolioController.js"

const router = express.Router()

let cache = apicache.middleware

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
})

router.get("/", limiter, cache("15 seconds"), getAllStockData)

export default router
