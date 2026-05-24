import React, { useState } from 'react';
import { TrendingUp, Download, Calendar, Filter } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts';

const dailyRevenue = [
  { day: 'Week 1', revenue: 84200, target: 78000, lastPeriod: 72100 },
  { day: 'Week 2', revenue: 91800, target: 78000, lastPeriod: 76400 },
  { day: 'Week 3', revenue: 102400, target: 82000, lastPeriod: 81200 },
  { day: 'Week 4', revenue: 113200, target: 82000, lastPeriod: 86800 },
];

const monthlyData = [
  { month: 'Jan', revenue: 284000, cost: 142000, profit: 142000 },
  { month: 'Feb', revenue: 298000, cost: 148000, profit: 150000 },
  { month: 'Mar', revenue: 312000, cost: 155000, profit: 157000 },
  { month: 'Apr', revenue: 328000, cost: 162000, profit: 166000 },
  { month: 'May', revenue: 284920, cost: 140000, profit: 144920 },
  { month: 'Jun', revenue: 0, cost: 0, profit: 0 },
];

const channels = [
  { name: 'Organic Search', revenue: 84200, growth: 12.4, color: 'var(--primary)' },
  { name: 'Paid Search', revenue: 62400, growth: 8.2, color: 'var(--accent)' },
  { name: 'Email', revenue: 48900, growth: -2.1, color: '#14B8A6' },
  { name: 'Direct', revenue: 38700, growth: 5.6, color: '#A78BFA' },
  { name: 'Social', revenue: 29100, growth: 18.9, color: 'var(--warning)' },
  { name: 'Partners', revenue: 21620, growth: 24.3, color: '#F59E0B' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card-base p-3 shadow-xl min-w-[140px]">
      <p className="text-[11px] font-semibold text-muted-foreground mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
          <span className="text-[11px] text-muted-foreground">{p.name}</span>
          <span className="text-[11px] font-bold font-mono-nums" style={{ color: p.color }}>
            ${p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function RevenueTrends() {
  const [view, setView] = useState<'daily' | 'monthly'>('daily');

  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Revenue Analytics</h2>
          <p className="text-xs text-muted-foreground">Detailed revenue breakdown and trends</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-secondary/50 text-xs text-foreground hover:border-primary transition-all duration-150">
            <Calendar size={13} />
            <span>May 2026</span>
          </button>
          <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-secondary/50 text-xs text-foreground hover:border-primary transition-all duration-150">
            <Filter size={13} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-secondary/50 text-xs text-foreground hover:border-primary transition-all duration-150">
            <Download size={13} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$284,920', delta: '+12.4%', status: 'positive' },
          { label: 'Avg Deal Size', value: '$591', delta: '+4.2%', status: 'positive' },
          { label: 'Win Rate', value: '36.4%', delta: '+2.1%', status: 'positive' },
          { label: 'Revenue per Rep', value: '$43,748', delta: '+8.7%', status: 'positive' },
        ].map((stat) => (
          <div key={stat.label} className="card-base card-hover p-4">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-foreground font-mono-nums">{stat.value}</p>
            <p className="text-xs text-positive mt-1">{stat.delta} vs last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card-base card-hover p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-positive" />
                <h3 className="text-sm font-semibold text-foreground">Revenue Over Time</h3>
              </div>
            </div>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(['daily', 'monthly'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1 text-xs font-medium capitalize ${
                    view === v ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={view === 'daily' ? dailyRevenue : monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey={view === 'daily' ? 'day' : 'month'} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fill="url(#grad-rev)" dot={false} />
              <Area type="monotone" dataKey="target" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="4 3" fill="none" dot={false} />
              {view === 'monthly' && <Area type="monotone" dataKey="profit" stroke="#14B8A6" strokeWidth={2} fill="none" dot={false} />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Channel</h3>
          <div className="space-y-3">
            {channels.map((ch) => (
              <div key={ch.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: ch.color }} />
                    <span className="text-xs text-muted-foreground">{ch.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground font-mono-nums">${(ch.revenue / 1000).toFixed(0)}k</span>
                    <span className={`text-[10px] font-medium ${ch.growth >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {ch.growth >= 0 ? '+' : ''}{ch.growth}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(ch.revenue / 84200) * 100}%`, background: ch.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-base card-hover p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData.filter(d => d.revenue > 0)} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="revenue" name="Revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cost" name="Cost" fill="var(--warning)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" name="Profit" fill="#14B8A6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
