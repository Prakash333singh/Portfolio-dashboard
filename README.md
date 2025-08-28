
```markdown
# 📊 Stock Portfolio Dashboard

A full-stack project to track and visualize your stock investments.  
It fetches **real-time stock data** (CMP, P/E ratio, EPS, etc.) using the **Yahoo Finance API**, and displays it beautifully in a **React + Tailwind dashboard** grouped by sector.

---

## ✨ Features

- 🔄 **Real-time stock prices** (fetched every 15 seconds)
- 📈 **Portfolio analytics**: Investment, Present Value, Gain/Loss
- 🧮 **Financial metrics**: P/E Ratio, EPS (Earnings per Share)
- 🏷️ **Stocks grouped by sector**
- 🎨 **Modern responsive UI** (Tailwind + React)
- ⚡ **API caching & rate limiting** to reduce API calls
- 💾 Easy to extend with new stocks

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **API**: [yahoo-finance2](https://www.npmjs.com/package/yahoo-finance2)
- **Middleware**:  
  - [apicache](https://www.npmjs.com/package/apicache) → caching responses  
  - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) → prevent API abuse  

---

## 📂 Project Structure

```

.
├── backend/
│   ├── controllers/
│   │   └── portfolioController.js
│   ├── middleware/
│   │   ├── cache.js
│   │   └── limiter.js
│   ├── routes/
│   │   └── stockRoutes.js
│   ├── services/
│   │   └── yahooService.js
│   ├── data/
│   │   └── data.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   └── tailwind.config.js
│
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/stock-portfolio-dashboard.git
cd stock-portfolio-dashboard
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Run the backend server:

```bash
npm run dev
```

Backend runs at **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend runs at **[http://localhost:5173](http://localhost:5173)** (Vite default).

---

## 📡 API Endpoints

| Endpoint        | Method | Description                |
| --------------- | ------ | -------------------------- |
| `/api/v1/stock` | GET    | Fetch all portfolio stocks |

---

## 🖥️ UI Preview

* **Dashboard** with sector-wise grouping
* **Gain/Loss badges** (green/red)
* **Portfolio % progress bars**
* **Clean responsive layout**

---

## 🚀 Future Improvements

* 📊 Add charts (sector allocation pie chart, portfolio growth trend)
* 🔔 Price alerts & notifications
* 👤 User authentication (multi-portfolio support)
* 📝 Export portfolio data (Excel/PDF)

---

## 📜 License

MIT License © 2025 \[Prakash]
