import React, { useState } from 'react';
import { Zap, Play, Pause, Clock, Users, Mail, CheckCircle, AlertCircle, RefreshCw, Settings, Plus, Activity } from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused' | 'draft' | 'error';
  runs: number;
  lastRun: string;
  successRate: number;
  icon: React.ElementType;
}

const automations: Automation[] = [
  { id: 'auto-001', name: 'Lead Nurture Sequence', description: 'Send drip emails to new qualified leads', trigger: 'Lead status → Qualified', action: 'Enroll in 5-email drip', status: 'active', runs: 1284, lastRun: '2m ago', successRate: 98.2, icon: Mail },
  { id: 'auto-002', name: 'Dormant Lead Re-engagement', description: 'Re-engage leads inactive for 30+ days', trigger: 'Lead inactive > 30d', action: 'Send re-engagement email', status: 'active', runs: 847, lastRun: '15m ago', successRate: 94.7, icon: RefreshCw },
  { id: 'auto-003', name: 'High-Value Lead Alert', description: 'Notify sales rep of high-value lead activity', trigger: 'Lead score > 85', action: 'Slack notification + task', status: 'active', runs: 342, lastRun: '42m ago', successRate: 100, icon: Zap },
  { id: 'auto-004', name: 'Trial Expiry Reminder', description: 'Remind trial users before expiry', trigger: 'Trial ends in 3 days', action: 'Send reminder email', status: 'active', runs: 624, lastRun: '1h ago', successRate: 96.8, icon: Clock },
  { id: 'auto-005', name: 'CSAT Survey Trigger', description: 'Send CSAT survey after deal closed', trigger: 'Deal status → Closed Won', action: 'Send NPS survey', status: 'paused', runs: 423, lastRun: '2d ago', successRate: 91.5, icon: CheckCircle },
  { id: 'auto-006', name: 'Churn Risk Flagging', description: 'Flag accounts with churn-risk indicators', trigger: 'Login frequency drop > 50%', action: 'Flag in CRM + notify CS', status: 'active', runs: 187, lastRun: '3h ago', successRate: 88.3, icon: AlertCircle },
  { id: 'auto-007', name: 'Weekly Performance Report', description: 'Generate and email weekly metrics', trigger: 'Every Monday 8 AM', action: 'Generate report + email', status: 'active', runs: 104, lastRun: '1d ago', successRate: 100, icon: Activity },
  { id: 'auto-008', name: 'Onboarding Flow V2', description: 'Automated onboarding for new customers', trigger: 'Account created', action: 'Enroll in 7-step onboarding', status: 'draft', runs: 0, lastRun: '—', successRate: 0, icon: Users },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'badge-positive' },
  paused: { label: 'Paused', className: 'badge-warning' },
  draft: { label: 'Draft', className: 'badge-neutral' },
  error: { label: 'Error', className: 'badge-negative' },
};

export default function AutomationPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filtered = selectedStatus === 'all' ? automations : automations.filter((a) => a.status === selectedStatus);

  const totalRuns = automations.reduce((s, a) => s + a.runs, 0);
  const activeCount = automations.filter((a) => a.status === 'active').length;

  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Automation</h2>
          <p className="text-xs text-muted-foreground">Automated workflows, triggers, and actions</p>
        </div>
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
          <Plus size={13} />
          <span>New Automation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Workflows', value: activeCount.toString(), icon: Zap, color: 'text-positive', bg: 'bg-positive/10' },
          { label: 'Total Runs', value: totalRuns.toLocaleString(), icon: Play, color: 'text-neutral', bg: 'bg-neutral/10' },
          { label: 'Avg. Success Rate', value: '94.2%', icon: CheckCircle, color: 'text-positive', bg: 'bg-positive/10' },
          { label: 'Errors', value: '3', icon: AlertCircle, color: 'text-negative', bg: 'bg-negative/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-base card-hover p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}><Icon size={14} /></div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground font-mono-nums">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {['all', 'active', 'paused', 'draft', 'error'].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-150 ${
              selectedStatus === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((auto) => {
          const status = statusConfig[auto.status];
          const Icon = auto.icon;
          return (
            <div
              key={auto.id}
              className="card-base card-hover p-5 relative overflow-hidden group"
            >
              {auto.status === 'error' && <div className="absolute inset-0 bg-negative/3 pointer-events-none rounded-xl" />}
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  auto.status === 'active' ? 'bg-positive/10 text-positive' :
                  auto.status === 'paused' ? 'bg-warning/10 text-warning' :
                  auto.status === 'error' ? 'bg-negative/10 text-negative' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-sm font-semibold text-foreground">{auto.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.className}`}>{status.label}</span>
                      {auto.status === 'active' && (
                        <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-warning opacity-0 group-hover:opacity-100 transition-all">
                          <Pause size={12} />
                        </button>
                      )}
                      {auto.status === 'paused' && (
                        <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-positive opacity-0 group-hover:opacity-100 transition-all">
                          <Play size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-3">{auto.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-1.5 rounded bg-secondary/50">
                      <span className="text-muted-foreground">Trigger</span>
                      <p className="text-foreground font-medium truncate">{auto.trigger}</p>
                    </div>
                    <div className="p-1.5 rounded bg-secondary/50">
                      <span className="text-muted-foreground">Action</span>
                      <p className="text-foreground font-medium truncate">{auto.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Play size={10} />{auto.runs.toLocaleString()} runs</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{auto.lastRun}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">Success</span>
                      <span className={`text-[10px] font-bold font-mono-nums ${auto.successRate >= 95 ? 'text-positive' : auto.successRate >= 80 ? 'text-warning' : 'text-negative'}`}>
                        {auto.successRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${auto.status === 'error' ? 'bg-negative' : auto.status === 'active' ? 'bg-positive' : 'bg-muted-foreground/30'}`}
                    style={{ width: `${auto.successRate}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
