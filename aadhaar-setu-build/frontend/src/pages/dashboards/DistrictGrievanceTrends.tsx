import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, CheckCircle2, Clock, MapPin, FileBarChart } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area, Cell } from 'recharts';

export const DistrictGrievanceTrends: React.FC = () => {

    // -------------------------------------------------------------------------
    // MOCK DATA - Grievance Trends
    // -------------------------------------------------------------------------

    // 1. Time-wise Grievance Trend (Last 30 Days - Weekly Aggregated)
    const timeTrendData = [
        { period: 'Week 1', New: 45, Resolved: 30 },
        { period: 'Week 2', New: 52, Resolved: 38 },
        { period: 'Week 3', New: 48, Resolved: 45 },
        { period: 'Week 4', New: 35, Resolved: 40 }, // Improving trend
    ];

    // 2. Type-wise Grievance Trend (Stacked)
    const typeTrendData = [
        { period: 'Week 1', Enrollment: 15, Update: 20, Biometric: 5, Infrastructure: 5 },
        { period: 'Week 2', Enrollment: 18, Update: 22, Biometric: 8, Infrastructure: 4 },
        { period: 'Week 3', Enrollment: 12, Update: 25, Biometric: 6, Infrastructure: 5 },
        { period: 'Week 4', Enrollment: 10, Update: 15, Biometric: 5, Infrastructure: 5 },
    ];

    // 3. Location-wise Hotspots (Block Level)
    const locationData = [
        { block: 'Central Block', grievances: 85, status: 'Critical' },
        { block: 'North Zone', grievances: 62, status: 'High' },
        { block: 'West District', grievances: 45, status: 'Medium' },
        { block: 'East District', grievances: 28, status: 'Low' },
        { block: 'South Rural', grievances: 15, status: 'Low' },
    ]; // Sorted High to Low

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Grievance Trends Analysis</h1>
                    <p className="text-muted-foreground mt-1">Track and analyze grievance patterns across blocks</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Grievances</p>
                                    <p className="text-2xl font-bold">191</p>
                                </div>
                                <AlertTriangle className="w-8 h-8 text-orange-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Resolved</p>
                                    <p className="text-2xl font-bold">145</p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Resolution Rate</p>
                                    <p className="text-2xl font-bold">75.9%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-blue-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* 1. Time-wise Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Grievance Resolution Trend (Last 30 Days)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={timeTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="period" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                            cursor={{ stroke: '#e2e8f0' }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="New" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="Resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-center text-muted-foreground mt-4">
                                * Insight: Resolution rate has improved by 15% in the last 7 days.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 2. Type-wise Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <FileBarChart className="w-5 h-5 text-purple-600" />
                                Grievance Type Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={typeTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="period" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                            cursor={{ fill: 'transparent' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="Enrollment" stackId="a" fill="#3b82f6" />
                                        <Bar dataKey="Update" stackId="a" fill="#f59e0b" />
                                        <Bar dataKey="Biometric" stackId="a" fill="#ef4444" />
                                        <Bar dataKey="Infrastructure" stackId="a" fill="#94a3b8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-center text-muted-foreground mt-4">
                                * Enrollment and Biometric issues are stable, but Update issues saw a spike in Week 3.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 3. Location-wise Hotspot */}
                    <Card className="xl:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-red-600" />
                                Grievance Hotspots by Block
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis dataKey="block" type="category" width={100} fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                        />
                                        <Bar dataKey="grievances" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24}>
                                            {
                                                locationData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.status === 'Critical' ? '#dc2626' : entry.status === 'High' ? '#ea580c' : '#3b82f6'} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-600"></span> Critical ({'>'} 80)
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-orange-600"></span> High (50-80)
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-blue-500"></span> Normal ({'<'} 50)
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default DistrictGrievanceTrends;
