import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  CalendarCheck,
  AlertTriangle,
  BarChart3,
  Users,
  Building2,
  MapPin,
  Shield,
  Brain,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  FileText,
  Activity,
  TrendingUp,
  Target,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  public: [
    { label: 'Data Insights', icon: BarChart3, path: '/dashboard/public/insights' },
    { label: 'Book Appointment', icon: CalendarCheck, path: '/dashboard/public/appointments' },
    { label: 'My Appointments', icon: FileText, path: '/dashboard/public/my-appointments' },
    { label: 'Complaints & Grievance', icon: AlertTriangle, path: '/dashboard/public/grievance' },
    { label: 'Business AI (UdyamDisha)', icon: Brain, path: '/dashboard/public/business-ai' },
    { label: 'Help & Awareness', icon: HelpCircle, path: '/dashboard/public/help' },
  ],
  block: [
    { label: 'Block Snapshot', icon: LayoutDashboard, path: '/dashboard/block' },
    { label: 'Center & Camp Operations', icon: Building2, path: '/dashboard/block/operations' },
    { label: 'Appointment & Queue', icon: CalendarCheck, path: '/dashboard/block/appointments' },
    { label: 'Update & Biometric Issues', icon: AlertTriangle, path: '/dashboard/block/issues' },
    { label: 'Grievance Summary', icon: FileText, path: '/dashboard/block/grievance' },
    { label: 'Field Action AI', icon: Brain, path: '/dashboard/block/ai' },
  ],
  district: [
    { label: 'District Snapshot', icon: LayoutDashboard, path: '/dashboard/district' },
    { label: 'Block Performance', icon: Activity, path: '/dashboard/district/performance' },
    { label: 'Service Delivery Ops', icon: Target, path: '/dashboard/district/delivery' },
    { label: 'Demand & Appointment Load', icon: TrendingUp, path: '/dashboard/district/demand' },
    { label: 'Grievance Trends', icon: AlertTriangle, path: '/dashboard/district/grievance' },
    { label: 'District AI Planner', icon: Brain, path: '/dashboard/district/ai' },
  ],
  state: [
    { label: 'State Overview', icon: LayoutDashboard, path: '/dashboard/state' },
    { label: 'District Performance Heatmap', icon: MapPin, path: '/dashboard/state/heatmap' },
    { label: 'Demographic Intelligence', icon: Users, path: '/dashboard/state/demographics' },
    { label: 'Infrastructure Analysis', icon: Building2, path: '/dashboard/state/infrastructure' },
    { label: 'Risk & Compliance', icon: Shield, path: '/dashboard/state/compliance' },
    { label: 'StateOps AI', icon: Brain, path: '/dashboard/state/ai' },
  ],
  national: [
    { label: 'Executive Overview', icon: LayoutDashboard, path: '/dashboard/national' },
    { label: 'Demographic Intelligence', icon: Users, path: '/dashboard/national/demographics' },
    { label: 'Regional Disparity', icon: Globe, path: '/dashboard/national/disparity' },
    { label: 'Service Performance', icon: Activity, path: '/dashboard/national/performance' },
    { label: 'Policy Impact Simulator', icon: Zap, path: '/dashboard/national/simulator' },
    { label: 'Alerts & Reports', icon: Bell, path: '/dashboard/national/alerts' },
  ],
};

const roleTitles: Record<UserRole, string> = {
  public: 'Public Dashboard',
  block: 'Block Officer Dashboard',
  district: 'District Officer Dashboard',
  state: 'State Officer Dashboard',
  national: 'National Leader Dashboard',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect to login if no user
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const navItems = roleNavItems[user.role];
  const title = roleTitles[user.role];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col",
          sidebarOpen ? "w-[280px]" : "w-16"
        )}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-sm">{APP_NAME}</h1>
                <p className="text-xs text-sidebar-foreground/70">Data Platform</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-sm font-medium truncate">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sm font-medium">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{user.location}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-[280px]" : "ml-16"
      )}>
        {/* Header */}
        <header className="gov-header sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <div className="privacy-banner hidden sm:flex">
              <Shield className="w-4 h-4" />
              <span>Aggregated Data Only • No Personal Information Collected</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted cursor-pointer"
              onClick={handleProfileClick}
            >
              <span className="text-sm font-medium">{user.name}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
