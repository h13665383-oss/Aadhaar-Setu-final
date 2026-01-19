import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle2, Clock, TrendingUp, Shield, Zap, Target } from 'lucide-react';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';

export const NationalPerformance: React.FC = () => {
    // ========================================
    // DATA LAYER - Aggregated Service Metrics
    // ========================================

    // 1. Service Request Volume Trend (Monthly)
    const requestVolumeData = [
        { month: 'Jan', requests: 385000 },
        { month: 'Feb', requests: 420000 },
        { month: 'Mar', requests: 465000 },
        { month: 'Apr', requests: 490000 },
        { month: 'May', requests: 520000 },
        { month: 'Jun', requests: 545000 },
        { month: 'Jul', requests: 580000 },
        { month: 'Aug', requests: 610000 },
        { month: 'Sep', requests: 595000 },
        { month: 'Oct', requests: 625000 },
        { month: 'Nov', requests: 650000 },
        { month: 'Dec', requests: 680000 },
    ];

    // 2. Service-wise Success vs Failure Rate
    const servicePerformanceData = [
        { service: 'Authentication', success: 99.2, failure: 0.8 },
        { service: 'e-KYC', success: 98.8, failure: 1.2 },
        { service: 'Enrollment Update', success: 96.5, failure: 3.5 },
        { service: 'Demographic Update', success: 95.8, failure: 4.2 },
    ];



    // 4. SLA Compliance Trend (Monthly %)
    const slaComplianceData = [
        { month: 'Jan', compliance: 96.5, benchmark: 95 },
        { month: 'Feb', compliance: 97.2, benchmark: 95 },
        { month: 'Mar', compliance: 96.8, benchmark: 95 },
        { month: 'Apr', compliance: 97.5, benchmark: 95 },
        { month: 'May', compliance: 98.1, benchmark: 95 },
        { month: 'Jun', compliance: 97.9, benchmark: 95 },
        { month: 'Jul', compliance: 98.3, benchmark: 95 },
        { month: 'Aug', compliance: 98.5, benchmark: 95 },
        { month: 'Sep', compliance: 98.2, benchmark: 95 },
        { month: 'Oct', compliance: 98.7, benchmark: 95 },
        { month: 'Nov', compliance: 98.9, benchmark: 95 },
        { month: 'Dec', compliance: 99.1, benchmark: 95 },
    ];

    // 5. AI-Generated Performance Insights
    const performanceInsights = [
        {
            icon: TrendingUp,
            title: "Processing Time Improved",
            insight: "Average processing time reduced by 18% compared to previous quarter through automation",
            color: "green",
        },
        {
            icon: Zap,
            title: "Service Reliability Enhanced",
            insight: "Authentication and e-KYC services maintain >98% success rate after infrastructure optimization",
            color: "blue",
        },
        {
            icon: Target,
            title: "SLA Excellence Achieved",
            insight: "99.1% SLA compliance in December - highest recorded, 4.1% above national benchmark",
            color: "purple",
        },

    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Service Performance Metrics</h1>
                    <p className="text-muted-foreground mt-1">National service metrics, SLA compliance, and quality indicators</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">SLA Compliance</p>
                                    <p className="text-2xl font-bold">98.5%</p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                                    <p className="text-2xl font-bold">2.1h</p>
                                </div>
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Success Rate</p>
                                    <p className="text-2xl font-bold">97.2%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Services</p>
                                    <p className="text-2xl font-bold">54,320</p>
                                </div>
                                <Activity className="w-8 h-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Details Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Performance Details</CardTitle>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Aggregated at National Level
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Row 1: Request Volume + Success/Failure Rates */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 1. Service Request Volume Trend */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Service Request Volume Trend</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={requestVolumeData}>
                                        <defs>
                                            <linearGradient id="requestGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis
                                            dataKey="month"
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
                                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }}
                                            formatter={(value: number) => [value.toLocaleString(), 'Requests']}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="requests"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            fill="url(#requestGradient)"
                                            name="Total Requests"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    National service demand shows steady growth with predictable seasonal peaks
                                </p>
                            </div>

                            {/* 2. Service-wise Success vs Failure Rate */}
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4">Service-wise Success vs Failure Rate</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={servicePerformanceData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                        <XAxis
                                            type="number"
                                            domain={[0, 100]}
                                            stroke="#888"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}%`}
                                        />
                                        <YAxis
                                            type="category"
                                            dataKey="service"
                                            stroke="#888"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            width={120}
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
                                        <Bar dataKey="success" stackId="a" fill="#10b981" name="Success Rate" />
                                        <Bar dataKey="failure" stackId="a" fill="#ef4444" name="Failure Rate" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Authentication and e-KYC services maintain the highest success rates nationwide
                                </p>
                            </div>
                        </div>

                        {/* 2. SLA Compliance Trend (Full Width) */}
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4">SLA Compliance Trend</h3>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={slaComplianceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis
                                        dataKey="month"
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
                                        domain={[93, 100]}
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
                                    <ReferenceLine
                                        y={95}
                                        stroke="#f59e0b"
                                        strokeDasharray="5 5"
                                        strokeWidth={2}
                                        label={{
                                            value: 'SLA Benchmark (95%)',
                                            position: 'insideBottomRight',
                                            fontSize: 10,
                                            fill: '#f59e0b'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="compliance"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10b981', r: 4 }}
                                        activeDot={{ r: 6 }}
                                        name="SLA Compliance"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                                SLA compliance remains consistently above national benchmarks (95%)
                            </p>
                        </div>

                        {/* Row 3: AI-Generated Performance Insights */}
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4">AI-Generated Performance Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {performanceInsights.map((insight, index) => (
                                    <Card
                                        key={index}
                                        className="border-l-4"
                                        style={{
                                            borderLeftColor:
                                                insight.color === 'blue' ? '#3b82f6' :
                                                    insight.color === 'green' ? '#10b981' :
                                                        insight.color === 'purple' ? '#8b5cf6' : '#f59e0b'
                                        }}
                                    >
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

                        {/* Privacy Notice */}
                        <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-muted/50 border border-border">
                            <Shield className="w-4 h-4 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                                All metrics are aggregated at national level • No personal information is displayed
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default NationalPerformance;
