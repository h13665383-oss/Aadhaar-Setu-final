import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';

const stateData = [
    { name: 'Maharashtra', coverage: 99.2, disparity: 'Low', trend: 'up' },
    { name: 'Uttar Pradesh', coverage: 98.8, disparity: 'Medium', trend: 'up' },
    { name: 'Karnataka', coverage: 99.5, disparity: 'Low', trend: 'stable' },
    { name: 'Bihar', coverage: 96.5, disparity: 'High', trend: 'up' },
    { name: 'West Bengal', coverage: 97.8, disparity: 'Medium', trend: 'stable' },
];

export const NationalDisparity: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Regional Disparity Analysis</h1>
                    <p className="text-muted-foreground mt-1">State-wise comparison and equity analysis</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">High Disparity States</p>
                                    <p className="text-2xl font-bold">5</p>
                                </div>
                                <Globe className="w-8 h-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Medium Disparity</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <Globe className="w-8 h-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Low Disparity</p>
                                    <p className="text-2xl font-bold">19</p>
                                </div>
                                <Globe className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>State-wise Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {stateData.map((state, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                                    <div className="flex items-center gap-3">
                                        {state.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-muted-foreground" />}
                                        <span className="font-medium">{state.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm">{state.coverage}% coverage</span>
                                        <Badge variant={state.disparity === 'Low' ? 'default' : state.disparity === 'Medium' ? 'secondary' : 'destructive'}>
                                            {state.disparity} Disparity
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default NationalDisparity;
