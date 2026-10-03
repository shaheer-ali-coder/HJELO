import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await apiClient.getProfile();
        setProfile(res.profile || res.user || res.data || null);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const updateProfile = async (updates: Record<string, any>) => {
    try {
      const res = await apiClient.updateProfile(updates);
      const next = res.profile || res.user || res.data || null;
      setProfile(next);
      return next;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { profile, loading, error, updateProfile };
}
