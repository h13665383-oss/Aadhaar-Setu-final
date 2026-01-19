import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Users, MapPin, PieChart as PieChartIcon, Activity, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';

export const DistrictDemandAnalysis: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

    // -------------------------------------------------------------------------
    // MOCK DATA - Demand Analytics
    // -------------------------------------------------------------------------

    // 1. Service Demand Trend (Time-series)
    const trendData = [
        { date: 'Jan 10', enrollment: 120, update: 450, auth: 1100 },
        { date: 'Jan 11', enrollment: 135, update: 480, auth: 1150 },
        { date: 'Jan 12', enrollment: 110, update: 420, auth: 980 },
        { date: 'Jan 13', enrollment: 140, update: 520, auth: 1250 },
        { date: 'Jan 14', enrollment: 155, update: 550, auth: 1300 },
        { date: 'Jan 15', enrollment: 145, update: 530, auth: 1280 },
        { date: 'Jan 16', enrollment: 160, update: 590, auth: 1400 },
    ];

    // 2. Block-wise Demand Heatmap (List/Grid)
    const blockDemand = [
        { name: 'Central Block', requests: 1250, status: 'High', color: 'bg-red-100 text-red-700 border-red-200' },
        { name: 'North Zone', requests: 980, status: 'High', color: 'bg-red-100 text-red-700 border-red-200' },
        { name: 'East District', requests: 750, status: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
        { name: 'West District', requests: 620, status: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
        { name: 'South Rural', requests: 340, status: 'Low', color: 'bg-green-100 text-green-700 border-green-200' },
        { name: 'Industrial Area', requests: 290, status: 'Low', color: 'bg-green-100 text-green-700 border-green-200' },
    ];

    // 3. Service Distribution (Pie Chart)
    const distributionData = [
        { name: 'Update', value: 65, color: '#f59e0b' },
        { name: 'Authentication', value: 25, color: '#10b981' },
        { name: 'Enrollment', value: 10, color: '#3b82f6' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Demand & Appointment Load Analysis</h1>
                    <p className="text-muted-foreground mt-1">Analyze service demand patterns and appointment distribution</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Daily Demand</p>
                                    <p className="text-2xl font-bold">1,850</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-primary opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Appointments Booked</p>
                                    <p className="text-2xl font-bold">1,420</p>
                                </div>
                                <Calendar className="w-8 h-8 text-blue-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Walk-ins</p>
                                    <p className="text-2xl font-bold">430</p>
                                </div>
                                <Users className="w-8 h-8 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* Left Column: Trend Chart (Cols 1 & 2) */}
                    <div className="xl:col-span-2 space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-blue-600" />
                                    Service Demand Trend
                                </CardTitle>
                                <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
                                    {(['7d', '30d', '90d'] as const).map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range)}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === range
                                                    ? 'bg-white shadow text-foreground'
                                                    : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            {range === '7d' ? 'Last 7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                                        </button>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend iconType="circle" />
                                            <Line type="monotone" dataKey="auth" name="Authentication" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="update" name="Address/Bio Update" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="enrollment" name="Enrollment" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Block Heatmap */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-red-500" />
                                    Block-wise Demand Heatmap
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {blockDemand.map((block, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border ${block.color} flex flex-col justify-between transition-all hover:scale-[1.02] cursor-default`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-semibold text-sm">{block.name}</span>
                                                <Badge variant="outline" className="bg-white/50 border-0 text-[10px] uppercase tracking-wide">
                                                    {block.status}
                                                </Badge>
                                            </div>
                                            <div>
                                                <span className="text-2xl font-bold">{block.requests.toLocaleString()}</span>
                                                <p className="text-xs opacity-80">Active Requests</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Distribution (Col 3) */}
                    <div className="space-y-6">
                        <Card className="flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <PieChartIcon className="w-5 h-5 text-purple-600" />
                                    Service Type Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col items-center justify-center">
                                <div className="relative w-full aspect-square max-h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={distributionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {distributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-bold">Total</span>
                                        <span className="text-sm text-muted-foreground">Distribution</span>
                                    </div>
                                </div>
                                <div className="w-full space-y-3 mt-6">
                                    {distributionData.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-muted-foreground">{item.name}</span>
                                            </div>
                                            <span className="font-bold">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default DistrictDemandAnalysis;
