// Auth
export interface SignatureChallenge {
  challenge: string;
  expiresAt: string;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
}

// Profile
export interface Profile {
  walletAddress: string;
  name: string;
  bio: string;
  role: 'client' | 'freelancer' | 'both';
  verificationState: 'verified' | 'pending' | 'unverified';
  createdAt: string;
  updatedAt: string;
  portfolioUrl?: string;
  skills?: string[];
  avatar?: string;
}

// Escrow
export interface Escrow {
  id: string;
  clientAddress: string;
  freelancerAddress: string;
  title: string;
  description: string;
  totalAmount: number;
  token: 'SOL';
  status: 'Created' | 'Funded' | 'WorkSubmitted' | 'Evaluating' | 'Verified' | 'Released' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
  onChainAddress?: string;
  transactionSignature?: string;
  milestones: Milestone[];
}

export interface Milestone {
  index: number;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'SubmittedForReview' | 'Evaluating' | 'Verified' | 'Released' | 'Failed';
  requirements: Requirement[];
  evidence?: Evidence;
  evaluation?: Evaluation;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  type: 'Test' | 'File' | 'URL' | 'Visual' | 'Text' | 'OnChain' | 'Custom';
  requiredEvidence: string;
  mandatory: boolean;
  validationMethod: string;
  reference?: string;
}

export interface Evidence {
  id: string;
  escrowId: string;
  milestoneIndex: number;
  submissionHash: string;
  evidence: Record<string, any>;
  submittedAt: string;
  submittedBy: string;
}

export interface Evaluation {
  id: string;
  escrowId: string;
  milestoneIndex: number;
  requirementsHash: string;
  evidenceHash: string;
  results: RequirementResult[];
  finalDecision: 'PASS' | 'FAIL' | 'NEEDS_REVIEW';
  overallConfidence: number;
  policyResult: string;
  attestationStatus: string;
  attestationPayload?: string;
  onChainTransaction?: string;
  createdAt: string;
}

export interface RequirementResult {
  requirementId: string;
  status: 'PASS' | 'FAIL' | 'NEEDS_REVIEW';
  confidence: number;
  evidence: string;
  reason: string;
}

// Reputation & Wallet Analysis
export interface WalletAnalysis {
  wallet: string;
  firstObserved: string;
  activity: 'Low' | 'Moderate' | 'High';
  dataCoverage: string;
  analysisStatus: 'Complete' | 'InProgress' | 'Failed';
  lastAnalyzed: string;
}

export interface WalletPnL {
  realizedPnL: string;
  unrealizedPnL: string;
  totalPnL: string;
  tradingVolume: string;
  profitableTrades: number;
  losingTrades: number;
  largestGain: string;
  largestLoss: string;
  dataCoverage: string;
}

export interface WalletRisk {
  overallSignal: 'LOW' | 'MODERATE' | 'HIGH' | 'INCONCLUSIVE';
  signals: RiskSignal[];
  explanation: string;
  lastAnalyzed: string;
  coverage: string;
}

export interface RiskSignal {
  label: string;
  status: 'good' | 'warning' | 'alert' | 'unknown';
  evidence: string;
}

export interface ReputationProfile {
  walletAddress: string;
  name: string;
  role: string;
  verificationState: string;
  bio: string;
  verifiedMilestones: number;
  completedValue: string;
  completionHistory: ReputationEvent[];
  humanReviewedMilestones: number;
  disputedMilestones: number;
}

export interface ReputationEvent {
  id: string;
  project: string;
  role: string;
  amount: string;
  milestone: string;
  verification: string;
  date: string;
  proofLink: string;
}

// Notifications
export interface Notification {
  id: string;
  type: 'escrow_funded' | 'evidence_submitted' | 'evaluation_started' | 'evaluation_completed' | 'needs_review' | 'payment_released' | 'dispute_opened' | 'deadline_approaching' | 'analysis_completed';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

// Messages
export interface Message {
  id: string;
  conversationId: string;
  senderAddress: string;
  content: string;
  attachments?: string[];
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  participants: string[];
  escrowId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
}

// Dispute
export interface Dispute {
  id: string;
  escrowId: string;
  milestoneIndex: number;
  initiatedBy: string;
  reason: string;
  status: 'Open' | 'InReview' | 'Resolved' | 'Closed';
  responses: DisputeResponse[];
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface DisputeResponse {
  id: string;
  respondentAddress: string;
  message: string;
  attachments?: string[];
  createdAt: string;
}
