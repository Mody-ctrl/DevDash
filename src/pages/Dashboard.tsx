import React from 'react';
import MetricsBentoGrid from '@/components/dashboard/MetricsBentoGrid';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ChannelBarChart from '@/components/dashboard/ChannelBarCharts';
import ConversionFunnel from '@/components/dashboard/ConcersionFunnel';
import RepLeaderboard from '@/components/dashboard/RepLeaderBoard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import GoalRadialChart from '@/components/dashboard/GoalRedialChart';

export default function Dashboard() {
  return (
    <div className="px-6 py-5 max-w-screen-2xl mx-auto space-y-5">
      <MetricsBentoGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
        <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1">
          <GoalRadialChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-5">
        <ChannelBarChart />
        <ConversionFunnel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 pb-6">
        <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <RepLeaderboard />
        </div>
        <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
