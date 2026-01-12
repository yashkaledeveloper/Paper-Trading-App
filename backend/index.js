require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const allRoute = require("./Routes/AllRoute");

const { HoldingModel } = require("./model/HoldingsModel")
const { WatchListModel } = require("./model/WatchListModel");
// const { UserModel } = require("./model/UserModel");
// const { StockModel } = require("./model/StockModel");

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
app.use("/api", allRoute);

// app.get("/addholding", async (req, res) => {
//   let WatchListData = [
//     {
//       name: "INFY",
//       price: 1555.45,
//       percent: "-1.60%",
//       isDown: true,
//     },
//     {
//       name: "ONGC",
//       price: 116.8,
//       percent: "-0.09%",
//       isDown: true,
//     },
//     {
//       name: "TCS",
//       price: 3194.8,
//       percent: "-0.25%",
//       isDown: true,
//     },
//     {
//       name: "KPITTECH",
//       price: 266.45,
//       percent: "3.54%",
//       isDown: false,
//     },
//     {
//       name: "QUICKHEAL",
//       price: 308.55,
//       percent: "-0.15%",
//       isDown: true,
//     },
//     {
//       name: "WIPRO",
//       price: 577.75,
//       percent: "0.32%",
//       isDown: false,
//     },
//     {
//       name: "M&M",
//       price: 779.8,
//       percent: "-0.01%",
//       isDown: true,
//     },
//     {
//       name: "RELIANCE",
//       price: 2112.4,
//       percent: "1.44%",
//       isDown: false,
//     },
//     {
//       name: "HUL",
//       price: 512.4,
//       percent: "1.04%",
//       isDown: false,
//     },
//   ]
//   WatchListData.forEach((item) => {
//     let newWatchList = new WatchListModel({
//       name: item.name,
//       price: item.price,
//       percent: item.percent,
//       isDown: item.isDown,
//     })
//     newWatchList.save();
//   })
//   res.send("Done!")
// })

// app.get("/addstocks", async (req, res) => {
//     let stocksData = [
//   // ===== BSE (30 stocks - 60%) =====
//   { symbol: "RELIANCE", name: "Reliance Industries", exchange: "BSE", sector: "Energy" },
//   { symbol: "TCS", name: "Tata Consultancy Services", exchange: "BSE", sector: "IT" },
//   { symbol: "INFY", name: "Infosys", exchange: "BSE", sector: "IT" },
//   { symbol: "HDFCBANK", name: "HDFC Bank", exchange: "BSE", sector: "Banking" },
//   { symbol: "ICICIBANK", name: "ICICI Bank", exchange: "BSE", sector: "Banking" },
//   { symbol: "SBIN", name: "State Bank of India", exchange: "BSE", sector: "Banking" },
//   { symbol: "AXISBANK", name: "Axis Bank", exchange: "BSE", sector: "Banking" },
//   { symbol: "LT", name: "Larsen & Toubro", exchange: "BSE", sector: "Infrastructure" },
//   { symbol: "HINDUNILVR", name: "Hindustan Unilever", exchange: "BSE", sector: "FMCG" },
//   { symbol: "ITC", name: "ITC Limited", exchange: "BSE", sector: "FMCG" },
//   { symbol: "BAJFINANCE", name: "Bajaj Finance", exchange: "BSE", sector: "Finance" },
//   { symbol: "BAJAJFINSV", name: "Bajaj Finserv", exchange: "BSE", sector: "Finance" },
//   { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", exchange: "BSE", sector: "Banking" },
//   { symbol: "HCLTECH", name: "HCL Technologies", exchange: "BSE", sector: "IT" },
//   { symbol: "WIPRO", name: "Wipro", exchange: "BSE", sector: "IT" },
//   { symbol: "MARUTI", name: "Maruti Suzuki", exchange: "BSE", sector: "Automobile" },
//   { symbol: "TATAMOTORS", name: "Tata Motors", exchange: "BSE", sector: "Automobile" },
//   { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", exchange: "BSE", sector: "Pharma" },
//   { symbol: "DRREDDY", name: "Dr Reddy's Labs", exchange: "BSE", sector: "Pharma" },
//   { symbol: "CIPLA", name: "Cipla", exchange: "BSE", sector: "Pharma" },
//   { symbol: "ONGC", name: "ONGC", exchange: "BSE", sector: "Energy" },
//   { symbol: "POWERGRID", name: "Power Grid Corp", exchange: "BSE", sector: "Power" },
//   { symbol: "NTPC", name: "NTPC", exchange: "BSE", sector: "Power" },
//   { symbol: "ULTRACEMCO", name: "UltraTech Cement", exchange: "BSE", sector: "Cement" },
//   { symbol: "GRASIM", name: "Grasim Industries", exchange: "BSE", sector: "Cement" },
//   { symbol: "JSWSTEEL", name: "JSW Steel", exchange: "BSE", sector: "Metal" },
//   { symbol: "TATASTEEL", name: "Tata Steel", exchange: "BSE", sector: "Metal" },
//   { symbol: "ADANIENT", name: "Adani Enterprises", exchange: "BSE", sector: "Conglomerate" },
//   { symbol: "ADANIPORTS", name: "Adani Ports", exchange: "BSE", sector: "Logistics" },
//   { symbol: "BHARTIARTL", name: "Bharti Airtel", exchange: "BSE", sector: "Telecom" },

