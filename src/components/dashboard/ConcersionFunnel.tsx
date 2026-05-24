import React from 'react';
import { Filter, AlertTriangle } from 'lucide-react';

const funnelStages = [
  { id: 'funnel-visitors', label: 'Website Visitors', count: 142800, pct: 100, dropoff: null, color: 'var(--primary)' },
  { id: 'funnel-leads', label: 'Qualified Leads', count: 18470, pct: 12.9, dropoff: 87.1, color: 'var(--accent)' },
  { id: 'funnel-trials', label: 'Trial Signups', count: 4820, pct: 3.4, dropoff: 73.9, color: '#14B8A6' },
  { id: 'funnel-demos', label: 'Demo Requested', count: 1340, pct: 0.94, dropoff: 72.2, color: '#A78BFA' },
  { id: 'funnel-converted', label: 'Paid Conversions', count: 482, pct: 0.34, dropoff: 64.0, color: 'var(--warning)' },
];

export default function ConversionFunnel() {
  const overallConversion = ((funnelStages[funnelStages.length - 1].count / funnelStages[0].count) * 100).toFixed(2);

  return (
    <div className="card-base card-hover p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Filter size={16} className="text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Conversion Funnel</h3>
          </div>
          <p className="text-xs text-muted-foreground">Visitor → paid customer pipeline</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Overall Conv.</p>
          <p className="text-lg font-bold text-warning font-mono-nums">{overallConversion}%</p>
        </div>
      </div>

      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-warning/5 border border-warning/20 mb-4">
        <AlertTriangle size={13} className="text-warning flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-warning/90">
          Lead-to-trial dropoff is 73.9% — highest friction point. Review onboarding CTA placement.
        </p>
      </div>

      <div className="space-y-3">
        {funnelStages.map((stage, i) => (
          <div key={stage.id}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-background"
                  style={{ background: stage.color }}>
                  {i + 1}
                </span>
                <span className="text-xs font-medium text-foreground">{stage.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {stage.dropoff !== null && (
                  <span className="text-[10px] text-negative font-mono-nums">-{stage.dropoff}%</span>
                )}
                <span className="text-xs font-bold font-mono-nums text-foreground">
                  {stage.count.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="w-full h-5 bg-secondary rounded-md overflow-hidden relative">
              <div
                className="h-full rounded-md transition-all duration-700 flex items-center justify-end pr-2"
                style={{ width: `${stage.pct}%`, background: stage.color, opacity: 0.85 }}
              >
                {stage.pct > 5 && (
                  <span className="text-[9px] font-bold text-background font-mono-nums">
                    {stage.pct}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Avg. Time</p>
          <p className="text-sm font-bold text-foreground font-mono-nums">14.2d</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Avg. Deal</p>
          <p className="text-sm font-bold text-foreground font-mono-nums">$591</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Win Rate</p>
          <p className="text-sm font-bold text-positive font-mono-nums">36.4%</p>
        </div>
      </div>
    </div>
  );
}
