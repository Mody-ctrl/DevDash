import React from 'react';
import { Target } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

const goalData = [
  { name: 'CSAT Goal', value: 87.6, fill: 'var(--primary)', target: '4.5 / 5', current: '4.38' },
  { name: 'Task Completion', value: 73.4, fill: 'var(--accent)', target: '100%', current: '73.4%' },
  { name: 'Conversion Target', value: 65.25, fill: 'var(--warning)', target: '4.0%', current: '2.61%' },
  { name: 'Revenue Quota', value: 82.1, fill: '#14B8A6', target: '$347k', current: '$285k' },
];

const CustomTooltipContent = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ payload: typeof goalData[0] }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="card-base p-3 shadow-xl">
      <p className="text-xs font-semibold text-foreground mb-1">{d.name}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] text-muted-foreground">Progress</span>
        <span className="text-[11px] font-bold font-mono-nums" style={{ color: d.fill }}>
          {d.value.toFixed(1)}%
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] text-muted-foreground">Current</span>
        <span className="text-[11px] font-semibold text-foreground font-mono-nums">{d.current}</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] text-muted-foreground">Target</span>
        <span className="text-[11px] font-semibold text-foreground font-mono-nums">{d.target}</span>
      </div>
    </div>
  );
};

export default function GoalRadialChart() {
  return (
    <div className="card-base card-hover p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <Target size={16} className="text-accent" />
        <h3 className="text-sm font-semibold text-foreground">Goal Attainment</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Current period vs targets</p>

      <div className="flex-1 flex flex-col">
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="25%"
            outerRadius="90%"
            data={goalData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={4}
              background={{ fill: 'var(--secondary)' }}
            />
            <Tooltip content={<CustomTooltipContent />} />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="space-y-2 mt-2">
          {goalData.map((goal) => (
            <div key={`goal-${goal.name}`} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: goal.fill }} />
                <span className="text-[11px] text-muted-foreground truncate max-w-[120px]">{goal.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${goal.value}%`, background: goal.fill }}
                  />
                </div>
                <span className="text-[11px] font-semibold font-mono-nums text-foreground w-10 text-right">
                  {goal.value.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
