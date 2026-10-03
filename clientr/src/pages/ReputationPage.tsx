import { riskSignals, walletAnalysis } from '../data/mockData';

export default function WalletIntelligencePage() {
  return (
    <div className="page-stack">
      <section className="panel wide-panel">
        <p className="eyebrow">Wallet Intelligence</p>
        <h1>Analyze a wallet</h1>

        <div className="search-row">
          <input type="text" value={walletAnalysis.wallet} readOnly />
          <button className="primary-button">Analyze</button>
        </div>

        <div className="stat-grid">
          <div className="metric-card">
            <small>First observed</small>
            <strong>{walletAnalysis.firstObserved}</strong>
          </div>
          <div className="metric-card">
            <small>Activity</small>
            <strong>{walletAnalysis.activity}</strong>
          </div>
          <div className="metric-card">
            <small>Coverage</small>
            <strong>{walletAnalysis.coverage}</strong>
          </div>
          <div className="metric-card">
            <small>Overall signal</small>
            <strong>{walletAnalysis.overallRisk}</strong>
          </div>
        </div>

        <div className="two-col compact-grid">
          <div className="info-card">
            <h3>P/L</h3>
            <div className="list-row"><span>Realized</span><strong>{walletAnalysis.pnl.realized}</strong></div>
            <div className="list-row"><span>Unrealized</span><strong>{walletAnalysis.pnl.unrealized}</strong></div>
            <div className="list-row"><span>Total</span><strong>{walletAnalysis.pnl.total}</strong></div>
            <div className="list-row"><span>Volume</span><strong>{walletAnalysis.pnl.volume}</strong></div>
          </div>

          <div className="info-card">
            <h3>Risk signals</h3>
            {riskSignals.map((risk) => (
              <div key={risk.label} className="risk-box">
                <strong>{risk.label}</strong>
                <span>{risk.value}</span>
                <small>{risk.hint}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
