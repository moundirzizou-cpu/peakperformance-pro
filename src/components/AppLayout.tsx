import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardCheck, Users, GraduationCap, FileText,
  ChevronLeft, ChevronRight, Settings, LogOut, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/evaluation', label: 'Evaluation', icon: ClipboardCheck },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/training', label: 'Training', icon: GraduationCap },
  { path: '/reports', label: 'Reports', icon: FileText },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 md:relative",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <h1 className="text-lg font-bold font-heading text-sidebar-primary tracking-tight">HR Pulse</h1>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:flex items-center justify-center w-8 h-8 rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-muted">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-sidebar-muted">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon size={20} className={active ? "text-sidebar-primary" : ""} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          <Link to="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <LogOut size={20} />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center h-16 px-4 md:px-6 border-b border-border bg-card shrink-0">
          <button onClick={() => setMobileOpen(true)} className="md:hidden mr-3 text-muted-foreground">
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              AD
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
