import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Globe, Calendar, Shield, Award, AlertCircle, Target } from 'lucide-react';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export const NationalDemographics: React.FC = () => {
    // ========================================
    // DATA LAYER - Aggregated Mock Data Only
    // ========================================

    // 1. Population Growth Trend (2011-2035 projection)
    const populationGrowthData = [
        { year: '2011', population: 1.21, projected: false },
        { year: '2013', population: 1.25, projected: false },
        { year: '2015', population: 1.29, projected: false },
        { year: '2017', population: 1.33, projected: false },
        { year: '2019', population: 1.36, projected: false },
        { year: '2021', population: 1.39, projected: false },
        { year: '2023', population: 1.41, projected: false },
        { year: '2025', population: 1.43, projected: false }, // Current
        { year: '2027', population: 1.45, projected: true },
        { year: '2030', population: 1.48, projected: true },
        { year: '2033', population: 1.50, projected: true },
        { year: '2035', population: 1.51, projected: true },
    ];

    // 2. Age Group Distribution
    const ageDistribution = [
        { group: '0-14 (Children)', value: 26.5, color: '#3b82f6' },
        { group: '15-35 (Youth)', value: 41.2, color: '#10b981' },
        { group: '36-59 (Working Age)', value: 24.8, color: '#f59e0b' },
        { group: '60+ (Senior Citizens)', value: 7.5, color: '#8b5cf6' },
    ];

    // 3. Gender Ratio Trend (Year-wise)
    const genderRatioData = [
        { year: '2015', male: 51.8, female: 48.0, other: 0.2 },
        { year: '2017', male: 51.6, female: 48.2, other: 0.2 },
        { year: '2019', male: 51.5, female: 48.3, other: 0.2 },
        { year: '2021', male: 51.4, female: 48.4, other: 0.2 },
        { year: '2023', male: 51.2, female: 48.6, other: 0.2 },
        { year: '2025', male: 51.1, female: 48.7, other: 0.2 },
    ];

    // 4. Urban vs Rural Population Shift
    const urbanRuralData = [
        { year: '2011', urban: 31.2, rural: 68.8 },
        { year: '2013', urban: 32.8, rural: 67.2 },
        { year: '2015', urban: 34.1, rural: 65.9 },
        { year: '2017', urban: 35.6, rural: 64.4 },
        { year: '2019', urban: 37.2, rural: 62.8 },
        { year: '2021', urban: 38.9, rural: 61.1 },
        { year: '2023', urban: 40.5, rural: 59.5 },
        { year: '2025', urban: 42.0, rural: 58.0 },
    ];

    // 5. Aadhaar Coverage by Age Group
    const aadhaarCoverageData = [
        { ageGroup: '0-14', coverage: 92.5 },
        { ageGroup: '15-35', coverage: 99.8 },
        { ageGroup: '36-59', coverage: 99.6 },
        { ageGroup: '60+', coverage: 97.2 },
    ];

    // 6. AI-Generated Insights
    const aiInsights = [
        {
            icon: Target,
            title: "Working-Age Population Peak",
            insight: "India's working-age population projected to peak around 2032, creating a demographic dividend window",
            color: "blue",
        },
        {
            icon: TrendingUp,
            title: "Urbanization Acceleration",
            insight: "Urban population share increasing at 1.5% annually, shifting policy focus to urban infrastructure",
            color: "green",
        },
        {
            icon: Award,
            title: "Universal Aadhaar Coverage",
            insight: "99.8% coverage achieved for 15-35 age group, highest saturation globally for digital identity",
            color: "purple",
        },
        {
            icon: AlertCircle,
            title: "Aging Population Trend",
            insight: "Southern regions showing aging population trends, requiring healthcare infrastructure planning",
            color: "orange",
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">National Demographic Intelligence</h1>
                    <p className="text-muted-foreground mt-1">National-level demographic trends and population coverage analysis</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Population</p>
                                    <p className="text-2xl font-bold">1.42B</p>
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
                                    <p className="text-2xl font-bold">99.8%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">States Covered</p>
                                    <p className="text-2xl font-bold">36</p>
                                </div>
                                <Globe className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Daily Updates</p>
                                    <p className="text-2xl font-bold">2.8M</p>
                                </div>
                                <Calendar className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Demographic Trends Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Demographic Trends & Intelligence</CardTitle>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Aggregated Data Only
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Row 1: Population Growth + Age Distribution */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 1. Population Growth Trend */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Population Growth Trend (2011-2035)</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={populationGrowthData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="year"
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[1.1, 1.6]}
                                            tickFormatter={(value) => `${value}B`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value: number) => [`${value.toFixed(2)} billion`, 'Population']}
                                        />
                                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                                        <Line
                                            type="monotone"
                                            dataKey="population"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3b82f6', r: 4 }}
                                            name="Total Population"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    National population growth rate stabilizing in recent years • Projection based on current trends
                                </p>
                            </div>

                            {/* 2. Age Group Distribution */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Age Group Distribution</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={ageDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="value"
                                            label={({ value }) => `${value}%`}
                                            labelLine={false}
                                        >
                                            {ageDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value: number) => [`${value}%`, '']}
                                        />
                                        <Legend
                                            wrapperStyle={{ fontSize: '11px' }}
                                            layout="vertical"
                                            align="right"
                                            verticalAlign="middle"
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Youth population (15-35) remains the dominant demographic group at 41.2%
                                </p>
                            </div>
                        </div>

                        {/* Row 2: Gender Ratio + Urban/Rural Shift */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 3. Gender Ratio Trend */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Gender Ratio Trend (Year-wise)</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={genderRatioData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="year"
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[0, 100]}
                                            tickFormatter={(value) => `${value}%`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value: number) => [`${value}%`, '']}
                                        />
                                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                                        <Bar dataKey="male" stackId="a" fill="#60a5fa" name="Male" />
                                        <Bar dataKey="female" stackId="a" fill="#f472b6" name="Female" />
                                        <Bar dataKey="other" stackId="a" fill="#a78bfa" name="Other" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Gender ratio showing gradual improvement • Female population percentage increasing
                                </p>
                            </div>

                            {/* 4. Urban vs Rural Population Shift */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Urban vs Rural Population Shift</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={urbanRuralData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="year"
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[0, 100]}
                                            tickFormatter={(value) => `${value}%`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value: number) => [`${value}%`, '']}
                                        />
                                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                                        <Area
                                            type="monotone"
                                            dataKey="urban"
                                            stackId="1"
                                            stroke="#3b82f6"
                                            fill="#3b82f6"
                                            fillOpacity={0.6}
                                            name="Urban Population"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="rural"
                                            stackId="1"
                                            stroke="#10b981"
                                            fill="#10b981"
                                            fillOpacity={0.6}
                                            name="Rural Population"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Urban population share increasing steadily over the last decade (31% → 42%)
                                </p>
                            </div>
                        </div>

                        {/* Row 3: Aadhaar Coverage */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 5. Aadhaar Coverage by Demographic Group */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Aadhaar Coverage by Age Group</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={aadhaarCoverageData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="ageGroup"
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            domain={[85, 100]}
                                            tickFormatter={(value) => `${value}%`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value: number) => [`${value}%`, 'Coverage']}
                                        />
                                        <Bar
                                            dataKey="coverage"
                                            radius={[4, 4, 0, 0]}
                                            label={{ position: 'top', fontSize: 11, fill: '#666' }}
                                        >
                                            {aadhaarCoverageData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.coverage >= 95 ? '#10b981' : '#f59e0b'}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <Shield className="w-4 h-4 text-green-600" />
                                    <p className="text-xs text-muted-foreground">
                                        Aggregated coverage data • No individual records used • Green indicates &gt;95% coverage
                                    </p>
                                </div>
                            </div>

                            {/* Placeholder for visual balance */}
                            <div className="flex items-center justify-center">
                                <div className="text-center space-y-3 p-6">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                        <TrendingUp className="w-8 h-8 text-primary" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">High Coverage Achievement</h4>
                                    <p className="text-sm text-muted-foreground max-w-xs">
                                        All demographic groups exceed 92% Aadhaar coverage, with working-age population achieving near-universal saturation
                                    </p>
                                    <Badge className="bg-green-600">Universal Coverage Achieved</Badge>
                                </div>
                            </div>
                        </div>

                        {/* Row 4: AI-Generated Insights */}
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4">AI-Generated Demographic Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {aiInsights.map((insight, index) => (
                                    <Card key={index} className="border-l-4" style={{
                                        borderLeftColor:
                                            insight.color === 'blue' ? '#3b82f6' :
                                                insight.color === 'green' ? '#10b981' :
                                                    insight.color === 'purple' ? '#8b5cf6' : '#f59e0b'
                                    }}>
                                        <CardContent className="pt-5">
                                            <div className="flex items-start gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${insight.color === 'blue' ? 'bg-blue-100' :
                                                        insight.color === 'green' ? 'bg-green-100' :
                                                            insight.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                                                    }`}>
                                                    <insight.icon className={`w-5 h-5 ${insight.color === 'blue' ? 'text-blue-600' :
                                                            insight.color === 'green' ? 'text-green-600' :
                                                                insight.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h4>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">{insight.insight}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default NationalDemographics;
