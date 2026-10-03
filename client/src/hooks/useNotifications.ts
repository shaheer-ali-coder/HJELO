import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await apiClient.getNotifications();
        setNotifications(res.notifications || res.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { notifications, loading, error };
}
