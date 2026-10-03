import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

export function useEscrows() {
  const [escrows, setEscrows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await apiClient.listEscrows();
        setEscrows(res.escrows || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setEscrows([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { escrows, loading, error };
}

export function useEscrow(address: string | undefined) {
  const [escrow, setEscrow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        setLoading(true);
        const res = await apiClient.getEscrow(address);
        setEscrow(res.escrow || res.data || null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setEscrow(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [address]);

  return { escrow, loading, error };
}
