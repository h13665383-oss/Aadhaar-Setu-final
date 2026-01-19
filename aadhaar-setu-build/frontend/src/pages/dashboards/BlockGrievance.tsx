import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, AlertTriangle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const grievances = [
    {
        id: 'GRV-2024-001',
        category: 'Appointment Delay',
        description: 'Long waiting time despite booking',
        center: 'Bank Branch - Civil Lines',
        status: 'Open',
        priority: 'High',
        submittedDate: '2024-01-15',
        daysOpen: 1,
    },
    {
        id: 'GRV-2024-002',
        category: 'Document Issue',
        description: 'Address proof not accepted',
        center: 'CSC Kendra - Sector 1',
        status: 'In Progress',
        priority: 'Medium',
        submittedDate: '2024-01-14',
        daysOpen: 2,
    },
    {
        id: 'GRV-2024-003',
        category: 'Staff Behavior',
        description: 'Rude operator behavior',
        center: 'Post Office - Main Market',
        status: 'Resolved',
        priority: 'High',
        submittedDate: '2024-01-12',
        daysOpen: 4,
    },
    {
        id: 'GRV-2024-004',
        category: 'Technical Issue',
        description: 'Biometric device not working',
        center: 'Mobile Camp - Village A',
        status: 'Escalated',
        priority: 'Critical',
        submittedDate: '2024-01-13',
        daysOpen: 3,
    },
    {
        id: 'GRV-2024-005',
        category: 'Service Quality',
        description: 'Incomplete enrollment process',
        center: 'Bank Branch - Civil Lines',
        status: 'Open',
        priority: 'Medium',
        submittedDate: '2024-01-15',
        daysOpen: 1,
    },
];

const categoryStats = [
    { category: 'Appointment Delay', count: 8, trend: 'up' },
    { category: 'Document Issue', count: 5, trend: 'down' },
    { category: 'Staff Behavior', count: 3, trend: 'stable' },
    { category: 'Technical Issue', count: 6, trend: 'up' },
    { category: 'Service Quality', count: 4, trend: 'down' },
];

export const BlockGrievance: React.FC = () => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Resolved': return <Badge className="bg-green-600">Resolved</Badge>;
            case 'In Progress': return <Badge variant="secondary">In Progress</Badge>;
            case 'Escalated': return <Badge variant="destructive">Escalated</Badge>;
            default: return <Badge variant="outline">Open</Badge>;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'Critical': return <Badge variant="destructive">Critical</Badge>;
            case 'High': return <Badge className="bg-orange-600">High</Badge>;
            case 'Medium': return <Badge variant="secondary">Medium</Badge>;
            default: return <Badge variant="outline">Low</Badge>;
        }
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'up') return <TrendingUp className="w-4 h-4 text-red-600" />;
        if (trend === 'down') return <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />;
        return <span className="w-4 h-4 text-muted-foreground">→</span>;
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Grievance Summary</h1>
                    <p className="text-muted-foreground mt-1">Track and manage citizen grievances and complaints</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Grievances</p>
                                    <p className="text-2xl font-bold">26</p>
                                </div>
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Open</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <AlertTriangle className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Resolved</p>
                                    <p className="text-2xl font-bold">9</p>
                                </div>
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                                    <p className="text-2xl font-bold">3.2d</p>
                                </div>
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Category Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Category Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {categoryStats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                                        <div className="flex items-center gap-2 flex-1">
                                            {getTrendIcon(stat.trend)}
                                            <span className="text-sm">{stat.category}</span>
                                        </div>
                                        <Badge variant="outline">{stat.count}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Grievances */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Recent Grievances</CardTitle>
                                <Button size="sm" variant="outline">View All</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {grievances.map((grievance) => (
                                    <div
                                        key={grievance.id}
                                        className="flex items-start gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium text-sm">{grievance.id}</span>
                                                        {getPriorityBadge(grievance.priority)}
                                                        {getStatusBadge(grievance.status)}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">{grievance.center}</p>
                                                </div>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {grievance.daysOpen}d open
                                                </span>
                                            </div>

                                            <p className="text-sm mb-1"><strong>{grievance.category}:</strong> {grievance.description}</p>

                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                <span>Submitted: {grievance.submittedDate}</span>
                                            </div>
                                        </div>

                                        <Button size="sm" variant="outline">
                                            View
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Required */}
                <Card className="border-red-600/20 bg-red-600/5">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            Action Required
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">2 grievances pending for more than 5 days</p>
                                    <p className="text-xs text-muted-foreground mt-1">Requires immediate attention to meet SLA</p>
                                </div>
                                <Button size="sm" variant="destructive">
                                    Review Now
                                </Button>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">1 critical grievance escalated to district level</p>
                                    <p className="text-xs text-muted-foreground mt-1">Technical issue at Mobile Camp - Village A</p>
                                </div>
                                <Button size="sm" variant="outline">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default BlockGrievance;
