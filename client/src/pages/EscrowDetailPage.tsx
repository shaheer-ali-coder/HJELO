import { useParams } from 'react-router-dom';
import { useEscrow } from '../hooks/useEscrows';

export default function EscrowDetailPage() {
  const { id } = useParams();
  const { escrow, loading, error } = useEscrow(id);

  if (loading) return <div className="panel"><p>Loading escrow...</p></div>;
  if (error) return <div className="panel"><p>{error}</p></div>;

  const e = escrow || {};

  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">Escrow detail</p>
        <h1>{e.title || 'Escrow ' + id}</h1>
        <div className="detail-grid">
          <div className="info-card">
            <h3>Contract state</h3>
            <div className="list-row"><span>Status</span><strong>{e.status || 'Active'}</strong></div>
            <div className="list-row"><span>Total amount</span><strong>{e.totalAmount || '—'} {e.token || 'SOL'}</strong></div>
            <div className="list-row"><span>Deadline</span><strong>{e.deadline || '—'}</strong></div>
          </div>

          <div className="info-card">
            <h3>Parties</h3>
            <div className="list-row"><span>Client</span><strong>{e.clientAddress || '—'}</strong></div>
            <div className="list-row"><span>Freelancer</span><strong>{e.freelancerAddress || '—'}</strong></div>
          </div>
        </div>
      </section>
    </div>
  );
}
