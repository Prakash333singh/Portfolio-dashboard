import { Router } from "express"
import { getPortfolioData } from "../controllers/portfolioController"

const router = Router()

router.get("/", getPortfolioData)

export default router
