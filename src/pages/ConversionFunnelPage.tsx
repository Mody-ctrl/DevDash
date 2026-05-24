import React from 'react';
import { Filter, AlertTriangle, TrendingDown, TrendingUp, Users, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const funnelStages = [
  { stage: 'Visitors', count: 142800, rate: 100, color: 'var(--primary)' },
  { stage: 'Leads', count: 18470, rate: 12.9, color: 'var(--accent)' },
  { stage: 'Trials', count: 4820, rate: 3.4, color: '#14B8A6' },
  { stage: 'Demos', count: 1340, rate: 0.94, color: '#A78BFA' },
  { stage: 'Paid', count: 482, rate: 0.34, color: 'var(--warning)' },
];

const abandonData = [
  { stage: 'Visit → Lead', dropoff: 87.1, reason: 'Low engagement on landing pages' },
  { stage: 'Lead → Trial', dropoff: 73.9, reason: 'Weak CTA & signup friction' },
  { stage: 'Trial → Demo', dropoff: 72.2, reason: 'Trial-to-demo conversion gap' },
  { stage: 'Demo → Paid', dropoff: 64.0, reason: 'Price objection & competitor eval' },
];

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card-base p-3 shadow-xl">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="text-[11px] text-muted-foreground">{p.name}</span>
          <span className="text-[11px] font-bold font-mono-nums" style={{ color: p.color }}>
            {p.value.toLocaleString()}{p.name === 'rate' ? '%' : ''}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function ConversionFunnelPage() {
  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">Conversion Funnel</h2>
        <p className="text-xs text-muted-foreground">End-to-end pipeline analysis with dropoff insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Conv.', value: '0.34%', icon: Filter, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Avg. Time to Convert', value: '14.2d', icon: TrendingDown, color: 'text-positive', bg: 'bg-positive/10' },
          { label: 'Active Leads', value: '1,847', icon: Users, color: 'text-neutral', bg: 'bg-neutral/10' },
          { label: 'Revenue Impact', value: '$42.8k', icon: DollarSign, color: 'text-positive', bg: 'bg-positive/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-base card-hover p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon size={14} />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground font-mono-nums">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Funnel Stages</h3>
          <div className="space-y-4">
            {funnelStages.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-background" style={{ background: stage.color }}>
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-foreground">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {i > 0 && <span className="text-[10px] text-negative font-mono-nums">-{(100 - stage.rate).toFixed(1)}%</span>}
                    <span className="text-xs font-bold font-mono-nums text-foreground">{stage.count.toLocaleString()}</span>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{stage.rate}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stage.rate}%`, background: stage.color, opacity: 0.85 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Dropoff Analysis</h3>
          <div className="space-y-4">
            {abandonData.map((item) => (
              <div key={item.stage} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{item.stage}</span>
                  <span className="text-xs font-bold text-negative font-mono-nums">-{item.dropoff}%</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-1.5">
                  <div className="h-full rounded-full bg-negative/60" style={{ width: `${item.dropoff}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-base card-hover p-5">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-warning/5 border border-warning/20 mb-4">
          <AlertTriangle size={13} className="text-warning flex-shrink-0" />
          <p className="text-xs text-warning/90">
            Lead-to-trial dropoff is 73.9% — highest friction point. Review onboarding CTA placement and trial signup flow.
          </p>
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Stage Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={funnelStages} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="stage" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltipContent />} />
            <Bar dataKey="count" name="Users" radius={[4, 4, 0, 0]}>
              {funnelStages.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} fillOpacity={0.85} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
