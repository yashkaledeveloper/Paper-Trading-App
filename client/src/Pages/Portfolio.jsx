import React from 'react'
import "./css/Portfolio.css"
import OverviewCard from './components/OverviewCard';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <div>
          <h2>Portfolio Overview</h2>
          <p>Real-time summary of your investment performance</p>
        </div>
      </div>

      <div className="overview-cards">
        <OverviewCard
          title="Total Portfolio Value"
          value="$124,500.00"
          sub="+2.4%"
          subText="Today"
          positive
          icon="trending_up"
        />

        <OverviewCard
          title="Total Invested"
          value="$98,200.00"
          subText="Across 14 assets"
          icon="account_balance_wallet"
        />

        <OverviewCard
          title="Overall Profit/Loss"
          value="+$26,300.00"
          sub="+26.8%"
          subText="All time"
          positive
          icon="stars"
        />
      </div>
    </div>
  );
}



export default Portfolio