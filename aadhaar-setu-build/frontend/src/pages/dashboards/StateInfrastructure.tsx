import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, Wifi, Zap, CheckCircle2, AlertTriangle, Gauge, Smartphone, Server, Laptop } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const StateInfrastructure: React.FC = () => {

    // -------------------------------------------------------------------------
    // MOCK DATA - Aggregated Infrastructure Stats
    // -------------------------------------------------------------------------

    // 1. Center Capabilities
    const capabilityData = [
        { label: 'Biometric Enabled', value: 98, icon: Building2 },
        { label: 'e-KYC Ready', value: 95, icon: Server },
        { label: 'Mobile Kit Available', value: 85, icon: Smartphone },
        { label: 'Offline Mode Support', value: 92, icon: Laptop }
    ];

    // 2. District Readiness Sample
    const districtReadiness = [
        { name: 'Pune', centers: 145, internet: 99, power: 98, health: 97 },
        { name: 'Nagpur', centers: 98, internet: 95, power: 94, health: 92 },
        { name: 'Thane', centers: 112, internet: 97, power: 95, health: 89 },
        { name: 'Nandurbar', centers: 45, internet: 82, power: 78, health: 85 }, // Low metrics
        { name: 'Gadchiroli', centers: 38, internet: 85, power: 80, health: 82 }, // Low metrics
    ];

    // 3. Tech Adoption Calculation
    const techMetrics = {
        internet: 98.5,
        power: 92.1,
        health: 94.7,
        ekyc: 95.0
    };

    // Simple average for index
    const adoptionIndex = Math.round(
        (techMetrics.internet + techMetrics.power + techMetrics.health + techMetrics.ekyc) / 4
    );

    const gaugeData = [
        { name: 'Score', value: adoptionIndex, color: '#3b82f6' },
        { name: 'Remaining', value: 100 - adoptionIndex, color: '#e2e8f0' }
    ];

    // 4. Risk Flags Logic
    const risks = [
        { label: 'Power Backup < 85%', status: techMetrics.power < 85 },
        { label: 'Internet < 90%', status: techMetrics.internet < 90 },
        { label: 'Equipment Health < 88%', status: techMetrics.health < 88 },
        // Dynamic district risks
        ...districtReadiness.filter(d => d.power < 85).map(d => ({ label: `Critical Power: ${d.name}`, status: true })),
        ...districtReadiness.filter(d => d.internet < 85).map(d => ({ label: `Connectivity Gap: ${d.name}`, status: true })),
    ].filter(r => r.status);

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Infrastructure Analysis</h1>
                        <p className="text-muted-foreground mt-1">Infrastructure availability and technology adoption across the state</p>
                    </div>
                    <Badge variant={adoptionIndex > 90 ? "default" : "secondary"} className="h-8 px-3 text-sm">
                        State Readiness: {adoptionIndex > 90 ? 'Excellent' : 'Moderate'}
                    </Badge>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Centers</p>
                                    <p className="text-2xl font-bold">1,245</p>
                                </div>
                                <Building2 className="w-8 h-8 text-primary opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Internet Enabled</p>
                                    <p className="text-2xl font-bold">98.5%</p>
                                </div>
                                <Wifi className="w-8 h-8 text-green-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Power Backup</p>
                                    <p className="text-2xl font-bold">92.1%</p>
                                </div>
                                <Zap className="w-8 h-8 text-yellow-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Equipment Health</p>
                                    <p className="text-2xl font-bold">94.7%</p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-blue-600 opacity-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* LEFT COLUMN: Deep Dives (2 cols wide) */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* 1. Center Capability Breakdown */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Server className="w-5 h-5 text-purple-600" />
                                    Center Capability Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                {capabilityData.map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="flex items-center gap-2 font-medium">
                                                <item.icon className="w-4 h-4 text-muted-foreground" />
                                                {item.label}
                                            </span>
                                            <span className="font-bold">{item.value}%</span>
                                        </div>
                                        <Progress value={item.value} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* 2. District Infrastructure Readiness */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                    District Infrastructure Readiness
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium">District</th>
                                                <th className="px-4 py-3 text-center font-medium">Centers</th>
                                                <th className="px-4 py-3 text-center font-medium">Internet</th>
                                                <th className="px-4 py-3 text-center font-medium">Power</th>
                                                <th className="px-4 py-3 text-center font-medium">Health</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {districtReadiness.map((d, i) => (
                                                <tr key={i} className="hover:bg-muted/30">
                                                    <td className="px-4 py-3 font-medium">{d.name}</td>
                                                    <td className="px-4 py-3 text-center">{d.centers}</td>
                                                    <td className={`px-4 py-3 text-center font-medium ${d.internet < 90 ? 'text-red-500' : 'text-green-600'}`}>
                                                        {d.internet}%
                                                    </td>
                                                    <td className={`px-4 py-3 text-center font-medium ${d.power < 90 ? 'text-red-500' : 'text-green-600'}`}>
                                                        {d.power}%
                                                    </td>
                                                    <td className={`px-4 py-3 text-center font-medium ${d.health < 90 ? 'text-amber-500' : 'text-green-600'}`}>
                                                        {d.health}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: Scores & Risks (1 col wide) */}
                    <div className="space-y-6">

                        {/* 3. Technology Adoption Index */}
                        <Card className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white border-blue-100">
                            <h3 className="text-base font-bold text-center mb-4 text-blue-900 flex items-center gap-2">
                                <Gauge className="w-5 h-5" />
                                Technology Adoption Index
                            </h3>
                            <div className="relative w-48 h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={gaugeData}
                                            cx="50%"
                                            cy="50%"
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {gaugeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                                    <span className="text-4xl font-black text-blue-600">{adoptionIndex}</span>
                                    <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Score</span>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-3 gap-1 text-center text-[10px] text-muted-foreground font-medium mt-[-20px]">
                                <span>Needs Upgrade</span>
                                <span>Moderate</span>
                                <span>Excellent</span>
                            </div>
                        </Card>

                        {/* 4. Infrastructure Risk Flags */}
                        <Card className="border-red-100 bg-red-50/30">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2 text-red-700">
                                    <AlertTriangle className="w-5 h-5" />
                                    Risk Indicators
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {risks.length > 0 ? risks.map((r, i) => (
                                        <Badge key={i} variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                                            {r.label}
                                        </Badge>
                                    )) : (
                                        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                            <CheckCircle2 className="w-4 h-4" />
                                            No critical infrastructure risks detected.
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-4">
                                    *Risks are flagged when metrics fall below 85-90% thresholds defined by UIDAI technical standards.
                                </p>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StateInfrastructure;
