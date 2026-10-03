export type EscrowStatus = 'Active' | 'Pending' | 'Evaluating' | 'Released' | 'Disputed';

export const overviewStats = [
  { label: 'Active escrows', value: '12', delta: '+3 this month' },
  { label: 'Locked funds', value: '18.4 SOL', delta: '$9.2k USD' },
  { label: 'Completed milestones', value: '41', delta: '+8% month over month' },
  { label: 'Pending evaluations', value: '6', delta: '2 need review' }
];

export const escrows = [
  {
    id: 'esc_204',
    title: 'Landing Page Redesign',
    counterparty: '0xA3F...1C4',
    amount: '0.85 SOL',
    progress: 72,
    status: 'Evaluating' as EscrowStatus,
    aiStatus: 'PASS',
    updated: '2h ago'
  },
  {
    id: 'esc_311',
    title: 'Community Launch Assets',
    counterparty: '7xK...9ab',
    amount: '1.2 SOL',
    progress: 45,
    status: 'Active' as EscrowStatus,
    aiStatus: 'Reviewing',
    updated: '4h ago'
  },
  {
    id: 'esc_412',
    title: 'Protocol Dashboard UI',
    counterparty: '4dQ...2FF',
    amount: '2.4 SOL',
    progress: 100,
    status: 'Released' as EscrowStatus,
    aiStatus: 'Verified',
    updated: '1d ago'
  }
];

export const walletAnalysis = {
  wallet: '7xK...9ab',
  firstObserved: '2024-08-14',
  activity: 'High',
  coverage: '87%',
  overallRisk: 'LOW',
  pnl: {
    realized: '+12.6 SOL',
    unrealized: '+2.1 SOL',
    total: '+14.7 SOL',
    volume: '$48.3k'
  },
  risks: [
    'Counterparty concentration under 18%',
    'Wallet age exceeds 10 months',
    'Protocol activity is diversified across swaps and LP positions'
  ]
};

export const reputationSummary = {
  verifiedMilestones: 17,
  completedValue: '18.4 SOL',
  clientRating: '4.9',
  disputeRate: '0.4%'
};

export const alerts = [
  'Evidence submitted for Milestone 3',
  'AI evaluation completed and ready for release',
  'Wallet analysis completed with low risk signal'
];

export const milestones = [
  {
    name: 'Home page build',
    amount: '0.25 SOL',
    status: 'Verified',
    confidence: '98%'
  },
  {
    name: 'Pricing and contact',
    amount: '0.25 SOL',
    status: 'Needs Review',
    confidence: '81%'
  },
  {
    name: 'Design polish',
    amount: '0.35 SOL',
    status: 'Pending',
    confidence: '—'
  }
];

export const requirementChecklist = [
  'Deployment URL reachable',
  'Home, Pricing, Contact links present',
  'Approved logo in header',
  'Mobile layout renders correctly'
];

export const riskSignals = [
  { label: 'Wallet age', value: 'Strong', hint: 'Observed for 14 months' },
  { label: 'Fund movement', value: 'Moderate', hint: 'One large transfer this month' },
  { label: 'Counterparty concentration', value: 'Low', hint: 'No single counterparty > 15%' },
  { label: 'Protocol exposure', value: 'Diversified', hint: 'Stable coin and DEX activity' }
];

export const activityFeed = [
  'Escrow funded on Solana',
  'Evidence submitted for milestone 2',
  'AI evaluation completed',
  'Attestation signed and release authorized'
];
