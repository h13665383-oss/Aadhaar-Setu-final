import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Building2, AlertCircle, MessageSquare, TrendingUp, TrendingDown, CheckCircle, Clock, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for charts (Visuals only)
const enrollmentTrendData = [
  { day: 'Mon', enrollments: 420, target: 400 },
  { day: 'Tue', enrollments: 380, target: 400 },
  { day: 'Wed', enrollments: 450, target: 400 },
  { day: 'Thu', enrollments: 520, target: 400 },
  { day: 'Fri', enrollments: 480, target: 400 },
  { day: 'Sat', enrollments: 390, target: 400 },
  { day: 'Sun', enrollments: 280, target: 400 },
];

const serviceTypeData = [
  { name: 'New Enrollment', value: 45, color: '#3b82f6' },
  { name: 'Update', value: 30, color: '#10b981' },
  { name: 'Correction', value: 15, color: '#f59e0b' },
  { name: 'Reprint', value: 10, color: '#8b5cf6' },
];

const centerPerformanceData = [
  { center: 'CSC Kendra', utilization: 92, enrollments: 156 },
  { center: 'Post Office', utilization: 78, enrollments: 124 },
  { center: 'Panchayat', utilization: 65, enrollments: 98 },
  { center: 'Bank Branch', utilization: 88, enrollments: 142 },
];

export const BlockDashboard: React.FC = () => {
  const { appointments, grievances, resolveGrievance, addNotification } = useData();
  const { user } = useAuth();

  const openGrievances = grievances.filter(g => g.status !== 'Resolved').length;
  const blockName = user?.block || 'Sample Block';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground">Block Operations</h1>
              <Badge className="bg-primary/20 text-primary border-none text-[10px] h-5 font-bold">{blockName}</Badge>
            </div>
            <p className="text-muted-foreground mt-1">Ground-level monitoring for {blockName} jurisdiction</p>
          </div>
          <Badge className="bg-green-600 text-white shadow-sm px-3 py-1">
            Status: Active
          </Badge>
        </div>

        {/* User context banner */}
        {user && (
          <div className="bg-muted/50 border border-border p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full border shadow-sm">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.designation} • {blockName}, {user.district}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white rounded-lg border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <LayoutDashboard className="w-3 h-3" />
              Primary Dashboard
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Monthly Active</p>
                  <p className="text-3xl font-bold mt-1">4,520</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+8%</span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-primary opacity-10" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Live Centers</p>
                  <p className="text-3xl font-bold mt-1">12</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-muted-foreground font-medium">10 transmitting</span>
                  </div>
                </div>
                <Building2 className="w-12 h-12 text-green-600 opacity-10" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Pending Sync</p>
                  <p className="text-3xl font-bold mt-1">1,234</p>
                  <div className="flex items-center gap-1 mt-2 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Low latency</span>
                  </div>
                </div>
                <AlertCircle className="w-12 h-12 text-orange-600 opacity-10" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Open Grievances</p>
                  <p className="text-3xl font-bold mt-1">{openGrievances}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Badge variant={openGrievances > 5 ? 'destructive' : 'secondary'} className="text-[10px] h-4">
                      {openGrievances > 5 ? 'Priority' : 'Nominal'}
                    </Badge>
                  </div>
                </div>
                <MessageSquare className="w-12 h-12 text-blue-600 opacity-10" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Daily Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                    name="Actual Enrollments"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Daily Target"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Service Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Live Operations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Appointments */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold text-primary">Queue Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments.slice(0, 4).map(apt => (
                  <div key={apt.id} className="flex items-center justify-between p-3 bg-muted/20 border border-muted/30 rounded-xl hover:bg-white transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-xs">{apt.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">{apt.time} • {apt.serviceType}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{apt.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grievance Management - Interactive */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Grievance Backlog</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => addNotification('View All', 'Loading system backlog...', 'info')}>Expand</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {grievances.slice(0, 3).map(g => (
                  <div key={g.id} className="flex items-center justify-between p-3 border border-border/50 rounded-xl hover:shadow-sm transition-all">
                    <div>
                      <p className="font-bold text-xs">{g.subject}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${g.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                          }`}>{g.priority}</span>
                      </div>
                    </div>
                    {g.status !== 'Resolved' ? (
                      <Button size="sm" variant="outline" onClick={() => resolveGrievance(g.id)} className="h-7 text-[10px] font-bold">
                        Resolve
                      </Button>
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions Panel */}
        <Card className="border-none bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-black text-primary">
              <TrendingUp className="w-5 h-5" />
              Smart Block Strategy (AI)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/80 border border-white/40 shadow-sm">
                <p className="text-sm font-bold text-foreground">Optimize Staffing for Thursday Surge</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Cross-center analysis shows 23% footfall increase on Thursdays. Suggest redeploying 2 staff members from Bank Branch to CSC Kendra for 4 hours.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-white/40 shadow-sm">
                <p className="text-sm font-bold text-foreground">Targeted Update Campaign</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">High percentage of expired biometric records detected in Sector 4. Triggering SMS notifications to 1,200 residents.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BlockDashboard;
