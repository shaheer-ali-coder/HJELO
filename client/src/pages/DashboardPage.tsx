import { useEscrows } from '../hooks/useEscrows';

const statCards = [
  { label: 'Active escrows', value: '12', delta: '+3 this month' },
  { label: 'Locked funds', value: '18.4 SOL', delta: '$9.2k USD' },
  { label: 'Completed milestones', value: '41', delta: '+8% month over month' },
  { label: 'Pending evaluations', value: '6', delta: '2 need review' },
];

export default function DashboardPage() {
  const { escrows, loading, error } = useEscrows();

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
            <a href="/escrows/new" className="primary-button">Create escrow</a>
            <a href="/wallet-intelligence" className="secondary-button">Analyze wallet</a>
            <a href="/reputation" className="secondary-button">View reputation</a>
          </div>
        </div>
      </section>

      <section className="stat-grid">
        {statCards.map((item) => (
          <div key={item.label} className="metric-card">
            <small>{item.label}</small>
            <strong>{item.value}</strong>
            <span>{item.delta}</span>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Recent escrows</h2>
        {error && <p className="muted">Error loading escrows: {error}</p>}
        {loading && <p className="muted">Loading...</p>}
        {!loading && escrows.length === 0 && <p>No escrows yet.</p>}
        {!loading && escrows.length > 0 && (
          <ul className="list-stack">
            {escrows.slice(0, 5).map((item: any) => (
              <li key={item.address || item.id}>
                <strong>{item.title}</strong> - {item.status || 'Active'}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
