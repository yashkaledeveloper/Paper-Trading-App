require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const allRoute = require("./Routes/AllRoute");

const { HoldingModel } = require("./model/HoldingsModel")
const { PositionModel } = require("./model/PositionsModel")
const { WatchListModel } = require("./model/WatchListModel");
const { UserModel } = require("./model/UserModel");

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
app.use("/order", allRoute);

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

// app.get("/addpositions", async (req, res) => {
//     let PositionData = [
//         {
//             product: "CNC",
//             name: "EVEREADY",
//             qty: 2,
//             avg: 316.27,
//             price: 312.35,
//             net: "+0.58%",
//             day: "-1.24%",
//             isLoss: true,
//         },
//         {
//             product: "CNC",
//             name: "JUBLFOOD",
//             qty: 1,
//             avg: 3124.75,
//             price: 3082.65,
//             net: "+10.04%",
//             day: "-1.35%",
//             isLoss: true,
//         },
//     ]
//     PositionData.forEach((item) => {
//         let newPositions = new PositionModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         })
//         newPositions.save();
//     })
//     res.send("Done!")
// })

app.get("/allholdings", async (req, res) => {
  let data = await HoldingModel.find({});
  res.json(data);
})

app.get("/allusers", async (req, res) => {
  let data = await UserModel.find({});
  res.json(data);
})

app.get("/wallet", async (req, res) => {
  let data = await WalletModel.find({});
  res.json(data);
})

app.get("/allpositions", async (req, res) => {
  let data = await PositionModel.find({});
  res.json(data);
})

app.get("/buystockdata/:id", async (req, res) => {
  let { id } = req.params;
  let data = await WatchListModel.findById(id);
  res.json(data)
})

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