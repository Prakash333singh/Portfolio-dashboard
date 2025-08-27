import {
  fetchCMP,
  fetchPERatio,
  fetchLatestEarnings,
} from "../services/yahooService.js"

import { readPortfolioFromExcel } from "../services/excelService.js"

// This function gets all stock data
export const getAllStockData = async (req, res) => {

  // Load portfolio from Excel file (adjust path if needed)
  const portfolio = readPortfolioFromExcel("./data/portfolio.xlsx")
//   console.log(portfolio)

  const stockDataPromises = portfolio.map(
    async (stock) => {
      try {
        // Fetch CMP, P/E ratio, and Earnings from yahooService
        const cmp = await fetchCMP(stock.symbol)
        const peRatio = await fetchPERatio(stock.symbol)
        const latestEarnings = await fetchLatestEarnings(stock.symbol)

        const investment = stock.purchasePrice * stock.quantity
        const presentValue = cmp * stock.quantity
        const gainLoss = presentValue - investment

        const result = {
          name: stock.name,
          symbol,
          purchasePrice: stock.purchasePrice,
          quantity: stock.quantity,
          investment,
          cmp,
          presentValue,
          gainLoss,
          peRatio,
          latestEarnings,
          sector: stock.sector,
          portfolioPercentage: 0,
        }

        console.log(result," RESULT");
        return result;
      } catch (error) {
        return {
          name: stock.name,
          symbol,
          error: error.message || "Failed to fetch stock data",
        }
      }
    }
  )

  try {
    const allStockData = await Promise.all(stockDataPromises)

    // Calculate total investment for portfolio percentage
    const totalInvestment = allStockData.reduce((total, stock) => {
      return total + (stock.investment || 0)
    }, 0)

    // Update portfolio percentage for each stock
    allStockData.forEach((stock) => {
      if (totalInvestment > 0) {
        stock.portfolioPercentage =
          (((stock.investment || 0) / totalInvestment) * 100).toFixed(2) + "%"
      } else {
        stock.portfolioPercentage = "0%"
      }
    })

    res.json(allStockData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch stocks data" })
  }
}


