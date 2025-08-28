import yahooFinance from "yahoo-finance2"

export const fetchStockDetails = async (symbol) => {
  try {
    // Fetch stock data from Yahoo Finance
    const data = await yahooFinance.quoteSummary(symbol, {
      modules: ["price", "financialData", "defaultKeyStatistics"],
    })

    // Current Market Price
    const cmp = data.price?.regularMarketPrice ?? "N/A"

    // Trailing P/E Ratio (only factual, not estimates)
    const peRatio = data.defaultKeyStatistics?.forwardEps || data.defaultKeyStatistics?.trailingPE || "N/A";

    //Earnings Per Share (EPS - actual)
     const eps1 = data?.financialData?.epsTrailingTwelveMonths
     const eps2 = data?.defaultKeyStatistics?.trailingEps

    const result = eps1 || eps2

     const eps =  result ? `₹${result.toFixed(2)}` : "N/A"

    // Return all fetched details
    return { cmp, peRatio, eps }
  } catch (err) {
    console.error(`[${symbol}] Error fetching stock details:`, err.message)
    return { cmp: "N/A", peRatio: "N/A", eps: "N/A" }
  }
}
