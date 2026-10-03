const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.message || error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // AUTH
  async signMessage(message: string, signature: string, walletAddress: string) {
    return this.request('/auth/verify-signature', {
      method: 'POST',
      body: JSON.stringify({ message, signature, walletAddress }),
    });
  }

  async getChallenge(walletAddress: string) {
    return this.request('/auth/challenge', {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    });
  }

  // PROFILE
  async getProfile(walletAddress: string) {
    return this.request(`/profile/${walletAddress}`);
  }

  async updateProfile(walletAddress: string, data: any) {
    return this.request(`/profile/${walletAddress}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getProfileActivity(walletAddress: string) {
    return this.request(`/profile/${walletAddress}/activity`);
  }

  // ESCROWS
  async listEscrows(filters?: any) {
    const query = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return this.request(`/escrow${query}`);
  }

  async getEscrow(escrowId: string) {
    return this.request(`/escrow/${escrowId}`);
  }

  async createEscrow(data: any) {
    return this.request('/escrow', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createMilestone(escrowId: string, data: any) {
    return this.request(`/escrow/${escrowId}/milestones`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async releaseMilestone(escrowId: string, milestoneIndex: number, data: any) {
    return this.request(`/escrow/${escrowId}/milestones/${milestoneIndex}/release`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelEscrow(escrowId: string) {
    return this.request(`/escrow/${escrowId}/cancel`, {
      method: 'POST',
    });
  }

  async syncEscrow(escrowId: string, txSignature: string) {
    return this.request(`/escrow/${escrowId}/sync`, {
      method: 'POST',
      body: JSON.stringify({ transactionSignature: txSignature }),
    });
  }

  // WORK SUBMISSIONS
  async submitWork(escrowId: string, milestoneIndex: number, data: any) {
    return this.request(`/work-submissions`, {
      method: 'POST',
      body: JSON.stringify({
        escrowId,
        milestoneIndex,
        ...data,
      }),
    });
  }

  async getWorkSubmission(submissionId: string) {
    return this.request(`/work-submissions/${submissionId}`);
  }

  // EVALUATIONS
  async getEvaluation(evaluationId: string) {
    return this.request(`/evaluations/${evaluationId}`);
  }

  async submitEvaluationReview(evaluationId: string, data: any) {
    return this.request(`/evaluations/${evaluationId}/review`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // REPUTATION & WALLET ANALYSIS
  async scanWallet(walletAddress: string) {
    return this.request(`/reputation/wallet/${walletAddress}/scan`, {
      method: 'POST',
    });
  }

  async getWalletProfile(walletAddress: string) {
    return this.request(`/reputation/wallet/${walletAddress}/profile`);
  }

  async getWalletActivity(walletAddress: string) {
    return this.request(`/reputation/wallet/${walletAddress}/activity`);
  }

  async getWalletTrading(walletAddress: string) {
    return this.request(`/reputation/wallet/${walletAddress}/trading`);
  }

  async getWalletRisk(walletAddress: string) {
    return this.request(`/reputation/wallet/${walletAddress}/risk`);
  }

  async getWalletEvents(walletAddress: string) {
    return this.request(`/reputation/wallet/${walletAddress}/events`);
  }

  async getWalletEvidence(walletAddress: string) {
    return this.request(`/reputation/wallet/${walletAddress}/evidence`);
  }
}

export const apiClient = new ApiClient(API_BASE);
export type { ApiResponse };
