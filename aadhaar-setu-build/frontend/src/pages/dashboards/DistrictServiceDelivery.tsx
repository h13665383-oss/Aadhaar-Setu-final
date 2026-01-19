import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, Clock, CheckCircle2, FileText, AlertTriangle, Fingerprint, Smartphone, UserCheck, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';

export const DistrictServiceDelivery: React.FC = () => {

    // -------------------------------------------------------------------------
    // MOCK DATA - District Service Delivery Metrics
    // -------------------------------------------------------------------------

    // 1. Overall Service Type Breakdown (Aggregated for Charts)
    const serviceBreakdown = [
        { name: 'Enrollment', requests: 2000, completed: 1930, processingTime: '3.2 days', loadShare: 15, color: '#3b82f6' },
        { name: 'Update', requests: 9800, completed: 9400, processingTime: '2.8 days', loadShare: 65, color: '#f59e0b' },
        { name: 'Authentication', requests: 2500, completed: 2450, processingTime: '0.1 secs', loadShare: 18, color: '#10b981' },
        { name: 'Grievance', requests: 150, completed: 110, processingTime: '5.5 days', loadShare: 2, color: '#ef4444' }
    ];

    // 2. Specific Service Details (for Table)
    const specificServices = [
        { category: 'Enrollment', type: 'New Enrollment', requests: 1200, completed: 1150, avgTime: '3.0 days' },
        { category: 'Enrollment', type: 'Child Enrollment', requests: 800, completed: 780, avgTime: '3.5 days' },
        { category: 'Update', type: 'Mobile Number', requests: 4200, completed: 4150, avgTime: '1.2 days' },
        { category: 'Update', type: 'Address Change', requests: 3500, completed: 3400, avgTime: '2.5 days' },
        { category: 'Update', type: 'Biometric Update', requests: 1500, completed: 1300, avgTime: '5.2 days' },
        { category: 'Update', type: 'Name/DOB Correction', requests: 600, completed: 550, avgTime: '4.0 days' },
        { category: 'Auth', type: 'Biometric Auth', requests: 1800, completed: 1750, avgTime: '< 1 sec' },
        { category: 'Auth', type: 'e-KYC', requests: 700, completed: 700, avgTime: '< 1 sec' },
    ];

    const chartData = serviceBreakdown.map(s => ({
        name: s.name,
        Requests: s.requests,
        Completed: s.completed
    }));

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Service Delivery Operations</h1>
                    <p className="text-muted-foreground mt-1">Monitor service delivery metrics and operational efficiency</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Service Requests</p>
                                    <p className="text-2xl font-bold">14,450</p>
                                </div>
                                <Target className="w-8 h-8 text-primary opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Completed</p>
                                    <p className="text-2xl font-bold">13,890</p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                                    <p className="text-2xl font-bold">2.4 days</p>
                                </div>
                                <Clock className="w-8 h-8 text-blue-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Success Rate</p>
                                    <p className="text-2xl font-bold">96.1%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Sections */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* Left Column: Charts (2 cols wide) */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Stacked Bar Chart: Requests vs Completed */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Target className="w-5 h-5 text-purple-600" />
                                    Requests vs. Completion Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="Requests" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={40} />
                                        <Bar dataKey="Completed" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Summary Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    Detailed Service Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium">Service Type</th>
                                                <th className="px-4 py-3 text-right font-medium">Requests</th>
                                                <th className="px-4 py-3 text-right font-medium">Completed</th>
                                                <th className="px-4 py-3 text-right font-medium">Processing Time</th>
                                                <th className="px-4 py-3 text-center font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {specificServices.map((service, index) => (
                                                <tr key={index} className="hover:bg-muted/30">
                                                    <td className="px-4 py-3 font-medium flex items-center gap-2">
                                                        {service.category === 'Update' && <RefreshCw className="w-3 h-3 text-orange-500" />}
                                                        {service.category === 'Enrollment' && <UserCheck className="w-3 h-3 text-blue-500" />}
                                                        {service.category === 'Auth' && <Fingerprint className="w-3 h-3 text-green-500" />}
                                                        {service.type}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">{service.requests.toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-right">{service.completed.toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-right text-muted-foreground">{service.avgTime}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        {(service.completed / service.requests) > 0.95 ? (
                                                            <div className="inline-flex items-center text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                                                On Track
                                                            </div>
                                                        ) : (service.completed / service.requests) > 0.85 ? (
                                                            <div className="inline-flex items-center text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                                                                Monitoring
                                                            </div>
                                                        ) : (
                                                            <div className="inline-flex items-center text-xs text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full">
                                                                Delayed
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Donut & Insights (1 col wide) */}
                    <div className="space-y-6">

                        {/* Donut Chart: Service Load Share */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Target className="w-5 h-5 text-orange-500" />
                                    Service Load Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center flex-1">
                                <div className="relative w-full h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={serviceBreakdown}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="loadShare"
                                            >
                                                {serviceBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend verticalAlign="bottom" height={36} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                        <span className="text-3xl font-bold text-foreground">65%</span>
                                        <span className="text-xs text-muted-foreground uppercase">Update Ops</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Insight Card */}
                        <Card className="bg-indigo-50 border-indigo-100">
                            <CardContent className="pt-6">
                                <div className="flex gap-4">
                                    <div className="bg-indigo-100 p-2 rounded-full h-fit">
                                        <FileText className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-indigo-900 mb-1">Operational Insight</h4>
                                        <p className="text-sm text-indigo-700 leading-relaxed">
                                            "Aadhaar Update Services contribute the highest service load (65%), with Biometric Updates taking the longest average processing time (5.2 days). Resource allocation to Biometric centers recommended."
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DistrictServiceDelivery;
