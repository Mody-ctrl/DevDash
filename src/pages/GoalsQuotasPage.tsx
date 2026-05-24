import React from 'react';
import { Target, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

const goals = [
  { name: 'Revenue Quota', value: 82.1, fill: '#14B8A6', target: '$347,000', current: '$284,920', status: 'neutral' },
  { name: 'CSAT Goal', value: 87.6, fill: 'var(--primary)', target: '4.5 / 5', current: '4.38', status: 'neutral' },
  { name: 'Task Completion', value: 73.4, fill: 'var(--accent)', target: '100%', current: '73.4%', status: 'warning' },
  { name: 'Conversion Target', value: 65.25, fill: 'var(--warning)', target: '4.0%', current: '2.61%', status: 'negative' },
];

const quarterlyTargets = [
  { quarter: 'Q1 2026', target: 300000, actual: 284000, pct: 94.7 },
  { quarter: 'Q2 2026', target: 320000, actual: 284920, pct: 89.0 },
  { quarter: 'Q3 2026', target: 350000, actual: 0, pct: 0 },
  { quarter: 'Q4 2026', target: 380000, actual: 0, pct: 0 },
];

const repQuotas = [
  { name: 'Priya Nair', quota: 44800, actual: 52840, pct: 118 },
  { name: 'Dmitri Volkov', quota: 45000, actual: 48120, pct: 107 },
  { name: 'Aaliya Hassan', quota: 44600, actual: 43680, pct: 98 },
  { name: 'Marcus Webb', quota: 44800, actual: 41200, pct: 92 },
  { name: 'Yuki Tanaka', quota: 44800, actual: 38940, pct: 87 },
  { name: 'Chioma Okafor', quota: 43700, actual: 34120, pct: 78 },
  { name: 'Rafael Souza', quota: 44300, actual: 31480, pct: 71 },
  { name: 'Sienna Park', quota: 44600, actual: 27640, pct: 62 },
];

const CustomTooltipContent = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="card-base p-3 shadow-xl">
      <p className="text-xs font-semibold text-foreground mb-1">{d.name}</p>
      <div className="flex items-center justify-between gap-4"><span className="text-[11px] text-muted-foreground">Progress</span><span className="text-[11px] font-bold font-mono-nums" style={{ color: d.fill }}>{d.value.toFixed(1)}%</span></div>
      <div className="flex items-center justify-between gap-4"><span className="text-[11px] text-muted-foreground">Current</span><span className="text-[11px] font-semibold text-foreground font-mono-nums">{d.current}</span></div>
      <div className="flex items-center justify-between gap-4"><span className="text-[11px] text-muted-foreground">Target</span><span className="text-[11px] font-semibold text-foreground font-mono-nums">{d.target}</span></div>
    </div>
  );
};

function StatusBadge({ status }: { status: string }) {
  if (status === 'positive') return <span className="badge-positive text-[10px] font-semibold px-2 py-0.5 rounded-full">On Track</span>;
  if (status === 'warning') return <span className="badge-warning text-[10px] font-semibold px-2 py-0.5 rounded-full">At Risk</span>;
  if (status === 'negative') return <span className="badge-negative text-[10px] font-semibold px-2 py-0.5 rounded-full">Behind</span>;
  return <span className="badge-neutral text-[10px] font-semibold px-2 py-0.5 rounded-full">Pending</span>;
}

export default function GoalsQuotasPage() {
  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">Goals & Quotas</h2>
        <p className="text-xs text-muted-foreground">Track quarterly targets, quotas, and goal attainment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Annual Target', value: '$1.35M', pct: '21.1%', color: 'text-positive', icon: DollarSign },
          { label: 'Quota Attainment', value: '81.8%', pct: 'Team avg', color: 'text-neutral', icon: Target },
          { label: 'Goals on Track', value: '2 / 4', pct: '50%', color: 'text-positive', icon: CheckCircle },
          { label: 'Top Performer', value: '118%', pct: 'Priya Nair', color: 'text-warning', icon: TrendingUp },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-base card-hover p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg bg-secondary flex items-center justify-center ${stat.color}`}><Icon size={14} /></div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground font-mono-nums">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.color}`}>{stat.pct}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Goal Attainment</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={goals} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={4} background={{ fill: 'var(--secondary)' }} />
              <Tooltip content={<CustomTooltipContent />} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {goals.map((goal) => (
              <div key={goal.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: goal.fill }} />
                  <span className="text-[11px] text-muted-foreground truncate max-w-[120px]">{goal.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${goal.value}%`, background: goal.fill }} />
                  </div>
                  <span className="text-[11px] font-semibold font-mono-nums text-foreground w-8 text-right">{goal.value.toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Quarterly Targets</h3>
          <div className="space-y-4">
            {quarterlyTargets.map((q) => (
              <div key={q.quarter}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{q.quarter}</span>
                    {q.pct > 0 && <StatusBadge status={q.pct >= 100 ? 'positive' : q.pct >= 75 ? 'warning' : q.pct === 0 ? 'neutral' : 'negative'} />}
                  </div>
                  <div className="flex items-center gap-3">
                    {q.actual > 0 && <span className="text-[11px] text-muted-foreground font-mono-nums">${q.actual.toLocaleString()}</span>}
                    <span className="text-[11px] font-semibold text-foreground font-mono-nums">${q.target.toLocaleString()}</span>
                    {q.pct > 0 && <span className={`text-[11px] font-bold font-mono-nums ${q.pct >= 100 ? 'text-positive' : 'text-warning'}`}>{q.pct}%</span>}
                  </div>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(q.pct, 100)}%`, background: q.pct >= 100 ? 'var(--primary)' : 'var(--warning)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-base card-hover overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Rep Quota Attainment</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                {['Rep', 'Quota', 'Actual', 'Attainment', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {repQuotas.map((r) => (
                <tr key={r.name} className="border-b border-border/50">
                  <td className="px-4 py-3"><span className="text-xs font-semibold text-foreground">{r.name}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono-nums text-muted-foreground">${r.quota.toLocaleString()}</span></td>
                  <td className="px-4 py-3"><span className="text-xs font-mono-nums text-foreground">${r.actual.toLocaleString()}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(r.pct, 100)}%`, background: r.pct >= 100 ? 'var(--primary)' : r.pct >= 80 ? 'var(--warning)' : 'var(--negative)' }} />
                      </div>
                      <span className={`text-[11px] font-bold font-mono-nums ${r.pct >= 100 ? 'text-positive' : r.pct >= 80 ? 'text-warning' : 'text-negative'}`}>{r.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={r.pct >= 100 ? 'positive' : r.pct >= 80 ? 'warning' : 'negative'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
