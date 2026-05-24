import React, { useState } from 'react';
import { ShoppingCart, Search, Download, ChevronDown, ArrowUpRight, ArrowDownRight, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: string;
  date: string;
  rep: string;
  plan: string;
}

const transactions: Transaction[] = [
  { id: 'TXN-3842', customer: 'Meridian Software', email: 'billing@meridian.io', amount: 14400, status: 'completed', method: 'Wire Transfer', date: '2026-05-23', rep: 'Priya Nair', plan: 'Enterprise Annual' },
  { id: 'TXN-3841', customer: 'Vantage Cloud', email: 'acct@vantagecloud.com', amount: 8900, status: 'completed', method: 'Credit Card', date: '2026-05-23', rep: 'Aaliya Hassan', plan: 'Professional Annual' },
  { id: 'TXN-3840', customer: 'Orbis Analytics', email: 'pay@orbisanalytics.co', amount: 4200, status: 'pending', method: 'ACH', date: '2026-05-23', rep: 'Yuki Tanaka', plan: 'Starter Annual' },
  { id: 'TXN-3839', customer: 'Northstar Inc.', email: 'finance@northstar.com', amount: 12000, status: 'failed', method: 'Credit Card', date: '2026-05-22', rep: 'Marcus Webb', plan: 'Enterprise Monthly' },
  { id: 'TXN-3838', customer: 'Apex Logistics', email: 'billing@apexlogistics.com', amount: 2800, status: 'completed', method: 'PayPal', date: '2026-05-22', rep: 'Dmitri Volkov', plan: 'Starter Monthly' },
  { id: 'TXN-3837', customer: 'Pulse HR', email: 'accounts@pulsehr.com', amount: 6200, status: 'completed', method: 'Wire Transfer', date: '2026-05-21', rep: 'Priya Nair', plan: 'Professional Monthly' },
  { id: 'TXN-3836', customer: 'CloudBase', email: 'finance@cloudbase.io', amount: 15400, status: 'refunded', method: 'ACH', date: '2026-05-21', rep: 'Chioma Okafor', plan: 'Enterprise Annual' },
  { id: 'TXN-3835', customer: 'Sigma AI', email: 'payments@sigm-ai.com', amount: 3600, status: 'completed', method: 'Credit Card', date: '2026-05-20', rep: 'Rafael Souza', plan: 'Starter Annual' },
  { id: 'TXN-3834', customer: 'NexGen Corp', email: 'ap@nexgencorp.net', amount: 7800, status: 'pending', method: 'Wire Transfer', date: '2026-05-20', rep: 'Sienna Park', plan: 'Professional Monthly' },
  { id: 'TXN-3833', customer: 'Atlas Data', email: 'billing@atlasdata.dev', amount: 5200, status: 'completed', method: 'PayPal', date: '2026-05-19', rep: 'Dmitri Volkov', plan: 'Starter Annual' },
];

const statusConfig: Record<string, { icon: React.ElementType; label: string; className: string }> = {
  completed: { icon: CheckCircle, label: 'Completed', className: 'badge-positive' },
  pending: { icon: Clock, label: 'Pending', className: 'badge-warning' },
  failed: { icon: XCircle, label: 'Failed', className: 'badge-negative' },
  refunded: { icon: ArrowDownRight, label: 'Refunded', className: 'badge-neutral' },
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilter, setShowFilter] = useState(false);

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.customer.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase()) || t.rep.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filtered.reduce((s, t) => s + (t.status === 'completed' ? t.amount : 0), 0);

  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Transactions</h2>
          <p className="text-xs text-muted-foreground">View and manage all customer transactions</p>
        </div>
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-secondary/50 text-xs text-foreground hover:border-primary transition-all duration-150">
          <Download size={13} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-base card-hover p-4">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-xl font-bold text-foreground font-mono-nums">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="card-base card-hover p-4">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Transactions</p>
          <p className="text-xl font-bold text-foreground font-mono-nums">{filtered.length}</p>
        </div>
        <div className="card-base card-hover p-4">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Completed</p>
          <p className="text-xl font-bold text-positive font-mono-nums">{filtered.filter(t => t.status === 'completed').length}</p>
        </div>
        <div className="card-base card-hover p-4">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Avg Deal</p>
          <p className="text-xl font-bold text-foreground font-mono-nums">${(totalAmount / filtered.length || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
      </div>

      <div className="card-base card-hover overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-secondary/50 flex-1 max-w-xs">
              <Search size={12} className="text-muted-foreground" />
              <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-xs text-foreground placeholder-muted-foreground outline-none w-full" />
            </div>
            <div className="relative">
              <button onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-secondary/50 text-xs text-foreground hover:border-primary">
                <span>Status: {statusFilter === 'all' ? 'All' : statusFilter}</span>
                <ChevronDown size={11} />
              </button>
              {showFilter && (
                <div className="absolute right-0 top-full mt-1 w-36 glass-card shadow-xl z-50 py-1">
                  {['all', 'completed', 'pending', 'failed', 'refunded'].map((s) => (
                    <button key={s} onClick={() => { setStatusFilter(s); setShowFilter(false); }} className={`w-full text-left px-3 py-1.5 text-xs capitalize ${statusFilter === s ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                      {s === 'all' ? 'All' : s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                {['Transaction', 'Customer', 'Amount', 'Status', 'Method', 'Date', 'Rep', 'Plan'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => {
                const status = statusConfig[tx.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors duration-100">
                    <td className="px-4 py-3"><span className="text-xs font-mono-nums font-semibold text-primary">{tx.id}</span></td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-foreground">{tx.customer}</p>
                      <p className="text-[10px] text-muted-foreground">{tx.email}</p>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-bold text-foreground font-mono-nums">${tx.amount.toLocaleString()}</span></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.className}`}>
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{tx.method}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{tx.date}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-foreground">{tx.rep}</span></td>
                    <td className="px-4 py-3"><span className="text-[10px] text-muted-foreground">{tx.plan}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground">Showing {filtered.length} of {transactions.length} transactions</p>
        </div>
      </div>
    </div>
  );
}
