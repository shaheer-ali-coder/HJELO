import { useState } from 'react';
import { useWalletAnalysis } from '../hooks/useWallet';

export default function WalletIntelligencePage() {
  const [address, setAddress] = useState('7xK9ab');
  const { analysis, loading, error, scan } = useWalletAnalysis(address);

  const handleScan = () => {
    if (address.trim()) {
      scan();
    }
  };

  return (
    <div className="page-stack">
      <section className="panel wide-panel">
        <p className="eyebrow">Wallet analysis</p>
        <h1>Analyze a wallet</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: 20 }}>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            style={{ flex: 1, padding: '8px' }}
          />
          <button className="primary-button" onClick={handleScan} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {error && <p className="muted" style={{ color: 'red' }}>{error}</p>}
        {loading && <p className="muted">Loading wallet data...</p>}

        {analysis && (
          <div className="detail-grid">
            <div className="info-card">
              <h3>Wallet profile</h3>
              <div className="list-row">
                <span>Wallet</span>
                <strong>{analysis.profile?.wallet || address}</strong>
              </div>
              <div className="list-row">
                <span>First observed</span>
                <strong>{analysis.profile?.firstObserved || 'N/A'}</strong>
              </div>
              <div className="list-row">
                <span>Activity</span>
                <strong>{analysis.profile?.walletActivity?.status || 'Unknown'}</strong>
              </div>
            </div>

            <div className="info-card">
              <h3>Risk assessment</h3>
              <div className="list-row">
                <span>Overall risk</span>
                <strong>{analysis.risk?.risk?.level || 'Unknown'}</strong>
              </div>
              <div className="list-row">
                <span>Coverage</span>
                <strong>{analysis.profile?.coverage || '0%'}</strong>
              </div>
            </div>

            {analysis.trading && (
              <div className="info-card">
                <h3>Trading P/L</h3>
                <div className="list-row"><span>Realized</span><strong>{analysis.trading.realizedPnL || 'N/A'}</strong></div>
                <div className="list-row"><span>Unrealized</span><strong>{analysis.trading.unrealizedPnL || 'N/A'}</strong></div>
                <div className="list-row"><span>Volume</span><strong>{analysis.trading.tradingVolume || 'N/A'}</strong></div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
