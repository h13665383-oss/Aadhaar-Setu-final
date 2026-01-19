import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

const blockPerformance = [
    { name: 'Block A - Central', enrollments: 52340, target: 50000, centers: 15, utilization: 92, grievances: 12, status: 'Excellent' },
    { name: 'Block B - North', enrollments: 48520, target: 50000, centers: 12, utilization: 87, grievances: 23, status: 'Good' },
    { name: 'Block C - South', enrollments: 45200, target: 50000, centers: 14, utilization: 78, grievances: 18, status: 'Average' },
    { name: 'Block D - East', enrollments: 38900, target: 50000, centers: 10, utilization: 65, grievances: 34, status: 'Needs Attention' },
    { name: 'Block E - West', enrollments: 42100, target: 50000, centers: 11, utilization: 72, grievances: 28, status: 'Average' },
    { name: 'Block F - Rural North', enrollments: 35600, target: 50000, centers: 9, utilization: 58, grievances: 45, status: 'Critical' },
    { name: 'Block G - Rural South', enrollments: 39800, target: 50000, centers: 10, utilization: 68, grievances: 31, status: 'Needs Attention' },
];

export const DistrictBlockPerformance: React.FC = () => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Excellent': return <Badge className="bg-green-600">Excellent</Badge>;
            case 'Good': return <Badge className="bg-blue-600">Good</Badge>;
            case 'Average': return <Badge variant="secondary">Average</Badge>;
            case 'Needs Attention': return <Badge className="bg-orange-600">Needs Attention</Badge>;
            case 'Critical': return <Badge variant="destructive">Critical</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getPerformanceIcon = (enrollments: number, target: number) => {
        const percentage = (enrollments / target) * 100;
        if (percentage >= 100) return <TrendingUp className="w-5 h-5 text-green-600" />;
        if (percentage >= 80) return <Activity className="w-5 h-5 text-blue-600" />;
        return <TrendingDown className="w-5 h-5 text-orange-600" />;
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Block Performance Analysis</h1>
                    <p className="text-muted-foreground mt-1">Comparative performance metrics across all blocks in the district</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Blocks</p>
                                    <p className="text-2xl font-bold">7</p>
                                </div>
                                <Activity className="w-8 h-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">High Performers</p>
                                    <p className="text-2xl font-bold">2</p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Need Attention</p>
                                    <p className="text-2xl font-bold">3</p>
                                </div>
                                <AlertTriangle className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg Utilization</p>
                                    <p className="text-2xl font-bold">74%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Block-wise Performance Metrics</CardTitle>
                            <Button size="sm" variant="outline">Export Report</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Block Name</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Enrollments</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Target</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Achievement</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Centers</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Utilization</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Grievances</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blockPerformance.map((block, index) => {
                                        const achievement = Math.round((block.enrollments / block.target) * 100);
                                        return (
                                            <tr key={index} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        {getPerformanceIcon(block.enrollments, block.target)}
                                                        <span className="font-medium">{block.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm font-medium">{block.enrollments.toLocaleString()}</td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">{block.target.toLocaleString()}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-sm font-medium ${achievement >= 100 ? 'text-green-600' :
                                                                achievement >= 80 ? 'text-blue-600' :
                                                                    'text-orange-600'
                                                            }`}>
                                                            {achievement}%
                                                        </span>
                                                        <div className="w-16 bg-muted rounded-full h-1.5">
                                                            <div
                                                                className={`h-1.5 rounded-full ${achievement >= 100 ? 'bg-green-600' :
                                                                        achievement >= 80 ? 'bg-blue-600' :
                                                                            'bg-orange-600'
                                                                    }`}
                                                                style={{ width: `${Math.min(achievement, 100)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm">{block.centers}</td>
                                                <td className="py-3 px-4 text-sm">{block.utilization}%</td>
                                                <td className="py-3 px-4">
                                                    <Badge variant={block.grievances > 30 ? 'destructive' : 'outline'}>
                                                        {block.grievances}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {getStatusBadge(block.status)}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button size="sm" variant="outline">View Details</Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Items */}
                <Card className="border-orange-600/20 bg-orange-600/5">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            Recommended Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Block F - Rural North requires immediate intervention</p>
                                    <p className="text-xs text-muted-foreground mt-1">Only 58% utilization with 45 pending grievances. Consider deploying additional resources.</p>
                                </div>
                                <Button size="sm" variant="outline">Take Action</Button>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Block D - East underperforming on target</p>
                                    <p className="text-xs text-muted-foreground mt-1">78% target achievement. Review resource allocation and operational efficiency.</p>
                                </div>
                                <Button size="sm" variant="outline">Analyze</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default DistrictBlockPerformance;
