require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const allRoute = require("./Routes/AllRoute");
const { StockModel } = require("./model/StockModel");
const startPriceEngine = require("./engine/mockPriceGenerator")


const PORT = process.env.PORT || 4000;
// const URI = 'mongodb://127.0.0.1:27017/zerodha';
const URI = process.env.MONGO_URL;

const app = express();

// app.set("trust proxy", 1);

startPriceEngine();

// const allowedOrigins = [
//   "https://paper-trading-app-client.onrender.com",
//   "http://localhost:5173"
// ]

app.use(cors({
  origin: "https://paper-trading-app-client.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/api", allRoute);


mongoose.connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running, DB connected");
    });
  })
  .catch(err => console.error(err));
