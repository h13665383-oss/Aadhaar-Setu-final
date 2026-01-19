import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle2, FileCheck, MessageSquare, Clock, MapPin, AlertCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const StateCompliance: React.FC = () => {

    // -------------------------------------------------------------------------
    // MOCK DATA - Citizen Grievance & Compliance Stats
    // -------------------------------------------------------------------------

    // 1. Complaint Categories
    const complaintCategories = [
        { category: 'Enrollment Issues', count: 1245, color: '#3b82f6' },
        { category: 'Update Problems', count: 980, color: '#f59e0b' },
        { category: 'Biometric Auth Failure', count: 850, color: '#ef4444' },
        { category: 'Infrastructure/Power', count: 620, color: '#8b5cf6' },
        { category: 'Operator Conduct', count: 450, color: '#10b981' },
    ];

    // 2. Top Reported Issues
    const topIssues = [
        { issue: 'Address update pending >30 days', count: 342, severity: 'High' },
        { issue: 'Fingerprint mismatch during auth', count: 289, severity: 'High' },
        { issue: 'Enrollment center closed during hours', count: 156, severity: 'Medium' },
        { issue: 'Operator overcharging', count: 98, severity: 'Critical' },
        { issue: 'Document upload failure', count: 87, severity: 'Medium' },
    ];

    // 3. District Heat Indicator
    const districtComplaintHeat = [
        { district: 'Pune', volume: 'High', count: 450, status: 'Critical' },
        { district: 'Thane', volume: 'High', count: 380, status: 'Critical' },
        { district: 'Nagpur', volume: 'Medium', count: 210, status: 'Warning' },
        { district: 'Nashik', volume: 'Medium', count: 180, status: 'Warning' },
        { district: 'Nandurbar', volume: 'Low', count: 45, status: 'Normal' },
    ];

    // 4. Resolution Status
    const resolutionStats = {
        resolved: 65,
        pendingShort: 25, // < 7 days
        pendingLong: 10   // > 30 days
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Compliance & Grievance Monitoring</h1>
                    <p className="text-muted-foreground mt-1">Real-time tracking of citizen complaints and operational compliance</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                                    <p className="text-2xl font-bold">96.2%</p>
                                </div>
                                <Shield className="w-8 h-8 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Grievances</p>
                                    <p className="text-2xl font-bold">1,245</p>
                                </div>
                                <MessageSquare className="w-8 h-8 text-blue-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Risks</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <AlertTriangle className="w-8 h-8 text-orange-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Resolution Rate</p>
                                    <p className="text-2xl font-bold">94.5%</p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* SECTION 1: Complaint Category Overview */}
                    <Card className="flex flex-col h-full">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                                Citizen Complaint Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={complaintCategories} layout="vertical" margin={{ left: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="category" type="category" width={140} fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {complaintCategories.slice(0, 4).map((c, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs bg-muted/30 p-2 rounded">
                                        <span className="font-medium">{c.category}</span>
                                        <Badge variant="secondary">{c.count}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* SECTION 2: Top Issues & Resolution Status */}
                    <div className="space-y-6">

                        {/* 2.1 Top Issues */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-orange-500" />
                                    Most Reported Problems
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topIssues.map((issue, i) => (
                                        <div key={i} className="flex items-start justify-between pb-3 border-b last:border-0 last:pb-0">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{issue.issue}</p>
                                                <Badge variant={issue.severity === 'Critical' ? 'destructive' : 'outline'} className="text-[10px] h-5">
                                                    {issue.severity} Priority
                                                </Badge>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-bold text-muted-foreground">{issue.count}</span>
                                                <p className="text-[10px] text-muted-foreground">reports</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2.2 Resolution Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-green-600" />
                                    Grievance Resolution Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Resolved</span>
                                            <span className="font-bold text-green-600">{resolutionStats.resolved}%</span>
                                        </div>
                                        <Progress value={resolutionStats.resolved} className="h-2 bg-green-100" indicatorClassName="bg-green-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Pending ({'<'} 7 Days)</span>
                                            <span className="font-bold text-blue-600">{resolutionStats.pendingShort}%</span>
                                        </div>
                                        <Progress value={resolutionStats.pendingShort} className="h-2 bg-blue-100" indicatorClassName="bg-blue-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="flex items-center gap-2 text-red-600 font-medium">
                                                Pending ({'>'} 30 Days)
                                                <AlertTriangle className="w-3 h-3" />
                                            </span>
                                            <span className="font-bold text-red-600">{resolutionStats.pendingLong}%</span>
                                        </div>
                                        <Progress value={resolutionStats.pendingLong} className="h-2 bg-red-100" indicatorClassName="bg-red-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* SECTION 3: District Heat & Insight */}
                    <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* 3.1 District Heat Indicator */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-red-500" />
                                    District-wise Complaint Heatmap
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium">District</th>
                                                <th className="px-4 py-3 text-center font-medium">Volume</th>
                                                <th className="px-4 py-3 text-center font-medium">Complaints</th>
                                                <th className="px-4 py-3 text-center font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {districtComplaintHeat.map((d, i) => (
                                                <tr key={i} className="hover:bg-muted/30">
                                                    <td className="px-4 py-3 font-medium">{d.district}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <Badge variant={d.volume === 'High' ? 'destructive' : d.volume === 'Medium' ? 'outline' : 'secondary'}
                                                            className={d.volume === 'Medium' ? 'border-orange-500 text-orange-600' : ''}>
                                                            {d.volume}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-center font-bold">{d.count}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${d.status === 'Critical' ? 'bg-red-100 text-red-700' :
                                                                d.status === 'Warning' ? 'bg-amber-100 text-amber-700' :
                                                                    'bg-green-100 text-green-700'
                                                            }`}>
                                                            {d.status} Action
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 3.2 Citizen Impact Insight */}
                        <Card className="bg-blue-50/50 border-blue-100 flex flex-col justify-center">
                            <CardContent className="pt-6 text-center space-y-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                    <Info className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-2">Citizen Impact Analysis</h3>
                                    <p className="text-sm text-blue-700 leading-relaxed">
                                        "Biometric authentication failures are highest among rural districts (approx. 38% of rural complaints), indicating potential device quality issues or need for operator training in those regions."
                                    </p>
                                </div>
                                <Badge variant="outline" className="bg-white text-blue-600 border-blue-200">
                                    AI Generated Insight
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default StateCompliance;
