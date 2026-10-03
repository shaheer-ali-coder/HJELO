import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

interface Escrow {
  id: string;
  clientAddress: string;
  freelancerAddress: string;
  title: string;
  description: string;
  totalAmount: number;
  token: string;
  status: string;
  createdAt: string;
  milestones: any[];
}

export function useEscrows(filters?: any) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEscrows = async () => {
      try {
        setLoading(true);
        const data = await apiClient.listEscrows(filters);
        setEscrows(data.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setEscrows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEscrows();
  }, [filters]);

  return { escrows, loading, error };
}

export function useEscrow(escrowId: string | undefined) {
  const [escrow, setEscrow] = useState<Escrow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!escrowId) {
      setLoading(false);
      return;
    }

    const fetchEscrow = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getEscrow(escrowId);
        setEscrow(data.data || null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setEscrow(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEscrow();
  }, [escrowId]);

  return { escrow, loading, error };
}
