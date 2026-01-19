import React, { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, MapPin, Clock, Info, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

export const PublicInsights: React.FC = () => {
  const { user } = useAuth();
  const { data } = useData();

  const locationName = user?.location || 'National';

  // Real data calc for the user's state if logged in
  const stateStats = useMemo(() => {
    if (!data || !user?.state) return null;
    return data.states.find(s => s.name === user.state);
  }, [data, user]);

  const ageData = [
    { name: '0-5 Years', value: stateStats?.age_0_5 || 400000, color: '#3b82f6' },
    { name: '5-17 Years', value: stateStats?.age_5_17 || 600000, color: '#10b981' },
    { name: '18+ Years', value: stateStats?.age_18_greater || 2000000, color: '#f59e0b' },
  ];

  // Mock Trend Data for Momentum Chart
  const trendData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 4200 },
    { name: 'Sep', value: 5100 },
    { name: 'Oct', value: 5800 },
    { name: 'Nov', value: 6100 },
    { name: 'Dec', value: 7200 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-700 font-sans">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Public Data Insights</h1>
            <p className="text-slate-500 mt-1 text-sm">Official statistics and aggregated trends for {locationName}</p>
          </div>
          {user && (
            <div className="flex items-center gap-3 bg-white p-1.5 px-4 rounded-full border shadow-sm">
              <div className="bg-slate-100 p-1.5 rounded-full">
                <UserIcon className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">{user.name}</span>
            </div>
          )}
        </div>

        {user && (
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-center gap-4">
            <Info className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-800">
              Displaying localized data for <strong>{user.district}, {user.state}</strong> based on registered jurisdiction.
            </p>
          </div>
        )}

        {/* Stats Grid - Kept clean and minimal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border shadow-sm bg-white">
            <CardContent className="pt-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Enrollments</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{(stateStats?.enrollments || 369820).toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium text-emerald-700">Steady Growth</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-white">
            <CardContent className="pt-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Service Centers</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{user ? '142' : '54,320'}</p>
              <p className="text-xs text-slate-500 mt-2">Verified operational points</p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-white">
            <CardContent className="pt-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Daily Processing Volume</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{user ? '12,450' : '2.8M'}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-slate-500" />
                <span className="text-xs font-medium text-slate-600">Peak load observed today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-white">
            <CardContent className="pt-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Avg Wait Time</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">18m</p>
              <p className="text-xs text-orange-600 mt-2 font-medium">Moderate demand period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Age Distribution Chart */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">Demographic Distribution</CardTitle>
              <p className="text-xs text-slate-500">Age group segmentation for {user?.state || 'National'}</p>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#334155', fontSize: '12px', fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {ageData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs font-medium text-slate-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* NEW: Data Journalism Style Trend Chart */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-800">Monthly Enrollment Momentum</CardTitle>
              <p className="text-xs text-slate-500">Enrollment trend evolution over the current fiscal year</p>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      fontSize={11}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b' }}
                      dy={10}
                    />
                    <YAxis
                      fontSize={11}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b' }}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                      labelStyle={{ color: '#64748b', fontSize: '11px', marginBottom: '4px' }}
                      itemStyle={{ color: '#0f766e', fontSize: '12px', fontWeight: 600 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0f766e"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#0f766e', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Map Placeholder */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="border shadow-sm bg-slate-50/50">
            <CardHeader className="pb-2 border-b border-slate-100 bg-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-slate-800">Service Center Geographic Density</CardTitle>
                  <p className="text-xs text-slate-500 mt-1">
                    This visualization represents the relative density of Aadhaar service centers across districts based on aggregated data.
                  </p>
                </div>
                <Badge variant="outline" className="bg-white text-slate-500 border-slate-200 font-normal">
                  <MapPin className="w-3 h-3 mr-1" /> Geospatial View
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-80 w-full bg-white rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group">

                {/* Abstract decorative map background hint */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/India_location_map.svg/1703px-India_location_map.svg.png')] bg-center bg-contain bg-no-repeat pointer-events-none"></div>

                <div className="z-10 text-center max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-2">Geospatial Density Map Placeholder</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Interactive map feature disabled in this public preview.
                    Darker regions conventionally indicate higher service center concentration,
                    while lighter regions highlight growing coverage areas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PublicInsights;
