import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import RevenueTrends from './pages/RevenueTrends';
import ConversionFunnelPage from './pages/ConversionFunnelPage';
import LeaderboardPage from './pages/LeaderboardPage';
import GoalsQuotasPage from './pages/GoalsQuotasPage';
import LiveSessionsPage from './pages/LiveSessionsPage';
import TransactionsPage from './pages/TransactionsPage';
import CSATReportsPage from './pages/CSATReportsPage';
import AutomationPage from './pages/AutomationPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/analytics/revenue" element={<AppLayout><RevenueTrends /></AppLayout>} />
      <Route path="/analytics/funnel" element={<AppLayout><ConversionFunnelPage /></AppLayout>} />
      <Route path="/performance/leaderboard" element={<AppLayout><LeaderboardPage /></AppLayout>} />
      <Route path="/performance/goals" element={<AppLayout><GoalsQuotasPage /></AppLayout>} />
      <Route path="/performance/sessions" element={<AppLayout><LiveSessionsPage /></AppLayout>} />
      <Route path="/customers/transactions" element={<AppLayout><TransactionsPage /></AppLayout>} />
      <Route path="/customers/csat" element={<AppLayout><CSATReportsPage /></AppLayout>} />
      <Route path="/customers/automation" element={<AppLayout><AutomationPage /></AppLayout>} />
      <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
    </Routes>
  );
}
