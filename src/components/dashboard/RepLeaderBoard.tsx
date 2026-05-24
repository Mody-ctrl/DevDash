import React, { useState, useEffect, useRef } from 'react';
import { Trophy, ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

interface Rep {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  region: string;
  dealsClosed: number;
  revenue: number;
  conversionRate: number;
  quotaAttainment: number;
  csat: number;
  trend: 'up' | 'down' | 'neutral';
  streak: number;
  rank: number;
}

const reps: Rep[] = [
  {
    id: 'rep-001', name: 'Priya Nair', initials: 'PN', avatarColor: 'from-emerald-400 to-teal-500',
    region: 'APAC', dealsClosed: 48, revenue: 52840, conversionRate: 4.2, quotaAttainment: 118,
    csat: 4.7, trend: 'up', streak: 8, rank: 1,
  },
  {
    id: 'rep-002', name: 'Dmitri Volkov', initials: 'DV', avatarColor: 'from-violet-400 to-purple-600',
    region: 'EMEA', dealsClosed: 42, revenue: 48120, conversionRate: 3.9, quotaAttainment: 107,
    csat: 4.5, trend: 'up', streak: 5, rank: 2,
  },
  {
    id: 'rep-003', name: 'Aaliya Hassan', initials: 'AH', avatarColor: 'from-pink-400 to-rose-500',
    region: 'MENA', dealsClosed: 39, revenue: 43680, conversionRate: 3.7, quotaAttainment: 98,
    csat: 4.6, trend: 'neutral', streak: 2, rank: 3,
  },
  {
    id: 'rep-004', name: 'Marcus Webb', initials: 'MW', avatarColor: 'from-blue-400 to-cyan-500',
    region: 'NA-West', dealsClosed: 36, revenue: 41200, conversionRate: 3.4, quotaAttainment: 92,
    csat: 4.3, trend: 'up', streak: 3, rank: 4,
  },
  {
    id: 'rep-005', name: 'Yuki Tanaka', initials: 'YT', avatarColor: 'from-amber-400 to-orange-500',
    region: 'APAC', dealsClosed: 34, revenue: 38940, conversionRate: 3.2, quotaAttainment: 87,
    csat: 4.4, trend: 'down', streak: 0, rank: 5,
  },
  {
    id: 'rep-006', name: 'Chioma Okafor', initials: 'CO', avatarColor: 'from-lime-400 to-green-500',
    region: 'EMEA', dealsClosed: 31, revenue: 34120, conversionRate: 2.9, quotaAttainment: 78,
    csat: 4.2, trend: 'down', streak: 0, rank: 6,
  },
  {
    id: 'rep-007', name: 'Rafael Souza', initials: 'RS', avatarColor: 'from-yellow-400 to-amber-500',
    region: 'LATAM', dealsClosed: 28, revenue: 31480, conversionRate: 2.6, quotaAttainment: 71,
    csat: 4.0, trend: 'up', streak: 4, rank: 7,
  },
  {
    id: 'rep-008', name: 'Sienna Park', initials: 'SP', avatarColor: 'from-red-400 to-pink-500',
    region: 'NA-East', dealsClosed: 24, revenue: 27640, conversionRate: 2.2, quotaAttainment: 62,
    csat: 3.8, trend: 'down', streak: 0, rank: 8,
  },
];

type SortKey = 'rank' | 'revenue' | 'dealsClosed' | 'conversionRate' | 'quotaAttainment' | 'csat';

function QuotaBadge({ pct }: { pct: number }) {
  if (pct >= 110) return <span className="badge-positive text-[10px] font-semibold px-2 py-0.5 rounded-full">{pct}%</span>;
  if (pct >= 90) return <span className="badge-neutral text-[10px] font-semibold px-2 py-0.5 rounded-full">{pct}%</span>;
  if (pct >= 75) return <span className="badge-warning text-[10px] font-semibold px-2 py-0.5 rounded-full">{pct}%</span>;
  return <span className="badge-negative text-[10px] font-semibold px-2 py-0.5 rounded-full">{pct}%</span>;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-warning text-sm font-bold">🥇</span>;
  if (rank === 2) return <span className="text-sm font-bold">🥈</span>;
  if (rank === 3) return <span className="text-sm font-bold">🥉</span>;
  return <span className="text-xs font-bold text-muted-foreground font-mono-nums">#{rank}</span>;
}

export default function RepLeaderboard() {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'rank' ? 'asc' : 'desc');
    }
  };

  const sorted = [...reps].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const dir = sortDir === 'asc' ? 1 : -1;
    return aVal > bVal ? dir : aVal < bVal ? -dir : 0;
  });

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const animate = async () => {
      const { gsap } = await import('gsap');
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' }
      );
    };

    animate();
  }, []);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDown size={11} className="text-muted-foreground/50" />;
    return sortDir === 'asc'
      ? <ChevronUp size={11} className="text-primary" />
      : <ChevronDown size={11} className="text-primary" />;
  }

  return (
    <div ref={tableRef} className="card-base card-hover overflow-hidden opacity-0">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-warning" />
          <h3 className="text-sm font-semibold text-foreground">Rep Leaderboard</h3>
          <span className="badge-neutral text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {reps.length} reps
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground">May 2026 MTD</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-border">
              {[
                { key: 'rank' as SortKey, label: 'Rank', align: 'left' },
                { key: 'rank' as SortKey, label: 'Rep', align: 'left', noSort: true },
                { key: 'dealsClosed' as SortKey, label: 'Deals', align: 'right' },
                { key: 'revenue' as SortKey, label: 'Revenue', align: 'right' },
                { key: 'conversionRate' as SortKey, label: 'Conv.', align: 'right' },
                { key: 'quotaAttainment' as SortKey, label: 'Quota', align: 'right' },
                { key: 'csat' as SortKey, label: 'CSAT', align: 'right' },
                { key: 'rank' as SortKey, label: '', align: 'right', noSort: true },
              ].map((col, ci) => (
                <th
                  key={`th-${ci}`}
                  className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  } ${!col.noSort ? 'cursor-pointer hover:text-foreground transition-colors duration-100' : ''}`}
                  onClick={() => !col.noSort && col.key !== 'rank' && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1 justify-end">
                    {col.label}
                    {!col.noSort && col.label && <SortIcon col={col.key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((rep, i) => (
              <tr
                key={rep.id}
                onMouseEnter={() => setHoveredRow(rep.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-border/50 transition-colors duration-100 ${
                  hoveredRow === rep.id ? 'bg-secondary/40' : i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                }`}
              >
                <td className="px-4 py-3 w-12">
                  <RankBadge rank={rep.rank} />
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${rep.avatarColor} flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}>
                      {rep.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{rep.name}</p>
                      <p className="text-[10px] text-muted-foreground">{rep.region}</p>
                    </div>
                    {rep.streak > 0 && (
                      <span className="text-[10px] text-warning ml-1" title={`${rep.streak}-day win streak`}>
                        🔥{rep.streak}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 text-right">
                  <span className="text-xs font-semibold text-foreground font-mono-nums">{rep.dealsClosed}</span>
                </td>

                <td className="px-4 py-3 text-right">
                  <span className="text-xs font-semibold text-positive font-mono-nums">
                    ${rep.revenue.toLocaleString()}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <span className={`text-xs font-semibold font-mono-nums ${rep.conversionRate >= 2.8 ? 'text-positive' : 'text-warning'}`}>
                    {rep.conversionRate}%
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <QuotaBadge pct={rep.quotaAttainment} />
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-xs font-semibold text-foreground font-mono-nums">{rep.csat}</span>
                    <span className="text-warning text-xs">★</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-right">
                  <div className={`flex items-center justify-end gap-1 transition-opacity duration-150 ${hoveredRow === rep.id ? 'opacity-100' : 'opacity-0'}`}>
                    {rep.trend === 'up' && <TrendingUp size={13} className="text-positive" />}
                    {rep.trend === 'down' && <TrendingDown size={13} className="text-negative" />}
                    <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-100">
                      <MoreHorizontal size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">
          Avg quota attainment: <span className="text-foreground font-semibold font-mono-nums">89.1%</span>
        </p>
        <button className="text-[11px] text-primary hover:text-primary/80 font-medium transition-colors duration-100">
          View full report →
        </button>
      </div>
    </div>
  );
}