//   // ===== NSE (20 stocks - 40%) =====
//   { symbol: "ZOMATO", name: "Zomato", exchange: "NSE", sector: "Tech" },
//   { symbol: "PAYTM", name: "Paytm", exchange: "NSE", sector: "Fintech" },
//   { symbol: "NYKAA", name: "Nykaa", exchange: "NSE", sector: "Ecommerce" },
//   { symbol: "POLICYBZR", name: "PolicyBazaar", exchange: "NSE", sector: "Insurance" },
//   { symbol: "DMART", name: "Avenue Supermarts", exchange: "NSE", sector: "Retail" },
//   { symbol: "IRCTC", name: "IRCTC", exchange: "NSE", sector: "Travel" },
//   { symbol: "LICI", name: "LIC India", exchange: "NSE", sector: "Insurance" },
//   { symbol: "INDIGO", name: "InterGlobe Aviation", exchange: "NSE", sector: "Aviation" },
//   { symbol: "COALINDIA", name: "Coal India", exchange: "NSE", sector: "Mining" },
//   { symbol: "HAVELLS", name: "Havells India", exchange: "NSE", sector: "Electricals" },
//   { symbol: "PIDILITIND", name: "Pidilite Industries", exchange: "NSE", sector: "Chemicals" },
//   { symbol: "ASIANPAINT", name: "Asian Paints", exchange: "NSE", sector: "Paints" },
//   { symbol: "BERGEPAINT", name: "Berger Paints", exchange: "NSE", sector: "Paints" },
//   { symbol: "TITAN", name: "Titan Company", exchange: "NSE", sector: "Lifestyle" },
//   { symbol: "UPL", name: "UPL Limited", exchange: "NSE", sector: "AgroChem" },
//   { symbol: "DIVISLAB", name: "Divi's Labs", exchange: "NSE", sector: "Pharma" },
//   { symbol: "APOLLOHOSP", name: "Apollo Hospitals", exchange: "NSE", sector: "Healthcare" },
//   { symbol: "MINDTREE", name: "Mindtree", exchange: "NSE", sector: "IT" },
//   { symbol: "MPHASIS", name: "Mphasis", exchange: "NSE", sector: "IT" },
//   { symbol: "LTTS", name: "L&T Technology Services", exchange: "NSE", sector: "IT" }
// ];
//     await StockModel.insertMany(stocksData);
//     res.send("Done!")
// })

app.get("/allholdings", async (req, res) => {
  let data = await HoldingModel.find({});
  res.json(data);
})

// app.get("/allusers", async (req, res) => {
//   let data = await UserModel.find({});
//   res.json(data);
// })

// app.get("/wallet", async (req, res) => {
//   let data = await WalletModel.find({});
//   res.json(data);
// })

// app.get("/buystockdata/:id", async (req, res) => {
//   let { id } = req.params;
//   let data = await WatchListModel.findById(id);
//   res.json(data)
// })

app.get("/allwatchlist", async (req, res) => {
  let data = await WatchListModel.find({});
  res.json(data);
})

app.listen(PORT, (req, res) => {
  console.log("App Started!")
  mongoose.connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));
})