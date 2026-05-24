import React, { useState } from 'react';
import { Activity, Users, MapPin, Globe, Clock, TrendingUp, RefreshCw, Play, Pause } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const liveSessions = [
  { id: 'sess-001', user: 'Alice M.', page: '/pricing', duration: '4m 32s', source: 'Organic', location: 'New York, US', device: 'Desktop', status: 'active', score: 87 },
  { id: 'sess-002', user: 'Bob K.', page: '/features', duration: '2m 15s', source: 'Paid', location: 'London, UK', device: 'Mobile', status: 'active', score: 62 },
  { id: 'sess-003', user: 'Carol S.', page: '/demo', duration: '8m 41s', source: 'Direct', location: 'Toronto, CA', device: 'Desktop', status: 'active', score: 94 },
  { id: 'sess-004', user: 'David L.', page: '/blog/analytics', duration: '1m 08s', source: 'Social', location: 'Sydney, AU', device: 'Mobile', status: 'active', score: 34 },
  { id: 'sess-005', user: 'Eva R.', page: '/signup', duration: '0m 54s', source: 'Referral', location: 'Berlin, DE', device: 'Tablet', status: 'active', score: 45 },
  { id: 'sess-006', user: 'Frank W.', page: '/contact', duration: '3m 20s', source: 'Email', location: 'São Paulo, BR', device: 'Desktop', status: 'active', score: 71 },
];

const sessionVolume = [
  { hour: '00:00', sessions: 120 }, { hour: '02:00', sessions: 84 }, { hour: '04:00', sessions: 62 },
  { hour: '06:00', sessions: 145 }, { hour: '08:00', sessions: 324 }, { hour: '10:00', sessions: 512 },
  { hour: '12:00', sessions: 487 }, { hour: '14:00', sessions: 618 }, { hour: '16:00', sessions: 584 },
  { hour: '18:00', sessions: 423 }, { hour: '20:00', sessions: 356 }, { hour: '22:00', sessions: 214 },
];

const sources = [
  { name: 'Organic', count: 842, color: 'var(--primary)' },
  { name: 'Paid', count: 428, color: 'var(--accent)' },
  { name: 'Direct', count: 384, color: '#14B8A6' },
  { name: 'Social', count: 296, color: 'var(--warning)' },
  { name: 'Referral', count: 184, color: '#A78BFA' },
  { name: 'Email', count: 142, color: '#F59E0B' },
];

const locations = [
  { country: 'United States', sessions: 1248, flag: '🇺🇸' },
  { country: 'United Kingdom', sessions: 482, flag: '🇬🇧' },
  { country: 'Canada', sessions: 394, flag: '🇨🇦' },
  { country: 'Germany', sessions: 287, flag: '🇩🇪' },
  { country: 'Australia', sessions: 216, flag: '🇦🇺' },
  { country: 'Brazil', sessions: 184, flag: '🇧🇷' },
];

export default function LiveSessionsPage() {
  const [isLive, setIsLive] = useState(true);
  const totalUsers = liveSessions.length;
  const activeNow = sessionVolume.reduce((s, v) => s + v.sessions, 0);

  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Live Sessions</h2>
          <p className="text-xs text-muted-foreground">Real-time user sessions and engagement metrics</p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-1.5 h-8 px-3 rounded-lg border transition-all text-xs font-medium ${
            isLive ? 'border-positive/30 bg-positive/10 text-positive' : 'border-border bg-secondary/50 text-muted-foreground'
          }`}
        >
          {isLive ? <Play size={12} /> : <Pause size={12} />}
          {isLive ? 'Live' : 'Paused'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Now', value: activeNow.toLocaleString(), icon: Activity, color: 'text-positive', bg: 'bg-positive/10', live: true },
          { label: 'Today Total', value: '8,247', icon: Users, color: 'text-neutral', bg: 'bg-neutral/10' },
          { label: 'Avg Duration', value: '4m 12s', icon: Clock, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Bounce Rate', value: '32.4%', icon: TrendingUp, color: 'text-warning', bg: 'bg-warning/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-base card-hover p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}><Icon size={14} /></div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                {(stat as any).live && <span className="w-1.5 h-1.5 rounded-full bg-positive pulse-dot" />}
              </div>
              <p className="text-xl font-bold text-foreground font-mono-nums">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card-base card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-positive" />
            <h3 className="text-sm font-semibold text-foreground">Session Volume (24h)</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sessionVolume} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-session" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip content={({ active, payload, label }: any) => active && payload?.length ? (
                <div className="card-base p-2 shadow-xl"><p className="text-xs font-semibold text-foreground">{label}</p><p className="text-xs font-mono-nums text-positive">{payload[0].value} sessions</p></div>
              ) : null} />
              <Area type="monotone" dataKey="sessions" stroke="var(--primary)" strokeWidth={2} fill="url(#grad-session)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-positive inline-block" />18% higher than yesterday</span>
            <span className="flex items-center gap-1.5"><RefreshCw size={11} />Updates every 30s</span>
          </div>
        </div>

        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Traffic Sources</h3>
          <div className="space-y-2.5">
            {sources.map((src) => (
              <div key={src.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: src.color }} />
                    <span className="text-xs text-muted-foreground">{src.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground font-mono-nums">{src.count}</span>
                </div>
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(src.count / 842) * 100}%`, background: src.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card-base card-hover overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Active Sessions Now</h3>
          </div>
          <div className="divide-y divide-border/50">
            {liveSessions.map((sess) => (
              <div key={sess.id} className="px-5 py-3 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${sess.score >= 80 ? 'bg-positive/10 text-positive' : sess.score >= 50 ? 'bg-warning/10 text-warning' : 'bg-negative/10 text-negative'}`}>
                  <Activity size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">{sess.user}</span>
                    <span className="text-[10px] text-muted-foreground">{sess.device}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <MapPin size={10} />
                    <span>{sess.location}</span>
                    <span>·</span>
                    <Globe size={10} />
                    <span>{sess.source}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground font-mono-nums">{sess.duration}</p>
                  <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{sess.page}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sess.score >= 80 ? 'badge-positive' : sess.score >= 50 ? 'badge-warning' : 'badge-negative'}`}>
                  {sess.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Top Locations</h3>
          <div className="space-y-2.5">
            {locations.map((loc) => (
              <div key={loc.country} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{loc.flag}</span>
                  <span className="text-xs text-muted-foreground">{loc.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(loc.sessions / 1248) * 100}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground font-mono-nums w-10 text-right">{loc.sessions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
