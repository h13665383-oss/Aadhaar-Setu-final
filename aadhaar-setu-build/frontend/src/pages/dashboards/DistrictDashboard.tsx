import React, { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Users, User as UserIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

export const DistrictDashboard: React.FC = () => {
  const { user } = useAuth();
  const { data } = useData();

  // Find district data from real context if available
  const districtInfo = useMemo(() => {
    if (!data) return { name: user?.district || 'Pune' };
    const matched = data.districts.find(d => d.name === user?.district);
    return matched || { name: user?.district || 'Pune', enrollments: 185000 };
  }, [data, user]);

  const blockPerformance = [
    { name: 'Block A', enrollments: 52340, target: 50000, utilization: 92, grievances: 12, achievement: 105 },
    { name: 'Block B', enrollments: 48520, target: 50000, utilization: 87, grievances: 23, achievement: 97 },
    { name: 'Block C', enrollments: 45200, target: 50000, utilization: 78, grievances: 18, achievement: 90 },
    { name: 'Block D', enrollments: 38900, target: 50000, utilization: 65, grievances: 34, achievement: 78 },
  ];

  const trendData = [
    { month: 'Jul', enrollments: 185000, target: 180000 },
    { month: 'Aug', enrollments: 192000, target: 185000 },
    { month: 'Sep', enrollments: 188000, target: 190000 },
    { month: 'Oct', enrollments: 205000, target: 195000 },
    { month: 'Nov', enrollments: 218000, target: 200000 },
    { month: 'Dec', enrollments: 225000, target: 205000 },
  ];

  const totalEnrollments = blockPerformance.reduce((sum, block) => sum + block.enrollments, 0);
  const avgUtilization = Math.round(blockPerformance.reduce((sum, block) => sum + block.utilization, 0) / blockPerformance.length);
  const totalGrievances = blockPerformance.reduce((sum, block) => sum + block.grievances, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground">District Snapshot</h1>
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 h-5 text-[10px]">
                {districtInfo.name}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Operational analytics for District Administration</p>
          </div>
          <Badge className="bg-blue-600 text-white px-3 py-1 shadow-sm">
            Live Feed: {districtInfo.name}
          </Badge>
        </div>

        {/* User context banner */}
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/10 p-2 rounded-full">
              <UserIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Acting Collector: {user?.name || 'District Officer'}</p>
              <p className="text-xs text-muted-foreground">{user?.designation || 'District Administration'} • {districtInfo.name}, {user?.state || 'Maharashtra'}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] text-blue-600/60 text-right uppercase font-bold tracking-wider">Localized View</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">District Total</p>
                  <p className="text-3xl font-bold mt-1">{(districtInfo.enrollments || totalEnrollments).toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+12.5% this month</span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Active Blocks</p>
                  <p className="text-3xl font-bold mt-1">7</p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">All operational</span>
                  </div>
                </div>
                <Activity className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Avg Utilization</p>
                  <p className="text-3xl font-bold mt-1">{avgUtilization}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">+5% vs last week</span>
                  </div>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Open Grievances</p>
                  <p className="text-3xl font-bold mt-1">{totalGrievances}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">-18% vs last month</span>
                  </div>
                </div>
                <AlertTriangle className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Block Performance Comparison */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-base">Block Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={blockPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="achievement" fill="#3b82f6" name="Achievement %" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="utilization" fill="#10b981" name="Utilization %" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* District Trend */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-base">6-Month Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Actual"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Block Performance Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Detailed Block Analysis</CardTitle>
              <Button size="sm" variant="outline" className="h-8">Export Report</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Block</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Enrollments</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Target</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Achievement</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Utilization</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Grievances</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {blockPerformance.map((block, index) => (
                    <tr key={index} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-sm">{block.name}</td>
                      <td className="py-3 px-4 text-sm font-medium">{block.enrollments.toLocaleString()}</td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">{block.target.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${block.achievement >= 100 ? 'text-green-600' :
                            block.achievement >= 90 ? 'text-blue-600' :
                              'text-orange-600'
                            }`}>
                            {block.achievement}%
                          </span>
                          <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${block.achievement >= 100 ? 'bg-green-600' :
                                block.achievement >= 90 ? 'bg-blue-600' :
                                  'bg-orange-600'
                                }`}
                              style={{ width: `${Math.min(block.achievement, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs font-semibold">{block.utilization}%</td>
                      <td className="py-3 px-4">
                        <Badge variant={block.grievances > 25 ? 'destructive' : 'outline'} className="h-5 text-[10px]">
                          {block.grievances}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={block.achievement >= 100 ? 'default' : block.achievement >= 90 ? 'secondary' : 'destructive'} className="h-5 text-[10px] font-bold uppercase">
                          {block.achievement >= 100 ? 'Excellent' : block.achievement >= 90 ? 'Good' : 'Critical'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-blue-600/20 bg-blue-600/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              District-Level AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/60 hover:border-blue-200 transition-colors shadow-sm">
                <Badge className="bg-green-600 mt-0.5 shadow-sm text-[10px] uppercase">Opportunity</Badge>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">Block D underperforming - deploy mobile enrollment camps</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Predictive model indicates +8,000 enrollments possible with mobile units, bringing district achievement to 94%.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/60 hover:border-blue-200 transition-colors shadow-sm">
                <Badge className="bg-blue-600 mt-0.5 shadow-sm text-[10px] uppercase tracking-wide">Trending</Badge>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">District showing consistent 12% monthly growth</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Current trajectory puts {districtInfo.name} on track to lead the state in net enrollment growth by Q3.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DistrictDashboard;
