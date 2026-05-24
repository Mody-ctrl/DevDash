import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLogo from '@/components/ui/AppLogo';
import {
  BarChart2,
  TrendingUp,
  Users,
  ShoppingCart,
  Target,
  Star,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  Activity,
  PieChart,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navSections = [
  {
    label: 'Analytics',
    items: [
      { href: '/', icon: BarChart2, label: 'Sales Overview', badge: null },
      { href: '/analytics/revenue', icon: TrendingUp, label: 'Revenue Trends', badge: null },
      { href: '/analytics/funnel', icon: PieChart, label: 'Conversion Funnel', badge: '3' },
    ],
  },
  {
    label: 'Performance',
    items: [
      { href: '/performance/leaderboard', icon: Users, label: 'Team Leaderboard', badge: null },
      { href: '/performance/goals', icon: Target, label: 'Goals & Quotas', badge: '2' },
      { href: '/performance/sessions', icon: Activity, label: 'Live Sessions', badge: null },
    ],
  },
  {
    label: 'Customers',
    items: [
      { href: '/customers/transactions', icon: ShoppingCart, label: 'Transactions', badge: null },
      { href: '/customers/csat', icon: Star, label: 'CSAT Reports', badge: null },
      { href: '/customers/automation', icon: Zap, label: 'Automation', badge: 'NEW' },
    ],
  },
];

const bottomItems = [
  { icon: Bell, label: 'Notifications', badge: '5' },
  { icon: HelpCircle, label: 'Help & Docs', badge: null },
  { icon: Settings, label: 'Settings', badge: null },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap');

      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );

      const validItems = navItemsRef.current.filter(Boolean);
      gsap.fromTo(
        validItems,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    };

    animate();
  }, []);

  let itemIndex = 0;

  return (
    <aside
      ref={sidebarRef}
      className={`relative flex flex-col h-screen bg-card border-r border-border sidebar-transition overflow-hidden flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-48 blob-primary opacity-50 pointer-events-none" />

      <div ref={logoRef} className="flex items-center h-16 px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <AppLogo size={32} />
          {!collapsed && (
            <span className="font-semibold text-base tracking-tight text-foreground truncate gradient-primary-text">
              DevDash
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-6">
        {navSections.map((section) => (
          <div key={`section-${section.label}`}>
            {!collapsed && (
              <p className="px-4 mb-2 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5 px-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                const currentIndex = itemIndex++;

                return (
                  <li key={`nav-${section.label}-${item.label}`}>
                    <button
                      ref={(el) => { navItemsRef.current[currentIndex] = el; }}
                      onClick={() => navigate(item.href)}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium nav-item-hover relative group text-left ${
                        pathname === item.href
                          ? 'nav-item-active' : 'text-muted-foreground'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                                item.badge === 'NEW' ? 'badge-accent bg-accent text-accent-foreground' : 'badge-neutral'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-2 py-1 bg-secondary border border-border rounded-md text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                          {item.label}
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-2 py-3 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={`bottom-${item.label}`}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-muted-foreground nav-item-hover relative group"
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <span className="badge-negative text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-negative" />
              )}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-secondary border border-border rounded-md text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}

        <div className="mt-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg nav-item-hover cursor-pointer group relative">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-white">
              AA
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate">Ahmed Abobakr</p>
                <p className="text-[10px] text-muted-foreground truncate">Sales Director</p>
              </div>
            )}
            {collapsed && (
              <div className="absolute left-full ml-3 px-2 py-1 bg-secondary border border-border rounded-md text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                Ahmed Abobakr — Sales Director
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-150 z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
