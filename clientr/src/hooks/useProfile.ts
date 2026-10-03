import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

interface Profile {
  walletAddress: string;
  name: string;
  bio: string;
  role: 'client' | 'freelancer' | 'both';
  verificationState: string;
  createdAt: string;
  portfolioUrl?: string;
  skills?: string[];
}

export function useProfile(walletAddress: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getProfile(walletAddress);
        setProfile(data.data || null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [walletAddress]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!walletAddress) return;
    try {
      const data = await apiClient.updateProfile(walletAddress, updates);
      setProfile(data.data || null);
      return data.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { profile, loading, error, updateProfile };
}
