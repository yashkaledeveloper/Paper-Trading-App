import { useState, useEffect } from "react";
import axios from "axios";
import OverviewCard from "./components/OverviewCard";

const WalletStatus = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const STARTING_BALANCE = 100000; // starting wallet value

  const [wallet, setWallet] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [invested, setInvested] = useState(0);
  const [overallPL, setOverallPL] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get wallet balance
        const walletRes = await axios.get(`${apiUrl}/api/getwallet`, { withCredentials: true });
        const walletData = walletRes.data;
        setWallet(walletData);

        // 2️⃣ Get holdings
        const holdingsRes = await axios.get(`${apiUrl}/api/allhodings`, { withCredentials: true });
        const userHoldings = holdingsRes.data;
        setHoldings(userHoldings);

        // 3️⃣ Calculate total invested
        let totalInvested = 0;
        let currentHoldingsValue = 0;

        userHoldings.forEach(item => {
          totalInvested += item.avgBuyPrice * item.quantity;
          currentHoldingsValue += (item.currentPrice || item.avgBuyPrice) * item.quantity;
        });

        setInvested(totalInvested);

        // 4️⃣ Calculate overall P&L
        const currTotalAccVal = walletData.balance + currentHoldingsValue;
        const totalPL = currTotalAccVal - STARTING_BALANCE;
        setOverallPL(totalPL);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="overview-cards">
      <OverviewCard
        title="Total Portfolio Value"
        value={wallet?.balance?.toLocaleString() || "0.00"}
        subText="Today"
        icon="wallet"
      />

      <OverviewCard
        title="Total Invested"
        value={invested.toLocaleString() || "0.00"}
        subText={`Across ${holdings.length} assets`}
        icon="money_bag"
      />

      <OverviewCard
        title="Overall Profit/Loss"
        value={overallPL.toLocaleString() || "0.00"}
        subText="All time"
        positive={overallPL >= 0}
        icon="trending_up"
      />
    </div>
  );
};

export default WalletStatus;