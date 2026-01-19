import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const districtData = [
    { name: 'District A - Capital', performance: 95, enrollments: 485200, status: 'Excellent', trend: 'up' },
    { name: 'District B - North', performance: 88, enrollments: 412300, status: 'Good', trend: 'up' },
    { name: 'District C - South', performance: 82, enrollments: 398500, status: 'Good', trend: 'stable' },
    { name: 'District D - East', performance: 76, enrollments: 356800, status: 'Average', trend: 'down' },
    { name: 'District E - West', performance: 71, enrollments: 334200, status: 'Average', trend: 'stable' },
    { name: 'District F - Rural North', performance: 65, enrollments: 298400, status: 'Needs Attention', trend: 'down' },
    { name: 'District G - Rural South', performance: 58, enrollments: 267100, status: 'Critical', trend: 'down' },
];

export const StateDistrictHeatmap: React.FC = () => {
    const getPerformanceColor = (performance: number) => {
        if (performance >= 90) return 'bg-green-600';
        if (performance >= 80) return 'bg-blue-600';
        if (performance >= 70) return 'bg-yellow-600';
        if (performance >= 60) return 'bg-orange-600';
        return 'bg-red-600';
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
        if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">District Performance Heatmap</h1>
                    <p className="text-muted-foreground mt-1">Geographic visualization of district-level performance metrics</p>
                </div>

                {/* Performance Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle>District Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {districtData.map((district, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-primary" />
                                                <h3 className="font-semibold">{district.name}</h3>
                                            </div>
                                            {getTrendIcon(district.trend)}
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm text-muted-foreground">Performance Score</span>
                                                    <span className="text-lg font-bold">{district.performance}%</span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${getPerformanceColor(district.performance)}`}
                                                        style={{ width: `${district.performance}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Enrollments</span>
                                                <span className="font-medium">{district.enrollments.toLocaleString()}</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Status</span>
                                                <Badge variant={district.performance >= 80 ? 'default' : district.performance >= 60 ? 'secondary' : 'destructive'}>
                                                    {district.status}
                                                </Badge>
                                            </div>

                                            <Button size="sm" variant="outline" className="w-full mt-2">
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle>Geographic Heatmap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">Interactive map visualization coming soon</p>
                                <p className="text-sm text-muted-foreground mt-2">Will show color-coded district performance on state map</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default StateDistrictHeatmap;
