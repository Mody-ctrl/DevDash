import React, { useEffect, useRef, useState } from 'react';
import { DollarSign, TrendingDown, Users, CheckCircle, Star, ArrowUpRight, ArrowDownRight, Minus, Activity } from 'lucide-react';

interface MetricCardData {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  prefix: string;
  suffix: string;
  delta: number;
  deltaLabel: string;
  trend: 'up' | 'down' | 'neutral';
  status: 'positive' | 'negative' | 'warning' | 'neutral';
  icon: React.ElementType;
  subValue?: string;
  subLabel?: string;
  sparkData?: number[];
  isHero?: boolean;
  description?: string;
}

const metrics: MetricCardData[] = [
  {
    id: 'metric-revenue',
    label: 'Revenue MTD',
    value: '284,920',
    numericValue: 284920,
    prefix: '$',
    suffix: '',
    delta: 12.4,
    deltaLabel: 'vs last month',
    trend: 'up',
    status: 'positive',
    icon: DollarSign,
    subValue: '$9,497',
    subLabel: 'avg / day',
    sparkData: [18, 22, 19, 28, 24, 31, 27, 35, 29, 38, 33, 42, 37, 45, 41, 28, 22, 19, 31, 38, 44, 49, 46, 52, 55, 51, 58, 62, 59, 67],
    isHero: true,
    description: 'Month-to-date gross revenue across all channels',
  },
  {
    id: 'metric-conversion',
    label: 'Conversion Rate',
    value: '2.61',
    numericValue: 2.61,
    prefix: '',
    suffix: '%',
    delta: -0.38,
    deltaLabel: 'vs last week',
    trend: 'down',
    status: 'warning',
    icon: TrendingDown,
    subValue: '1,847',
    subLabel: 'leads this month',
    sparkData: [3.8, 3.6, 3.4, 3.2, 3.5, 3.3, 3.1, 2.9, 3.0, 2.8, 2.7, 2.6],
    description: 'Lead-to-paid conversion — below 2.8% target',
  },
  {
    id: 'metric-active-users',
    label: 'Active Users',
    value: '12,847',
    numericValue: 12847,
    prefix: '',
    suffix: '',
    delta: 8.2,
    deltaLabel: 'vs yesterday',
    trend: 'up',
    status: 'positive',
    icon: Users,
    subValue: '3,241',
    subLabel: 'live sessions',
    sparkData: [9200, 10100, 9800, 11200, 10900, 12100, 11800, 12400, 12847],
    description: '30-day active unique users',
  },
  {
    id: 'metric-tasks',
    label: 'Task Completion',
    value: '73.4',
    numericValue: 73.4,
    prefix: '',
    suffix: '%',
    delta: 5.1,
    deltaLabel: 'vs last sprint',
    trend: 'up',
    status: 'neutral',
    icon: CheckCircle,
    subValue: '128 / 174',
    subLabel: 'tasks done',
    sparkData: [60, 65, 62, 68, 70, 67, 72, 73],
    description: 'Sprint task completion rate',
  },
  {
    id: 'metric-csat',
    label: 'CSAT Score',
    value: '4.38',
    numericValue: 4.38,
    prefix: '',
    suffix: '/5',
    delta: 0.12,
    deltaLabel: 'vs last quarter',
    trend: 'up',
    status: 'positive',
    icon: Star,
    subValue: '2,104',
    subLabel: 'responses',
    sparkData: [4.1, 4.0, 4.2, 4.1, 4.3, 4.2, 4.35, 4.38],
    description: 'Customer satisfaction average',
  },
];

