import { fetchStockDetails } from "../services/StockService.js"
import stockMap from "../data/data.js"

// Get all stock data from stockMap
export const getAllStockData = async (req, res) => {
  try {
    // For each stock in stockMap, fetch details
    const stockDataPromises = Object.entries(stockMap).map(
      async ([symbol, stock]) => {
        try {
          
          const { cmp, peRatio, eps } = await fetchStockDetails(symbol)

          const investment = stock.purchasePrice * stock.quantity
          const presentValue = cmp !== "N/A" ? cmp * stock.quantity : 0
          const gainLoss = presentValue - investment 

          return {
            name: stock.name,
            symbol,
            purchasePrice: stock.purchasePrice,
            quantity: stock.quantity,
            investment,
            cmp,
            presentValue: presentValue.toFixed(3),
            gainLoss: gainLoss.toFixed(3),
            peRatio,
            eps,
            sector: stock.sector,
            portfolioPercentage: 0, // will update later
          }
        } catch (error) {
          return {
            name: stock.name,
            symbol,
            error: error.message || "Failed to fetch stock data",
          }
        }
      }
    )

    // Wait for all stocks to resolve
    const allStockData = await Promise.all(stockDataPromises)

    // Calculate total investment for portfolio % calculation
    const totalInvestment = allStockData.reduce(
      (total, stock) => total + (stock.investment || 0),
      0
    )

    // Add portfolio percentage
    const finalPortfolio = allStockData.map((stock) => {
      if (totalInvestment > 0 && stock.investment) {
        stock.portfolioPercentage =
          (((stock.investment || 0) / totalInvestment) * 100).toFixed(2) + "%"
      } else {
        stock.portfolioPercentage = "0%"
      }
      return stock
    })

    res.json(finalPortfolio)
  } catch (error) {
    console.error("Error in getAllStockData:", error.message)
    res.status(500).json({ error: "Failed to fetch portfolio data" })
  }
}
