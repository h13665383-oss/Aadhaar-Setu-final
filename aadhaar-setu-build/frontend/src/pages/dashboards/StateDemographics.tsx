import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, MapPin, Calendar, Info, AlertTriangle } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

export const StateDemographics: React.FC = () => {
    // -------------------------------------------------------------------------
    // MOCK DATA - Aggregated State Level (Non-Personal)
    // -------------------------------------------------------------------------

    // 1. Age Group Data
    const ageGroupData = [
        { age: '0-5', populationPct: 12, coverage: 42, urban: 45, rural: 55 }, // Low coverage for 0-5 is typical
        { age: '6-14', populationPct: 18, coverage: 94, urban: 42, rural: 58 },
        { age: '15-18', populationPct: 8, coverage: 91, urban: 40, rural: 60 },
        { age: '19-35', populationPct: 32, coverage: 99, urban: 55, rural: 45 },
        { age: '36-59', populationPct: 22, coverage: 98, urban: 52, rural: 48 },
        { age: '60+', populationPct: 8, coverage: 92, urban: 35, rural: 65 },
    ];

    // Calculate Gap for Horizontal Chart
    const ageGapData = ageGroupData.map(d => ({
        age: d.age,
        gap: 100 - d.coverage,
        isHighGap: (100 - d.coverage) > 10
    }));

    // 2. Gender Data
    const genderData = [
        { name: 'Male', coverage: 94.5, color: '#3b82f6' },
        { name: 'Female', coverage: 90.2, color: '#ec4899' },
        { name: 'Other', coverage: 78.0, color: '#a855f7' },
    ];

    // 3. District Gender Disparity Sample
    const districtGenderDisparity = [
        { district: 'Nandurbar', male: 91, female: 82, gap: 9 },
        { district: 'Washim', male: 93, female: 86, gap: 7 },
        { district: 'Gadchiroli', male: 89, female: 84, gap: 5 },
        { district: 'Osmanabad', male: 95, female: 92, gap: 3 },
        { district: 'Pune', male: 99, female: 98, gap: 1 },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Demographic Intelligence</h1>
                    <p className="text-muted-foreground mt-1">State-wide demographic analysis and coverage statistics</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Population</p>
                                    <p className="text-2xl font-bold">84.5M</p>
                                </div>
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Aadhaar Coverage</p>
                                    <p className="text-2xl font-bold">92.3%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Urban Coverage</p>
                                    <p className="text-2xl font-bold">96.8%</p>
                                </div>
                                <MapPin className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Rural Coverage</p>
                                    <p className="text-2xl font-bold">87.2%</p>
                                </div>
                                <Calendar className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Sections */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* SECTION 1: AGE GROUP DISTRIBUTION */}
                    <Card className="flex flex-col h-full">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    Age Group Distribution
                                </CardTitle>
                                <Badge variant="outline">Aggregated Data</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 flex-1">
                            {/* 1.1 Population vs Coverage Chart */}
                            <div>
                                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-muted-foreground" />
                                    Population Share vs. Aadhaar Saturation
                                </h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={ageGroupData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="age" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                            formatter={(value: number) => [`${value}%`, '']}
                                        />
                                        <Legend />
                                        <Bar dataKey="populationPct" name="% Population" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="coverage" name="% Coverage" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 1.2 Enrollment Gap */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-3">Enrollment Gap by Age</h3>
                                    <div className="space-y-3">
                                        {ageGapData.map((d, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span>{d.age} Years</span>
                                                    <span className={d.isHighGap ? "text-red-500 font-bold" : "text-muted-foreground"}>
                                                        {d.gap}% Gap
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${d.isHighGap ? 'bg-red-500' : 'bg-blue-400'}`}
                                                        style={{ width: `${Math.min(d.gap, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 1.3 Urban/Rural Split */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-3">Urban vs. Rural Split</h3>
                                    <ResponsiveContainer width="100%" height={180}>
                                        <BarChart data={ageGroupData} layout="vertical" stackOffset="expand">
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="age" type="category" width={40} fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip formatter={(val: number) => [`${val}%`, '']} />
                                            <Bar dataKey="urban" stackId="a" fill="#3b82f6" radius={[4, 0, 0, 4]} name="Urban" />
                                            <Bar dataKey="rural" stackId="a" fill="#f97316" radius={[0, 4, 4, 0]} name="Rural" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div>Urban</div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div>Rural</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SECTION 2: GENDER STATISTICS */}
                    <Card className="flex flex-col h-full">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Users className="w-5 h-5 text-pink-500" />
                                    Gender Statistics
                                </CardTitle>
                                <Badge variant="outline">State-wide</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 flex-1">
                            {/* 2.1 Gender Coverage Donut */}
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative w-48 h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={genderData}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="coverage"
                                            >
                                                {genderData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-xs text-muted-foreground">Avg Coverage</span>
                                        <span className="text-xl font-bold">92%</span>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4 w-full">
                                    <h3 className="text-sm font-semibold">State-wide Gender Coverage</h3>
                                    {genderData.map((g, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.color }} />
                                                <span className="font-medium">{g.name}</span>
                                            </div>
                                            <span className="font-bold">{g.coverage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 2.2 Gender Gap Index */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-semibold text-slate-700">Gender Gap Index</h3>
                                    <Badge variant="secondary" className={genderData[0].coverage - genderData[1].coverage < 5 ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"}>
                                        {(genderData[0].coverage - genderData[1].coverage).toFixed(1)}% Gap
                                    </Badge>
                                </div>
                                <div className="relative h-4 bg-slate-200 rounded-full mt-2">
                                    {/* Center Line */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 transform -translate-x-1/2"></div>
                                    {/* Indicator */}
                                    <div
                                        className="absolute top-0 bottom-0 bg-blue-500 rounded-full opacity-70"
                                        style={{
                                            left: '50%',
                                            width: `${(genderData[0].coverage - genderData[1].coverage) * 5}%` // Scale factor for visual
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                    <span>Female Lead</span>
                                    <span>Balanced</span>
                                    <span>Male Lead</span>
                                </div>
                            </div>

                            {/* 2.3 District Disparity Table */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold">District-wise Gender Disparity</h3>
                                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                                </div>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-secondary text-muted-foreground">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-medium">District</th>
                                                <th className="px-4 py-2 text-right font-medium">Male</th>
                                                <th className="px-4 py-2 text-right font-medium">Female</th>
                                                <th className="px-4 py-2 text-right font-medium">Gap</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {districtGenderDisparity.map((d, i) => (
                                                <tr key={i} className="hover:bg-muted/50 transition-colors">
                                                    <td className="px-4 py-2 font-medium">{d.district}</td>
                                                    <td className="px-4 py-2 text-right">{d.male}%</td>
                                                    <td className="px-4 py-2 text-right">{d.female}%</td>
                                                    <td className={`px-4 py-2 text-right font-bold ${d.gap > 5 ? 'text-red-500' : 'text-green-600'}`}>
                                                        {d.gap}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StateDemographics;
