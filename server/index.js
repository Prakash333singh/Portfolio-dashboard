import express from 'express';
import cors from 'cors';
import stockRoutes from "./routes/portfolioRoutes.js"


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/v1/stock",stockRoutes)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})