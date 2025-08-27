import rateLimit from "express-rate-limit"

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
})

export default rateLimiter
