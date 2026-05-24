import React, { useState } from 'react';
import { Search, Bell, RefreshCw, Calendar, ChevronDown, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const dateRanges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'This month', value: 'mtd' },
  { label: 'This quarter', value: 'qtd' },
  { label: 'Year to date', value: 'ytd' },
];

interface TopbarProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  title?: string;
}

export default function Topbar({ onRefresh, isRefreshing, title = 'Sales Analytics' }: TopbarProps) {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [rangeOpen, setRangeOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { theme, toggle } = useTheme();

  const currentRange = dateRanges.find((r) => r.value === selectedRange);

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border glass-card rounded-none flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-base font-semibold text-foreground leading-tight">{title}</h1>
          <p className="text-[11px] text-muted-foreground">
            Last updated: <span className="text-foreground font-medium">May 23, 2026 — 9:53 PM</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-positive pulse-dot" />
          <span className="text-[11px] text-positive font-medium">Live</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 h-8 px-3 rounded-lg border transition-all duration-150 ${
            searchFocused
              ? 'border-primary bg-secondary w-52' : 'border-border bg-secondary/50 w-36'
          }`}
        >
          <Search size={13} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs text-foreground placeholder-muted-foreground outline-none w-full"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden sm:flex items-center gap-0.5 text-[9px] text-muted-foreground border border-border rounded px-1 py-0.5 flex-shrink-0">
            ⌘K
          </kbd>
        </div>

        <div className="relative">
          <button
            onClick={() => setRangeOpen(!rangeOpen)}
            className="flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-secondary/50 text-xs text-foreground hover:border-primary hover:bg-secondary transition-all duration-150"
          >
            <Calendar size={13} className="text-muted-foreground" />
            <span>{currentRange?.label}</span>
            <ChevronDown size={12} className="text-muted-foreground" />
          </button>

          {rangeOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 glass-card shadow-xl z-50 py-1">
              {dateRanges.map((range) => (
                <button
                  key={`range-${range.value}`}
                  onClick={() => { setSelectedRange(range.value); setRangeOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors duration-100 ${
                    selectedRange === range.value
                      ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-150"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          onClick={onRefresh}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-150"
          aria-label="Refresh data"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
        </button>

        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-150">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-negative" />
        </button>
      </div>
    </header>
  );
}
