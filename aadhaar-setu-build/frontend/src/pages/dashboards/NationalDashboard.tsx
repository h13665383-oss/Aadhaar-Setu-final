import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Activity, AlertTriangle, TrendingUp, Globe, Loader2, Download } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useData } from '@/contexts/DataContext';

export const NationalDashboard: React.FC = () => {
  const { data, loading, exportData } = useData();

  if (loading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <span className="ml-3 text-lg font-medium text-muted-foreground">Loading National Data...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate totals from real data (Top 5 states for table)
  const topStates = data.states.slice(0, 5).map(s => ({
    state: s.name,
    coverage: Math.min(99, Math.round((s.enrollments / 20000) * 100)), // Mock coverage calculation
    infrastructure: Math.floor(Math.random() * (95 - 75) + 75), // Random mock infrastructure score
    performance: Math.floor(Math.random() * (98 - 80) + 80), // Random mock performance score
    quality: Math.floor(Math.random() * (95 - 82) + 82), // Random mock quality score
  }));

  const totalEnrollments = data.states.reduce((acc, curr) => acc + curr.enrollments, 0);

  // Generate realistic monthly enrollment trend data (12 months)
  const generateEnrollmentTrend = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseEnrollment = totalEnrollments / 12;
    const growthRate = 0.08; // 8% average monthly growth

    return months.map((month, index) => {
      // Simulate realistic trend with growth + seasonal variation
      const seasonalFactor = 1 + (Math.sin(index * Math.PI / 6) * 0.15); // ±15% seasonal variation
      const growthFactor = Math.pow(1 + growthRate, index / 12);
      const enrollments = Math.round(baseEnrollment * growthFactor * seasonalFactor);

      return {
        month,
        enrollments,
        target: Math.round(baseEnrollment * 1.1), // 10% above baseline as target
      };
    });
  };

  const enrollmentTrendData = generateEnrollmentTrend();

  // Prepare radar data for top 5 states comparison
  const radarComparisonData = topStates.map(state => ({
    state: state.state,
    Coverage: state.coverage,
    Infrastructure: state.infrastructure,
    Performance: state.performance,
    Quality: state.quality,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Executive Overview</h1>
            <p className="text-muted-foreground mt-1">National-level strategic insights and policy planning</p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 text-sm shadow-md">
            🇮🇳 All India Data Live
          </Badge>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary cursor-pointer hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Enrollments</p>
                  <p className="text-3xl font-bold mt-1">{totalEnrollments.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+12.5% this month</span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-600 cursor-pointer hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">States/UTs Active</p>
                  <p className="text-3xl font-bold mt-1">{data.states.length}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-muted-foreground">All operational</span>
                  </div>
                </div>
                <Globe className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600 cursor-pointer hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Daily Transactions</p>
                  <p className="text-3xl font-bold mt-1">4.5L</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">+8.5% vs last week</span>
                  </div>
                </div>
                <Activity className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-600 cursor-pointer hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Critical Alerts</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-orange-600 font-medium">Immediate attention</span>
                  </div>
                </div>
                <AlertTriangle className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* National Trend */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">National Enrollment Trend (12-Month Overview)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={enrollmentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), '']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Total Enrollments"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Target"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-muted-foreground mt-3 font-medium">
                Showing aggregated enrollment momentum across all states • Growth trend: +8% avg/month
              </p>
            </CardContent>
          </Card>

          {/* State Performance Comparison */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">Top 5 States - Multi-Metric Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarComparisonData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="state"
                    tick={{ fill: '#666', fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#888', fontSize: 10 }}
                  />
                  <Radar
                    name="Coverage"
                    dataKey="Coverage"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Infrastructure"
                    dataKey="Infrastructure"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Performance"
                    dataKey="Performance"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Quality"
                    dataKey="Quality"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-muted-foreground mt-3 font-medium">
                Composite Index Analysis • Coverage, Infrastructure, Performance, Quality Score (0-100)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* State Comparison Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>State-wise Performance Comparison (Top 5)</CardTitle>
              <Button size="sm" variant="outline" onClick={() => exportData('csv')} className="gap-2">
                <Download className="w-4 h-4" />
                Download Full Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">State</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coverage</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Infrastructure</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Performance</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quality</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {topStates.map((state, index) => {
                    const overall = Math.round((state.coverage + state.infrastructure + state.performance + state.quality) / 4);
                    return (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-foreground">{state.state}</td>
                        <td className="py-3 px-4">
                          <Badge variant={state.coverage >= 90 ? 'default' : 'secondary'} className="font-normal">
                            {state.coverage}%
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={state.infrastructure >= 85 ? 'default' : 'secondary'} className="font-normal">
                            {state.infrastructure}%
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={state.performance >= 85 ? 'default' : 'secondary'} className="font-normal">
                            {state.performance}%
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={state.quality >= 85 ? 'default' : 'secondary'} className="font-normal">
                            {state.quality}%
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm text-foreground w-8">{overall}%</span>
                            <div className="w-24 bg-secondary rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${overall >= 90 ? 'bg-green-600' :
                                  overall >= 85 ? 'bg-blue-600' :
                                    'bg-orange-600'
                                  }`}
                                style={{ width: `${overall}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Executive Insights */}
        <Card className="border-purple-600/20 bg-gradient-to-r from-purple-600/5 to-blue-600/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Executive AI Insights & Policy Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/60 hover:border-purple-200 transition-colors">
                <Badge className="bg-green-600 mt-0.5 shadow-sm">Achievement</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">India achieves 99.8% Aadhaar coverage - World's largest biometric ID system</p>
                  <p className="text-xs text-muted-foreground mt-1">142.8 Crore enrollments completed, on track for universal coverage by Q3 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/60 hover:border-blue-200 transition-colors">
                <Badge className="bg-blue-600 mt-0.5 shadow-sm">Policy Impact</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">Mobile enrollment drives show 3x higher efficiency in rural areas</p>
                  <p className="text-xs text-muted-foreground mt-1">Recommendation: Allocate ₹50 Cr for 500 additional mobile units in 8 states</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/60 hover:border-orange-200 transition-colors">
                <Badge className="bg-orange-600 mt-0.5 shadow-sm">Alert</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">3 states reporting infrastructure challenges - immediate intervention required</p>
                  <p className="text-xs text-muted-foreground mt-1">Uttar Pradesh, Bihar, and Jharkhand need equipment upgrades and connectivity improvements</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NationalDashboard;
