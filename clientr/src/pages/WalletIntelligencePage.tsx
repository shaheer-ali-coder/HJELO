import { milestones, requirementChecklist, activityFeed } from '../data/mockData';

export default function EscrowDetailPage() {
  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">Escrow detail</p>
        <h1>Landing Page Redesign</h1>
        <div className="detail-grid">
          <div className="info-card">
            <h3>Contract state</h3>
            <div className="list-row"><span>Status</span><strong>Evaluating</strong></div>
            <div className="list-row"><span>Locked</span><strong>0.85 SOL</strong></div>
            <div className="list-row"><span>Released</span><strong>0.30 SOL</strong></div>
          </div>

          <div className="info-card">
            <h3>Milestones</h3>
            {milestones.map((item) => (
              <div key={item.name} className="milestone-card">
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.amount}</small>
                </div>
                <span className="status-badge success">{item.status}</span>
                <small>{item.confidence}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="two-col">
        <div className="panel">
          <h2>Requirements</h2>
          <ul className="list-stack">
            {requirementChecklist.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="panel">
          <h2>Activity</h2>
          <ul className="list-stack timeline">
            {activityFeed.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
