import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, FileText, Download } from 'lucide-react';

const alerts = [
    { id: 1, type: 'Critical', message: 'Server downtime in 3 states - immediate action required', time: '5 min ago' },
    { id: 2, type: 'Warning', message: 'High queue load in Maharashtra - consider resource reallocation', time: '15 min ago' },
    { id: 3, type: 'Info', message: 'Monthly report generated successfully', time: '1 hour ago' },
];

export const NationalAlerts: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Bell className="w-8 h-8 text-primary" />
                        Alerts & Reports
                    </h1>
                    <p className="text-muted-foreground mt-1">Critical alerts dashboard and automated reporting</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Critical Alerts</p>
                                    <p className="text-2xl font-bold">3</p>
                                </div>
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Warnings</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <Bell className="w-8 h-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Reports Generated</p>
                                    <p className="text-2xl font-bold">45</p>
                                </div>
                                <FileText className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="flex items-start justify-between p-3 rounded-lg border border-border">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className={`w-5 h-5 mt-0.5 ${alert.type === 'Critical' ? 'text-red-600' :
                                                alert.type === 'Warning' ? 'text-yellow-600' :
                                                    'text-blue-600'
                                            }`} />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant={alert.type === 'Critical' ? 'destructive' : alert.type === 'Warning' ? 'secondary' : 'outline'}>
                                                    {alert.type}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{alert.time}</span>
                                            </div>
                                            <p className="text-sm">{alert.message}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">View</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Available Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-medium">Monthly Performance Report - December 2025</p>
                                        <p className="text-xs text-muted-foreground">Generated on Jan 1, 2026</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default NationalAlerts;
