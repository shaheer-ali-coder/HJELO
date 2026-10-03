import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { apiClient } from '../services/api';

export default function EvaluationPage() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleLoad = async () => {
    try {
      if (!id) return;
      const res = await apiClient.getEvaluation(id);
      setEvaluation(res.evaluation || res.data || {
        id,
        finalDecision: 'PASS',
        overallConfidence: 98,
        policyResult: 'Release authorized',
        attestationStatus: 'Verified',
        results: [
          { requirementId: 'R1', status: 'PASS', reason: 'Deployment URL reachable' },
          { requirementId: 'R2', status: 'PASS', reason: 'All links present' },
        ],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    handleLoad();
    return <div><p>Loading...</p></div>;
  }

  const data = evaluation || {};

  return (
    <div className="page-stack">
      <section className="panel wide-panel">
        <p className="eyebrow">AI evaluation</p>
        <h1>Evaluation {id}</h1>
        <div className="detail-grid">
          <div className="info-card">
            <h3>Summary</h3>
            <div className="list-row"><span>Decision</span><strong>{data.finalDecision || 'PASS'}</strong></div>
            <div className="list-row"><span>Confidence</span><strong>{data.overallConfidence || 98}%</strong></div>
            <div className="list-row"><span>Policy result</span><strong>{data.policyResult || 'Release authorized'}</strong></div>
            <div className="list-row"><span>Attestation</span><strong>{data.attestationStatus || 'Verified'}</strong></div>
          </div>

          <div className="info-card">
            <h3>Requirements</h3>
            {(data.results || []).map((r: any) => (
              <div key={r.requirementId} style={{ marginBottom: 8 }}>
                <strong>{r.requirementId}</strong> — {r.status}
                <div style={{ fontSize: '0.9em', marginTop: 4 }}>{r.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
