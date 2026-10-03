import { reputationSummary } from '../data/mockData';

export default function ReputationPage() {
  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">Public reputation</p>
        <h1>Reputation</h1>

        <div className="stat-grid">
          <div className="metric-card">
            <small>Verified milestones</small>
            <strong>{reputationSummary.verifiedMilestones}</strong>
          </div>
          <div className="metric-card">
            <small>Completed value</small>
            <strong>{reputationSummary.completedValue}</strong>
          </div>
          <div className="metric-card">
            <small>Client rating</small>
            <strong>{reputationSummary.clientRating}</strong>
          </div>
          <div className="metric-card">
            <small>Dispute rate</small>
            <strong>{reputationSummary.disputeRate}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
