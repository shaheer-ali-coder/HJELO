import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';

export default function ConnectPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Jane Builder');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = mode === 'login'
        ? await apiClient.login(email, password)
        : await apiClient.signup(email, password, name);

      const token = res.token;
      if (token) {
        apiClient.setToken(token);
        localStorage.setItem('auth_token', token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <section className="panel wide-panel">
        <p className="eyebrow">Onboarding</p>
        <h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
          {mode === 'signup' && (
            <label>
              <span>Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          )}
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Submitting...' : mode === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <p>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </section>
    </div>
  );
}
