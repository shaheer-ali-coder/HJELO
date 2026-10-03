import { alerts, overviewStats } from '../data/mockData';

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="two-col">
        <div className="panel">
          <p className="eyebrow">Wallet / profile</p>
          <h1>Dashboard</h1>
          <div className="profile-header">
            <div className="avatar">JB</div>
            <div>
              <strong>Jane Builder</strong>
              <div className="muted">7xK...9ab • Verified</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <p className="eyebrow">Quick actions</p>
          <div className="role-grid">
            <button className="primary-button">Create escrow</button>
            <button className="secondary-button">Analyze wallet</button>
            <button className="secondary-button">Submit evidence</button>
          </div>
        </div>
      </section>

      <section className="stat-grid">
        {overviewStats.map((item) => (
          <div key={item.label} className="metric-card large">
            <small>{item.label}</small>
            <strong>{item.value}</strong>
            <span>{item.delta}</span>
          </div>
        ))}
      </section>

      <section className="two-col">
        <div className="panel">
          <h2>Pending actions</h2>
          <ul className="list-stack">
            {alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h2>Wallet risk snapshot</h2>
          <div className="risk-row">
            <span>Overall</span>
            <strong className="success">LOW</strong>
          </div>
          <div className="risk-row">
            <span>Coverage</span>
            <strong>87%</strong>
          </div>
          <div className="risk-row">
            <span>Estimated P/L</span>
            <strong>+14.7 SOL</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
