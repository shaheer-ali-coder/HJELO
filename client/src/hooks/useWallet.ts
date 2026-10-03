import { useState } from 'react';
import { apiClient } from '../services/api';

export function useWalletAnalysis(address: string | undefined) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = async () => {
    if (!address) {
      setError('No wallet address');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const [profile, risk, trading] = await Promise.all([
        apiClient.getWalletProfile(address),
        apiClient.getWalletRisk(address),
        apiClient.getWalletTrading(address),
      ]);
      setAnalysis({ profile, risk, trading });
    } catch (err: any) {
      setError(err.message);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return { analysis, loading, error, scan };
}
