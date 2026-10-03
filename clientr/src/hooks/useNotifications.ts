import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'escrow' | 'evaluation' | 'payment' | 'dispute';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulated polling - replace with actual API call to /api/notifications
    const loadNotifications = async () => {
      try {
        // TODO: Replace with apiClient.getNotifications() once backend is ready
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  return { notifications, loading, error };
}
