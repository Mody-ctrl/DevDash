import React, { useState, useEffect, useRef } from 'react';
import { Activity, DollarSign, UserPlus, TrendingDown, CheckCircle, AlertTriangle, Star, Zap, RefreshCw } from 'lucide-react';

interface FeedItem {
  id: string;
  type: 'deal_closed' | 'new_lead' | 'conversion_drop' | 'task_done' | 'alert' | 'review' | 'churn_risk' | 'automation';
  title: string;
  detail: string;
  time: string;
  rep?: string;
  value?: string;
  severity?: 'info' | 'warning' | 'success' | 'error';
}

const feedItems: FeedItem[] = [
  {
    id: 'feed-001', type: 'deal_closed', title: 'Deal closed',
    detail: 'Priya Nair closed Meridian Software — 24-mo contract',
    time: '4m ago', rep: 'PN', value: '$14,400', severity: 'success',
  },
  {
    id: 'feed-002', type: 'alert', title: 'Conversion rate alert',
    detail: 'Weekly conv. rate dropped below 2.8% threshold',
    time: '18m ago', severity: 'warning',
  },
  {
    id: 'feed-003', type: 'new_lead', title: 'High-value lead',
    detail: 'Apex Logistics (est. $28k ARR) entered trial',
    time: '32m ago', rep: 'DV', severity: 'info',
  },
  {
    id: 'feed-004', type: 'task_done', title: 'Sprint milestone',
    detail: 'Q2 onboarding flow redesign shipped to production',
    time: '1h ago', severity: 'success',
  },
  {
    id: 'feed-005', type: 'churn_risk', title: 'Churn risk flagged',
    detail: 'Northstar Inc. — 3 missed logins, low CSAT (2.8)',
    time: '1h 22m ago', severity: 'error',
  },
  {
    id: 'feed-006', type: 'review', title: 'CSAT response',
    detail: 'Yuki Tanaka received 5★ from Orbis Analytics',
    time: '2h ago', rep: 'YT', value: '5★', severity: 'success',
  },
  {
    id: 'feed-007', type: 'deal_closed', title: 'Deal closed',
    detail: 'Aaliya Hassan closed Vantage Cloud — annual plan',
    time: '2h 41m ago', rep: 'AH', value: '$8,900', severity: 'success',
  },
  {
    id: 'feed-008', type: 'automation', title: 'Automation triggered',
    detail: 'Re-engagement sequence sent to 142 dormant leads',
    time: '3h ago', severity: 'info',
  },
];

const iconMap = {
  deal_closed: DollarSign,
  new_lead: UserPlus,
  conversion_drop: TrendingDown,
  task_done: CheckCircle,
  alert: AlertTriangle,
  review: Star,
  churn_risk: AlertTriangle,
  automation: Zap,
};

const severityConfig = {
  success: { bg: 'bg-positive/10', text: 'text-positive', border: 'border-positive/20' },
  warning: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
  error: { bg: 'bg-negative/10', text: 'text-negative', border: 'border-negative/20' },
  info: { bg: 'bg-neutral/10', text: 'text-neutral', border: 'border-neutral/20' },
};

export default function ActivityFeed() {
  const [items] = useState(feedItems);
  const [isLive, setIsLive] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    const animate = async () => {
      const { gsap } = await import('gsap');
      gsap.fromTo(
        el,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.5, ease: 'power2.out' }
      );
    };

    animate();
  }, []);

  return (
    <div ref={feedRef} className="card-base card-hover flex flex-col h-full opacity-0">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Activity Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-md transition-all duration-150 ${
              isLive ? 'badge-positive' : 'text-muted-foreground bg-secondary'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-positive pulse-dot' : 'bg-muted-foreground'}`} />
            {isLive ? 'Live' : 'Paused'}
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-100">
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border/50">
        {items.map((item, i) => {
          const Icon = iconMap[item.type];
          const sev = severityConfig[item.severity || 'info'];

          return (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-secondary/30 transition-colors duration-100 cursor-pointer group activity-item-enter"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${sev.bg} border ${sev.border}`}>
                  <Icon size={13} className={sev.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    {item.value && (
                      <span className={`text-[10px] font-bold font-mono-nums flex-shrink-0 ${sev.text}`}>
                        {item.value}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{item.detail}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.rep && (
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[8px] font-bold text-background">
                        {item.rep}
                      </div>
                    )}
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2.5 border-t border-border flex-shrink-0">
        <button className="w-full text-center text-[11px] text-primary hover:text-primary/80 font-medium transition-colors duration-100">
          View all activity →
        </button>
      </div>
    </div>
  );
}
