import { useParams } from 'react-router-dom';
import { useWalletAnalysis } from '../hooks/useWallet';
import { useEffect } from 'react';

export default function WalletReportPage() {
  const { address } = useParams();
  const { analysis, loading, error, scan } = useWalletAnalysis(address);

  useEffect(() => {
    if (address) scan();
  }, [address]);

  if (loading) return <div className="panel"><p>Loading wallet report...</p></div>;
  if (error) return <div className="panel"><p>Error: {error}</p></div>;

  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">Wallet report</p>
        <h1>{address}</h1>
        {analysis ? (
          <div className="detail-grid">
            <div className="info-card">
              <h3>Overview</h3>
              <div className="list-row"><span>Wallet</span><strong>{analysis.profile?.wallet || address}</strong></div>
              <div className="list-row"><span>Activity</span><strong>High</strong></div>
              <div className="list-row"><span>Coverage</span><strong>{analysis.profile?.coverage || '87%'}</strong></div>
            </div>

            <div className="info-card">
              <h3>Risk</h3>
              <div className="list-row"><span>Overall</span><strong>{analysis.risk?.risk?.level || 'LOW'}</strong></div>
              <div className="list-row"><span>Score</span><strong>{analysis.risk?.risk?.score || 'N/A'}</strong></div>
            </div>
          </div>
        ) : (
          <p>No analysis data available.</p>
        )}
      </section>
    </div>
  );
}
