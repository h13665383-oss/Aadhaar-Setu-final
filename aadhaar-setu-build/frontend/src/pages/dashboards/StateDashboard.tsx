import React, { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, AlertTriangle, TrendingUp, Loader2, MapPin, User as UserIcon } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const StateDashboard: React.FC = () => {
  const { data, loading } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const stateData = useMemo(() => {
    // 1. Safety check for data existence
    if (!data || !data.states || !Array.isArray(data.states) || data.states.length === 0) {
      return null;
    }

    // 2. Find target state safely
    let targetStateName = user?.state;

    // Normalize string for comparison if needed
    const normalize = (s: string) => s?.toLowerCase().trim();

    let selectedState = data.states.find(s => normalize(s.name) === normalize(targetStateName || ''));

    // 3. Fallback logic
    if (!selectedState) {
      console.warn(`StateDashboard: User state '${targetStateName}' not found in data. Falling back to first available state.`);
      selectedState = data.states[0];
    }

    if (!selectedState) return null; // Should be impossible if length > 0 check passed

    const districts = data.districts?.filter(d => d.state === selectedState.name) || [];

    return {
      name: selectedState.name,
      stats: selectedState,
      districts: districts.slice(0, 12),
      totalDistrictsCount: selectedState.districts || districts.length
    };
  }, [data, user]);

  // Loading State
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary/40" />
            </div>
          </div>
          <p className="text-lg font-medium text-muted-foreground animate-pulse">Loading State Intelligence...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Error/Empty State (Prevents Blank Screen)
  if (!stateData) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Data Unavailable</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            We couldn't load the state dashboard data. This might be due to a connection issue or missing records for your assigned state.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const { name, stats, districts, totalDistrictsCount } = stateData;

  // Transform district data for charts safely
  const chartData = districts.slice(0, 5).map(d => ({
    district: d.name,
    enrollments: d.enrollments || 0,
    coverage: Math.min(99, Math.floor(((d.enrollments || 0) / 5000) * 100))
  }));

  // Mock trend data with safe stats access
  const baseEnrollment = stats.enrollments || 10000;
  const monthlyTrendData = [
    { month: 'Jan', coverage: 85.2, enrollments: Math.floor(baseEnrollment * 0.1) },
    { month: 'Feb', coverage: 86.5, enrollments: Math.floor(baseEnrollment * 0.12) },
    { month: 'Mar', coverage: 87.8, enrollments: Math.floor(baseEnrollment * 0.15) },
    { month: 'Apr', coverage: 89.1, enrollments: Math.floor(baseEnrollment * 0.18) },
    { month: 'May', coverage: 90.3, enrollments: Math.floor(baseEnrollment * 0.22) },
    { month: 'Jun', coverage: 91.5, enrollments: Math.floor(baseEnrollment * 0.25) },
    { month: 'Jul', coverage: 92.3, enrollments: Math.floor(baseEnrollment * 0.28) },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground">State Overview</h1>
              {user?.state === name && <Badge variant="secondary" className="text-[10px] h-5">Your Jurisdiction</Badge>}
            </div>
            <p className="text-muted-foreground mt-1">Comprehensive state-level analytics for {name}</p>
          </div>
          <Badge className="bg-purple-600 text-white shadow-sm px-3 py-1 self-start md:self-center">
            {name} State Dashboard
          </Badge>
        </div>

        {/* User context banner */}
        {user && (
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">Logged in as {user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.designation || 'Official'} • {user.state || name}
                </p>
              </div>
            </div>
            {user.state === name && (
              <div className="hidden md:block">
                <p className="text-[10px] text-muted-foreground text-right uppercase font-bold tracking-wider">Default View Active</p>
              </div>
            )}
            {user.state !== name && (
              <div className="hidden md:block">
                <p className="text-[10px] text-amber-600 text-right uppercase font-bold tracking-wider">Viewing Different State</p>
              </div>
            )}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Enrollments</p>
                  <p className="text-3xl font-bold mt-1">{(stats.enrollments || 0).toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+2.1% this quarter</span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Districts</p>
                  <p className="text-3xl font-bold mt-1">{totalDistrictsCount || 0}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-muted-foreground">Reporting data</span>
                  </div>
                </div>
                <MapPin className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">0-5 Age Group</p>
                  <p className="text-3xl font-bold mt-1">{(stats.age_0_5 || 0).toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">Key focus area</span>
                  </div>
                </div>
                <Building2 className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Risk Districts</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-orange-600 font-medium">Needs attention</span>
                  </div>
                </div>
                <AlertTriangle className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coverage Trend */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">State Enrollment Trend (7 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    name="Enrollments"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* District Performance */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">Top 5 Districts by Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="district" type="category" stroke="#888888" width={100} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="enrollments" fill="#3b82f6" name="Enrollments" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* District Performance Heatmap Preview */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Top Performing Districts (Heatmap View)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {districts.length > 0 ? districts.map((d, index) => {
                const isHigh = (d.enrollments || 0) > 500;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${isHigh ? 'border-green-200 bg-green-50/50 hover:bg-green-50' :
                      'border-blue-200 bg-blue-50/50 hover:bg-blue-50'
                      }`}
                  >
                    <p className="text-xs font-medium text-muted-foreground truncate" title={d.name}>{d.name}</p>
                    <p className="text-xl font-bold mt-1 text-foreground">{(d.enrollments || 0).toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Enrollments</p>
                  </div>
                );
              }) : (
                <div className="col-span-full border border-dashed p-4 rounded-md text-center text-sm text-muted-foreground">
                  No district data available for this state.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-purple-600/20 bg-purple-600/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              State-Level Strategic Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/60 hover:border-purple-200 transition-colors">
                <Badge className="bg-purple-600 mt-0.5 shadow-sm">Strategic</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">State on track to achieve 95% coverage by Q2 2026</p>
                  <p className="text-xs text-muted-foreground mt-1">Current growth rate of 0.7% per month sustained</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/60 hover:border-orange-200 transition-colors">
                <Badge className="bg-orange-600 mt-0.5 shadow-sm">Action Required</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">3 districts below 80% coverage - deploy mobile enrollment drives</p>
                  <p className="text-xs text-muted-foreground mt-1">Estimated budget: ₹2.5 Cr, Expected impact: +4% coverage</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StateDashboard;
