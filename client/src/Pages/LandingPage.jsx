import React from 'react'
import "./css/LandingPage.css"
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const LandingPage = () => {
  return (
    <div className="app">
      <ToastContainer/>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="material-icons logo-icon">show_chart</span>
          <span className="logo-text">PaperTrade</span>
        </div>
        <div className="nav-links">
          <a>Features</a>
          <a>Markets</a>
          <a>Leaderboard</a>
          <a>Pricing</a>
        </div>
        <div className="nav-actions">
          <Link to="/signin" className="login">Log in</Link>
          <Link to="/app"><button className="btn primary">Start Trading</button></Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <span className="badge">STOCK TRADING SIMULATION LIVE</span>
        <h1>
          Master the Markets,<br />
          <span>Risk-Free.</span>
        </h1>
        <p>
          Practice stocks trading with real-time market data and
          100,000 Rs. in virtual money. Test your strategies before risking
          real capital.
        </p>
        <div className="hero-actions">
          <Link to="/app"><button className="btn primary">Get Started Now →</button></Link>
          <button className="btn secondary">View Demo</button>
        </div>
      </section>

      {/* MOCK CHART */}
      <section className="mock">
        <div className="mock-card">
          <div className="bars">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="trade-panel">
            <button className="tab active">Buy</button>
            <button className="tab">Sell</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 style={{marginBottom:"10px"}}>How PaperTrade Works</h2>
        <p className="sub">
          The most powerful suite of tools for aspiring traders.
        </p>
        <div className="feature-grid">
          <Feature
            title="Simulation"
            text="Trade in a sandbox environment that mimics real market conditions."
          />
          <Feature
            title="Real-time Data"
            text="Live price feeds and instant execution without the lag."
          />
          <Feature
            title="Portfolio Tracking"
            text="Monitor gains, losses, and strategy performance over time."
          />
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <Stat value="250K+" label="Active Traders" />
        <Stat value="$1.2B" label="Virtual Volume" />
        <Stat value="15,000+" label="Stocks & Crypto" />
        <Stat value="4.9/5" label="User Rating" />
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to start your trading journey?</h2>
        <p>
          Join thousands of traders honing their skills today. Get 100,000
          virtual balance instantly.
        </p>
        <div className="cta-actions">
          <Link to="/signup"><button className="btn white">Create Free Account</button></Link>
          <button className="btn outline">Learn More</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 PaperTrade Inc. Educational purposes only.</p>
      </footer>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <h3>{value}</h3>
      <span>{label}</span>
    </div>
  );
}


export default LandingPage