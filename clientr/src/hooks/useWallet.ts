import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

interface WalletAnalysis {
  wallet: string;
  firstObserved: string;
  activity: string;
  coverage: string;
  pnl: {
    realized: string;
    unrealized: string;
    total: string;
    volume: string;
  };
  riskSignals: any[];
  overallRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'INCONCLUSIVE';
}

export function useWalletAnalysis(walletAddress: string | undefined) {
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = async () => {
    if (!walletAddress) {
      setError('No wallet address provided');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const profileData = await apiClient.getWalletProfile(walletAddress);
      const riskData = await apiClient.getWalletRisk(walletAddress);
      const tradingData = await apiClient.getWalletTrading(walletAddress);

      setAnalysis({
        wallet: walletAddress,
        firstObserved: profileData.data?.firstObserved || 'N/A',
        activity: profileData.data?.activity || 'Unknown',
        coverage: profileData.data?.coverage || '0%',
        pnl: tradingData.data?.pnl || {
          realized: 'N/A',
          unrealized: 'N/A',
          total: 'N/A',
          volume: 'N/A',
        },
        riskSignals: riskData.data?.signals || [],
        overallRisk: riskData.data?.overallRisk || 'INCONCLUSIVE',
      });
    } catch (err: any) {
      setError(err.message);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return { analysis, loading, error, scan };
}
