# 📈 Paper Trading App

🚀 A **full-stack paper trading platform** inspired by Zerodha Kite that allows users to simulate stock trading using virtual money.
Users can place buy/sell orders, manage holdings, track positions, and view P&L using live or mock stock prices.

---

## ✨ Features

### 🔐 Authentication & Authorization

* Secure user signup & login
* JWT-based protected routes

### 💰 Wallet System

* Default virtual balance for every user
* Automatic balance updates on buy/sell

### 🧾 Order Management

* Market buy & sell order simulation
* Order validation (balance & quantity checks)
* Order status handling (Executed)

### 📦 Portfolio Management

* Holdings with average buy price calculation
* Positions with unrealized & realized P&L
* Auto updates after each trade

### 📊 Data Visualization

* 📊 Bar charts & 🍩 Doughnut charts
* Portfolio-level insights

### 📉 Stock Prices

* Live stock prices using free APIs
* Fallback to mock price updates for simulation

---

## 🛠 Tech Stack

### Frontend
  - React Js
  - Matrial UI
  - Javascript
  - Axios

### Backend

  - Node Js
  - Express Js
  - MongoDB

---

## 🧠 Core Logic (High Level)

### 🟢 Buy Order Flow

* Validate user & wallet balance
* Fetch current stock price
* Deduct wallet balance
* Create or update holding (avg price logic)
* Mark order as executed

### 🔴 Sell Order Flow

* Validate holding quantity
* Add sell value to wallet
* Update or remove holding
* Calculate realized P&L

---

## 🗃 Database Models

* 👤 User
* 💰 Wallet
* 🧾 Orders
* 📦 Holdings

Separated models ensure clean architecture and scalability.

---

## 📸 Screenshots

📌 *Add screenshots here:*

* Landing Page
* Trading Dashboard
* Buy / Sell Modal
* Holdings & Charts

---

## 🔮 Future Enhancements

* 📌 Limit orders
* ⚡ WebSocket-based real-time prices
* 📈 Advanced trade analytics
* 🛡 Admin monitoring dashboard

---

## ⚠️ Disclaimer

This is a **paper trading (simulation) application**.
❌ No real money
❌ No real stock trading

---

## 👨‍💻 Author

**Yeshu**
Aspiring Full-Stack Developer 🚀