function MiniSparkline({ data, status }: { data: number[]; status: MetricCardData['status'] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 28;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;

  const colorMap = {
    positive: '#10B981',
    negative: '#EF4444',
    warning: '#F59E0B',
    neutral: '#8B5CF6',
  };
  const color = colorMap[status];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-grad-${status}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#spark-grad-${status})`} />
      <path d={pathD} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={(data.length - 1) / (data.length - 1) * width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

function AnimatedCounter({ target, prefix, suffix, duration = 1200 }: {
  target: number;
  prefix: string;
  suffix: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * target);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  const formatted = target >= 1000
    ? display.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : display.toFixed(target % 1 !== 0 ? 2 : 0);

  return (
    <span className="counter-value font-mono-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}

function MetricCard({ metric, index }: { metric: MetricCardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = metric.icon;

  const statusColors = {
    positive: 'text-positive',
    negative: 'text-negative',
    warning: 'text-warning',
    neutral: 'text-neutral',
  };

  const statusBg = {
    positive: 'bg-positive/10 text-positive',
    negative: 'bg-negative/10 text-negative',
    warning: 'bg-warning/10 text-warning',
    neutral: 'bg-neutral/10 text-neutral',
  };

  const TrendIcon = metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Minus;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const animate = async () => {
      const { gsap } = await import('gsap');
      gsap.fromTo(
        el,
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.08,
          ease: 'power2.out',
        }
      );
    };

    animate();
  }, [index]);

  if (metric.isHero) {
    return (
      <div
        ref={cardRef}
        className="card-base card-hover p-5 relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2 opacity-0"
        style={{ opacity: 0 }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 blob-primary opacity-60 pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-positive/10 flex items-center justify-center">
                <Icon size={16} className="text-positive" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                {metric.label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
          </div>
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${statusBg[metric.status]}`}>
            <TrendIcon size={12} />
            {metric.trend !== 'neutral' && (metric.delta > 0 ? '+' : '')}{metric.delta}% {metric.deltaLabel}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className={`text-hero-metric ${statusColors[metric.status]}`}>
              <AnimatedCounter
                target={metric.numericValue}
                prefix={metric.prefix}
                suffix={metric.suffix}
                duration={1400}
              />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  <span className="text-foreground font-medium font-mono-nums">{metric.subValue}</span>{' '}
                  {metric.subLabel}
                </span>
              </div>
            </div>
          </div>
          <div className="opacity-80">
            {metric.sparkData && <MiniSparkline data={metric.sparkData} status={metric.status} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`card-base card-hover p-4 relative overflow-hidden opacity-0 ${
        metric.status === 'warning' ? 'border-warning/30' : ''
      }`}
      style={{ opacity: 0 }}
    >
      {metric.status === 'warning' && (
        <div className="absolute inset-0 bg-warning/3 pointer-events-none rounded-xl" />
      )}

      <div className="flex items-start justify-between mb-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${statusBg[metric.status]}`}>
          <Icon size={14} />
        </div>
        <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${statusColors[metric.status]}`}>
          <TrendIcon size={11} />
          {metric.trend !== 'neutral' && (metric.delta > 0 ? '+' : '')}{metric.delta}
          {metric.suffix || '%'}
        </span>
      </div>

      <div className={`text-metric mb-1 ${statusColors[metric.status]}`}>
        <AnimatedCounter
          target={metric.numericValue}
          prefix={metric.prefix}
          suffix={metric.suffix}
          duration={1200}
        />
      </div>

      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-2">
        {metric.label}
      </p>

      <div className="flex items-end justify-between">
        <div className="text-[10px] text-muted-foreground">
          <span className="text-foreground font-medium font-mono-nums">{metric.subValue}</span>{' '}
          {metric.subLabel}
        </div>
        <div className="opacity-70">
          {metric.sparkData && <MiniSparkline data={metric.sparkData} status={metric.status} />}
        </div>
      </div>

      {metric.status === 'warning' && (
        <div className="mt-2 pt-2 border-t border-warning/20">
          <p className="text-[10px] text-warning">⚠ Below 2.8% target — review funnel</p>
        </div>
      )}
    </div>
  );
}

export default function MetricsBentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <MetricCard key={metric.id} metric={metric} index={i} />
      ))}
    </div>
  );
}
