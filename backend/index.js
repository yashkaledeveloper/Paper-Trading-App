require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const allRoute = require("./Routes/AllRoute");

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

app.listen(PORT, (req, res) => {
  console.log("App Started!")
  mongoose.connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));
})