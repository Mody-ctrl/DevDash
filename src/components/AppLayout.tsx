import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const titleMap: Record<string, string> = {
  '/': 'Sales Analytics',
  '/analytics/revenue': 'Revenue Trends',
  '/analytics/funnel': 'Conversion Funnel',
  '/performance/leaderboard': 'Team Leaderboard',
  '/performance/goals': 'Goals & Quotas',
  '/performance/sessions': 'Live Sessions',
  '/customers/transactions': 'Transactions',
  '/customers/csat': 'CSAT Reports',
  '/customers/automation': 'Automation',
};

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const title = titleMap[location.pathname] || 'Sales Analytics';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onRefresh={handleRefresh} isRefreshing={isRefreshing} title={title} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
