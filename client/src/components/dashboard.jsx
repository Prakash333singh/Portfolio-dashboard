import { useEffect, useState } from "react";

const Dashboard = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(`https://portfolio-dashboard-7cmc.vercel.app/api/v1/stock`);
                if (!response.ok) throw new Error("Failed to fetch stock data");
                const data = await response.json();
                setStocks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
        const intervalId = setInterval(fetchStockData, 15000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid">
                </div>
                <div className="text-black text-4xl p-5 mt-3">Fetching latest stock data</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center mt-10 text-xl font-semibold">
                {error}
            </div>
        );
    }

    // Group stocks by sector
    const stocksBySector = stocks.reduce((acc, stock) => {
        const sector = stock.sector || "Unknown Sector";
        if (!acc[sector]) acc[sector] = [];
        acc[sector].push(stock);
        return acc;
    }, {});

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-md tracking-wide">
                📊 Stock Portfolio Dashboard
            </h1>

            <div className="grid gap-8">
                {Object.entries(stocksBySector).map(([sector, sectorStocks]) => (
                    <div
                        key={sector}
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
                    >
                        <h2 className="text-2xl font-semibold mb-6 text-blue-600 border-b-2 border-blue-300 pb-2 flex items-center gap-2">
                            <span>🏷️</span> {sector}
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-700">
                                <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3 px-4">Name</th>
                                        <th className="py-3 px-4">Symbol</th>
                                        <th className="py-3 px-4">Buy Price</th>
                                        <th className="py-3 px-4">Qty</th>
                                        <th className="py-3 px-4">Investment</th>
                                        <th className="py-3 px-4">CMP</th>
                                        <th className="py-3 px-4">Value</th>
                                        <th className="py-3 px-4">P/L</th>
                                        <th className="py-3 px-4">P/E</th>
                                        <th className="py-3 px-4">EPS</th>
                                        <th className="py-3 px-4">Portfolio %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sectorStocks.map((stock) => (
                                        <tr
                                            key={stock.symbol}
                                            className="border-b hover:bg-gray-50 transition duration-200"
                                        >
                                            <td className="py-3 px-4 font-semibold text-gray-800">
                                                {stock.name}
                                            </td>
                                            <td className="py-3 px-4 text-gray-500">
                                                {stock.symbol}
                                            </td>
                                            <td className="py-3 px-4">₹{stock.purchasePrice}</td>
                                            <td className="py-3 px-4">{stock.quantity}</td>
                                            <td className="py-3 px-4">₹{stock.investment}</td>
                                            <td className="py-3 px-4">₹{stock.cmp || "N/A"}</td>
                                            <td className="py-3 px-4">₹{stock.presentValue || "0"}</td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${stock.gainLoss >= 0
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    ₹{stock.gainLoss}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">{stock.peRatio || "N/A"}</td>
                                            <td className="py-3 px-4">
                                                {stock.latestEarnings || "N/A"}
                                            </td>
                                            <td className="py-3 px-4 w-40">
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-blue-500 h-3 rounded-full"
                                                        style={{
                                                            width: stock.portfolioPercentage || "0%",
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {stock.portfolioPercentage || "0%"}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
