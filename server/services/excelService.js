import * as XLSX from "xlsx"
import fs from "fs"

export const readPortfolioFromExcel = (filePath) => {
  // Read file into a buffer first
  const fileBuffer = fs.readFileSync(filePath)

  // Parse workbook from buffer
  const workbook = XLSX.read(fileBuffer, { type: "buffer" })

  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const rows = XLSX.utils.sheet_to_json(sheet, { range: 1 })

  const portfolio = rows
    .filter((row) => row["Particulars"] && row["NSE/BSE"])
    .map((row) => ({
      name: row["Particulars"],
      symbol: row["NSE/BSE"].toString().trim() + ".NS",
      purchasePrice: Number(row["Purchase Price"]) || 0,
      quantity: Number(row["Qty"]) || 0,
      sector: row["Sector"] || "Unknown",
    }))

  return portfolio
}
