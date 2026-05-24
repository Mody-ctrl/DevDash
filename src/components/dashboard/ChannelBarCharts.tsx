import React from 'react';
import { BarChart2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer,
} from 'recharts';

const channelData = [
  { channel: 'Organic Search', revenue: 84200, leads: 612, conversion: 3.4, color: 'var(--primary)' },
  { channel: 'Paid Search', revenue: 62400, leads: 428, conversion: 2.9, color: 'var(--accent)' },
  { channel: 'Email Campaigns', revenue: 48900, leads: 384, conversion: 3.8, color: '#14B8A6' },
  { channel: 'Direct / Referral', revenue: 38700, leads: 296, conversion: 2.4, color: '#A78BFA' },
  { channel: 'Social Media', revenue: 29100, leads: 318, conversion: 1.9, color: 'var(--warning)' },
  { channel: 'Partner Network', revenue: 21620, leads: 184, conversion: 2.7, color: '#F59E0B' },
];

const CustomTooltipContent = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  const item = channelData.find((c) => c.channel === label);
  return (
    <div className="card-base p-3 shadow-xl">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] text-muted-foreground">Revenue</span>
          <span className="text-[11px] font-bold text-positive font-mono-nums">
            ${payload[0].value.toLocaleString()}
          </span>
        </div>
        {item && (
          <>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] text-muted-foreground">Leads</span>
              <span className="text-[11px] font-semibold text-foreground font-mono-nums">{item.leads}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] text-muted-foreground">Conv. Rate</span>
              <span className={`text-[11px] font-semibold font-mono-nums ${item.conversion >= 2.8 ? 'text-positive' : 'text-warning'}`}>
                {item.conversion}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function ChannelBarChart() {
  const totalRevenue = channelData.reduce((s, c) => s + c.revenue, 0);

  return (
    <div className="card-base card-hover p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={16} className="text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Revenue by Channel</h3>
          </div>
          <p className="text-xs text-muted-foreground">Acquisition channel performance (30d)</p>
        </div>
        <span className="text-xs font-bold text-foreground font-mono-nums">
          ${totalRevenue.toLocaleString()}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={channelData} margin={{ top: 4, right: 4, left: -20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
          <XAxis
            dataKey="channel"
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltipContent />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
            {channelData.map((entry, index) => (
              <Cell key={`cell-channel-${index}`} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 space-y-1.5 border-t border-border pt-3">
        {channelData.slice(0, 3).map((ch) => (
          <div key={`ch-summary-${ch.channel}`} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ch.color }} />
            <span className="text-[11px] text-muted-foreground flex-1 truncate">{ch.channel}</span>
            <div className="w-20 h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(ch.revenue / channelData[0].revenue) * 100}%`, background: ch.color }}
              />
            </div>
            <span className="text-[11px] font-mono-nums font-semibold text-foreground w-16 text-right">
              ${(ch.revenue / 1000).toFixed(0)}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
