import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';

export default function NewEscrowPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientAddress: '',
    freelancerAddress: '',
    title: 'Landing Page Redesign',
    description: 'Full homepage redesign',
    totalAmount: 0.85,
    token: 'SOL',
    deadline: '2026-11-01',
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await apiClient.createEscrow(formData);
      const escrow = res.escrow || res.data;
      navigate(`/escrow/${escrow?.address || escrow?.id}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="page-stack">
      <section className="panel wide-panel">
        <p className="eyebrow">Create escrow</p>
        <h1>New contract - Step {step}/5</h1>

        {step === 1 && (
          <div className="info-card">
            <h3>Counterparty</h3>
            <label>
              <span>Freelancer wallet</span>
              <input
                value={formData.freelancerAddress}
                onChange={(e) => handleFieldChange('freelancerAddress', e.target.value)}
              />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="info-card">
            <h3>Contract details</h3>
            <label>
              <span>Title</span>
              <input value={formData.title} onChange={(e) => handleFieldChange('title', e.target.value)} />
            </label>
            <label>
              <span>Description</span>
              <textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="info-card">
            <h3>Amount and deadline</h3>
            <label>
              <span>Total amount (SOL)</span>
              <input
                type="number"
                step="0.01"
                value={formData.totalAmount}
                onChange={(e) => handleFieldChange('totalAmount', parseFloat(e.target.value))}
              />
            </label>
            <label>
              <span>Deadline</span>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleFieldChange('deadline', e.target.value)}
              />
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="info-card">
            <h3>Review</h3>
            <p>Freelancer: {formData.freelancerAddress}</p>
            <p>Title: {formData.title}</p>
            <p>Amount: {formData.totalAmount} {formData.token}</p>
            <p>Deadline: {formData.deadline}</p>
          </div>
        )}

        {step === 5 && (
          <div className="info-card">
            <h3>Confirmation</h3>
            <p>Ready to create escrow. Click "Create" below.</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: 24 }}>
          <button className="secondary-button" onClick={() => setStep(Math.max(1, step - 1))}>Back</button>
          <button
            className="primary-button"
            onClick={() => (step >= 5 ? handleCreate() : setStep(step + 1))}
            disabled={loading}
          >
            {loading ? 'Creating...' : step >= 5 ? 'Create escrow' : 'Next'}
          </button>
        </div>
      </section>
    </div>
  );
}
