const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
    localStorage.removeItem('user_wallet');
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

    return response.json() as Promise<T>;
  }

  // ====== AUTH ======
  async signup(email: string, password: string, name: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // ====== PROFILE ======
  async getProfile() {
    return this.request('/profile');
  }

  async updateProfile(data: Record<string, any>) {
    return this.request('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async verifyWallet(walletAddress: string, message: string, signature: string) {
    return this.request('/profile/wallet/verify', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, message, signature }),
    });
  }

  // ====== ESCROWS ======
  async listEscrows() {
    return this.request('/escrow');
  }

  async getEscrow(address: string) {
    return this.request(`/escrow/${address}`);
  }

  async createEscrow(data: Record<string, any>) {
    return this.request('/escrow', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createMilestone(address: string, data: Record<string, any>) {
    return this.request(`/escrow/${address}/milestones`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async releaseMilestone(address: string, index: number, data: Record<string, any> = {}) {
    return this.request(`/escrow/${address}/milestones/${index}/release`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelEscrow(address: string) {
    return this.request(`/escrow/${address}/cancel`, {
      method: 'POST',
    });
  }

  async syncEscrow(address: string, signature: string) {
    return this.request(`/escrow/${address}/sync`, {
      method: 'POST',
      body: JSON.stringify({ signature }),
    });
  }

  // ====== WORK SUBMISSIONS ======
  async submitWork(data: Record<string, any>) {
    return this.request('/work-submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getWorkSubmission(escrowAddress: string, milestoneIndex: number) {
    return this.request(`/work-submissions/${escrowAddress}/${milestoneIndex}`);
  }

  async evaluateWork(escrowAddress: string, milestoneIndex: number) {
    return this.request(`/work-submissions/${escrowAddress}/${milestoneIndex}/evaluate`, {
      method: 'POST',
    });
  }

  async rejectWork(escrowAddress: string, milestoneIndex: number, reason: string) {
    return this.request(`/work-submissions/${escrowAddress}/${milestoneIndex}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // ====== EVALUATIONS ======
  async submitEvidence(data: Record<string, any>) {
    return this.request('/evaluations/evidence', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getEvaluation(id: string) {
    return this.request(`/evaluations/${id}`);
  }

  async getEvaluationsByMilestone(milestoneId: string) {
    return this.request(`/evaluations/milestone/${milestoneId}`);
  }

  async aiEvaluate(data: Record<string, any>) {
    return this.request('/evaluations/ai-evaluate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ====== DISPUTES ======
  async createDispute(data: Record<string, any>) {
    return this.request('/evaluations/disputes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDispute(id: string) {
    return this.request(`/evaluations/disputes/${id}`);
  }

  async resolveDispute(id: string, resolution: string) {
    return this.request(`/evaluations/disputes/${id}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ resolution }),
    });
  }

  // ====== NOTIFICATIONS ======
  async getNotifications() {
    return this.request('/evaluations/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/evaluations/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  // ====== REPUTATION & WALLET ======
  async scanWallet(address: string) {
    return this.request(`/reputation/wallet/${address}/scan`, {
      method: 'POST',
    });
  }

  async getWalletProfile(address: string) {
    return this.request(`/reputation/wallet/${address}/profile`);
  }

  async getWalletActivity(address: string) {
    return this.request(`/reputation/wallet/${address}/activity`);
  }

  async getWalletTrading(address: string) {
    return this.request(`/reputation/wallet/${address}/trading`);
  }

  async getWalletRisk(address: string) {
    return this.request(`/reputation/wallet/${address}/risk`);
  }

  async getWalletEvidence(address: string) {
    return this.request(`/reputation/wallet/${address}/evidence`);
  }
}

export const apiClient = new ApiClient(API_BASE);
export default apiClient;
