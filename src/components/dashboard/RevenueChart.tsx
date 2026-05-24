import React, { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const revenueData = [
  { day: 'Apr 24', revenue: 8420, target: 9000, sessions: 3210 },
  { day: 'Apr 25', revenue: 9180, target: 9000, sessions: 3540 },
  { day: 'Apr 26', revenue: 7640, target: 9000, sessions: 2980 },
  { day: 'Apr 27', revenue: 10240, target: 9000, sessions: 4120 },
  { day: 'Apr 28', revenue: 11320, target: 9000, sessions: 4580 },
  { day: 'Apr 29', revenue: 9870, target: 9000, sessions: 3890 },
  { day: 'Apr 30', revenue: 10540, target: 9000, sessions: 4210 },
  { day: 'May 01', revenue: 12100, target: 9200, sessions: 4980 },
  { day: 'May 02', revenue: 11380, target: 9200, sessions: 4620 },
  { day: 'May 03', revenue: 9240, target: 9200, sessions: 3740 },
  { day: 'May 04', revenue: 10780, target: 9200, sessions: 4340 },
  { day: 'May 05', revenue: 13200, target: 9400, sessions: 5240 },
  { day: 'May 06', revenue: 12840, target: 9400, sessions: 5100 },
  { day: 'May 07', revenue: 11940, target: 9400, sessions: 4820 },
  { day: 'May 08', revenue: 14120, target: 9400, sessions: 5680 },
  { day: 'May 09', revenue: 13680, target: 9400, sessions: 5420 },
  { day: 'May 10', revenue: 12340, target: 9400, sessions: 4940 },
  { day: 'May 11', revenue: 8920, target: 9600, sessions: 3580 },
  { day: 'May 12', revenue: 7840, target: 9600, sessions: 3120 },
  { day: 'May 13', revenue: 6980, target: 9600, sessions: 2780 },
  { day: 'May 14', revenue: 8240, target: 9600, sessions: 3320 },
  { day: 'May 15', revenue: 9840, target: 9600, sessions: 3940 },
  { day: 'May 16', revenue: 11240, target: 9600, sessions: 4520 },
  { day: 'May 17', revenue: 12840, target: 9800, sessions: 5120 },
  { day: 'May 18', revenue: 13940, target: 9800, sessions: 5580 },
  { day: 'May 19', revenue: 14820, target: 9800, sessions: 5940 },
  { day: 'May 20', revenue: 15640, target: 9800, sessions: 6280 },
  { day: 'May 21', revenue: 14280, target: 9800, sessions: 5720 },
  { day: 'May 22', revenue: 16120, target: 9800, sessions: 6480 },
  { day: 'May 23', revenue: 9497, target: 9800, sessions: 3840 },
];

const CustomTooltipContent = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  const revenue = payload.find((p) => p.name === 'revenue');
  const target = payload.find((p) => p.name === 'target');
  const sessions = payload.find((p) => p.name === 'sessions');

  return (
    <div className="card-base p-3 shadow-xl min-w-[160px]">
      <p className="text-[11px] font-semibold text-muted-foreground mb-2">{label}</p>
      {revenue && (
        <div className="flex items-center justify-between gap-4 mb-1">
          <span className="text-xs text-muted-foreground">Revenue</span>
          <span className="text-xs font-bold text-positive font-mono-nums">
            ${revenue.value.toLocaleString()}
          </span>
        </div>
      )}
      {target && (
        <div className="flex items-center justify-between gap-4 mb-1">
          <span className="text-xs text-muted-foreground">Target</span>
          <span className="text-xs font-semibold text-accent font-mono-nums">
            ${target.value.toLocaleString()}
          </span>
        </div>
      )}
      {sessions && (
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">Sessions</span>
          <span className="text-xs font-semibold text-foreground font-mono-nums">
            {sessions.value.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default function RevenueChart() {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'sessions'>('revenue');

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const avgDaily = totalRevenue / revenueData.length;
  const lastDay = revenueData[revenueData.length - 1];
  const prevDay = revenueData[revenueData.length - 2];
  const dayDelta = ((lastDay.revenue - prevDay.revenue) / prevDay.revenue) * 100;

  return (
    <div className="card-base card-hover p-5 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-positive" />
            <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
            <button className="text-muted-foreground hover:text-foreground transition-colors duration-100">
              <Info size={13} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">30-day daily revenue vs target</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(['revenue', 'sessions'] as const).map((m) => (
              <button
                key={`metric-toggle-${m}`}
                onClick={() => setActiveMetric(m)}
                className={`px-3 py-1 text-xs font-medium transition-all duration-150 capitalize ${
                  activeMetric === m
                    ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Total (30d)</p>
          <p className="text-lg font-bold text-foreground font-mono-nums">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Daily Avg</p>
          <p className="text-lg font-bold text-foreground font-mono-nums">
            ${Math.round(avgDaily).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Today vs Yesterday</p>
          <p className={`text-lg font-bold font-mono-nums ${dayDelta >= 0 ? 'text-positive' : 'text-negative'}`}>
            {dayDelta >= 0 ? '+' : ''}{dayDelta.toFixed(1)}%
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded-full bg-positive inline-block" />
            <span className="text-muted-foreground">Revenue</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded-full bg-accent inline-block border-dashed border-t border-accent" />
            <span className="text-muted-foreground">Target</span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-sessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-target" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltipContent />} />
          {activeMetric === 'revenue' && (
            <>
              <Area
                type="monotone"
                dataKey="target"
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                fill="url(#grad-target)"
                dot={false}
                activeDot={false}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#grad-revenue)"
                dot={false}
                activeDot={{ r: 4, fill: 'var(--primary)', strokeWidth: 0 }}
              />
            </>
          )}
          {activeMetric === 'sessions' && (
            <Area
              type="monotone"
              dataKey="sessions"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#grad-sessions)"
              dot={false}
              activeDot={{ r: 4, fill: 'var(--accent)', strokeWidth: 0 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
