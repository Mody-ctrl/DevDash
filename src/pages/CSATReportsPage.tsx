import React, { useState } from 'react';
import { Star, TrendingUp, TrendingDown, MessageSquare, Users, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';

const csatTrend = [
  { month: 'Jan', score: 4.1, responses: 1840 },
  { month: 'Feb', score: 4.0, responses: 1720 },
  { month: 'Mar', score: 4.2, responses: 2104 },
  { month: 'Apr', score: 4.1, responses: 1956 },
  { month: 'May', score: 4.38, responses: 2104 },
];

const ratingDistribution = [
  { rating: '5★', count: 842, color: 'var(--primary)' },
  { rating: '4★', count: 584, color: 'var(--accent)' },
  { rating: '3★', count: 312, color: '#14B8A6' },
  { rating: '2★', count: 186, color: 'var(--warning)' },
  { rating: '1★', count: 180, color: 'var(--negative)' },
];

const recentFeedback = [
  { customer: 'Meridian Software', rating: 5, text: 'Excellent platform — our team loves the analytics dashboard.', rep: 'Priya Nair', date: '2h ago' },
  { customer: 'Vantage Cloud', rating: 5, text: 'Seamless integration and outstanding support.', rep: 'Aaliya Hassan', date: '5h ago' },
  { customer: 'Orbis Analytics', rating: 4, text: 'Great product, would love more customization options.', rep: 'Yuki Tanaka', date: '1d ago' },
  { customer: 'Apex Logistics', rating: 3, text: 'Good but onboarding took longer than expected.', rep: 'Dmitri Volkov', date: '2d ago' },
  { customer: 'Northstar Inc.', rating: 2, text: 'Experiencing frequent downtimes, support response slow.', rep: 'Marcus Webb', date: '3d ago' },
  { customer: 'Pulse HR', rating: 5, text: 'Transformed our reporting workflow. Highly recommend!', rep: 'Priya Nair', date: '4d ago' },
];

const repCSAT = [
  { name: 'Priya Nair', score: 4.7, responses: 342, initials: 'PN', color: 'from-emerald-400 to-teal-500' },
  { name: 'Aaliya Hassan', score: 4.6, responses: 287, initials: 'AH', color: 'from-pink-400 to-rose-500' },
  { name: 'Dmitri Volkov', score: 4.5, responses: 312, initials: 'DV', color: 'from-violet-400 to-purple-600' },
  { name: 'Yuki Tanaka', score: 4.4, responses: 198, initials: 'YT', color: 'from-amber-400 to-orange-500' },
  { name: 'Marcus Webb', score: 4.3, responses: 224, initials: 'MW', color: 'from-blue-400 to-cyan-500' },
  { name: 'Chioma Okafor', score: 4.2, responses: 176, initials: 'CO', color: 'from-lime-400 to-green-500' },
  { name: 'Rafael Souza', score: 4.0, responses: 154, initials: 'RS', color: 'from-yellow-400 to-amber-500' },
  { name: 'Sienna Park', score: 3.8, responses: 132, initials: 'SP', color: 'from-red-400 to-pink-500' },
];

export default function CSATReportsPage() {
  const totalResponses = csatTrend.reduce((s, m) => s + m.responses, 0);
  const currentScore = csatTrend[csatTrend.length - 1].score;

  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">CSAT Reports</h2>
        <p className="text-xs text-muted-foreground">Customer satisfaction scores, trends, and feedback analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall CSAT', value: currentScore.toFixed(2), suffix: '/5', icon: Star, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Total Responses', value: totalResponses.toLocaleString(), icon: MessageSquare, color: 'text-neutral', bg: 'bg-neutral/10' },
          { label: 'Promoters (5★)', value: '40.1%', icon: ThumbsUp, color: 'text-positive', bg: 'bg-positive/10' },
          { label: 'Detractors (1-2★)', value: '17.4%', icon: ThumbsDown, color: 'text-negative', bg: 'bg-negative/10' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-base card-hover p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}><Icon size={14} /></div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground font-mono-nums">{stat.value}<span className="text-sm text-muted-foreground">{stat.suffix || ''}</span></p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">CSAT Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={csatTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[3.5, 5]} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip content={({ active, payload, label }: any) => active && payload?.length ? (
                <div className="card-base p-3 shadow-xl">
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1">{label}</p>
                  <p className="text-xs font-bold text-foreground font-mono-nums">{payload[0].value} / 5</p>
                  <p className="text-[10px] text-muted-foreground">{payload[0].payload.responses} responses</p>
                </div>
              ) : null} />
              <Line type="monotone" dataKey="score" stroke="var(--warning)" strokeWidth={2.5} dot={{ fill: 'var(--warning)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {ratingDistribution.map((r) => (
              <div key={r.rating}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground">{r.rating}</span>
                  <span className="text-xs font-semibold text-foreground font-mono-nums">{r.count}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(r.count / 842) * 100}%`, background: r.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-positive/5">
              <span className="flex items-center gap-1 text-xs text-positive"><ThumbsUp size={12} />Promoters</span>
              <span className="text-lg font-bold text-positive font-mono-nums">40.1%</span>
            </div>
            <div className="p-2 rounded-lg bg-negative/5">
              <span className="flex items-center gap-1 text-xs text-negative"><ThumbsDown size={12} />Detractors</span>
              <span className="text-lg font-bold text-negative font-mono-nums">17.4%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card-base card-hover overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Recent Feedback</h3>
          </div>
          <div className="divide-y divide-border/50">
            {recentFeedback.map((fb) => (
              <div key={fb.customer} className="px-5 py-3 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{fb.customer}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-xs ${i < fb.rating ? 'text-warning' : 'text-secondary'}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mb-1">"{fb.text}"</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>{fb.rep}</span>
                  <span>·</span>
                  <span>{fb.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-base card-hover p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">CSAT by Rep</h3>
          <div className="space-y-3">
            {repCSAT.map((rep) => (
              <div key={rep.name} className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${rep.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                  {rep.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground truncate">{rep.name}</span>
                    <span className="text-xs font-bold text-warning font-mono-nums">{rep.score}</span>
                  </div>
                  <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mt-1">
                    <div className="h-full rounded-full bg-warning" style={{ width: `${(rep.score / 5) * 100}%` }} />
                  </div>
                  <span className="text-[9px] text-muted-foreground">{rep.responses} responses</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
