import yahooFinance from "yahoo-finance2"

// Fetch P/E Ratio
export const fetchPERatio = async (symbol) => {
  try {
    // Try fetching with just "quote" first
    const quote = await yahooFinance.quote(symbol)
    console.log("QUOTE:", quote)

    // Try fetching with just "quote" first
    const summary = await yahooFinance.quoteSummary(symbol, {
      modules: ["price", "defaultKeyStatistics", "financialData"],
    })
    console.log("SUMMARY:", summary);

    // const pe =
    //   quote.defaultKeyStatistics?.forwardPE ||
    //   quote.defaultKeyStatistics?.trailingPE

    //   console.log(pe)
    // return pe || "N/A"
  } catch (err) {
    console.error(`Error fetching P/E for ${symbol}:`, err.message)
    return "N/A"
  }
}

// Fetch EPS (Earnings Per Share)
export const fetchLatestEarnings = async (symbol) => {
  try {
    const quote = await yahooFinance.quoteSummary(symbol, {
      modules: ["defaultKeyStatistics", "financialData"],
    })

    console.log(quote);
    const eps1 = quote?.financialData?.epsTrailingTwelveMonths
    const eps2 = quote?.defaultKeyStatistics?.trailingEps

    const eps = eps1 || eps2

    console.log(eps)
    return eps ? `₹${eps.toFixed(2)}` : "N/A"
  } catch (err) {
    console.error(`Error fetching earnings for ${symbol}:`, err.message)
    return "N/A"
  }
}

// Fetch CMP (Current Market Price)
export const fetchCMP = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol)
    return quote.regularMarketPrice
  } catch (err) {
    console.error(`Error fetching CMP for ${symbol}:`, err.message)
    return "N/A"
  }
}
