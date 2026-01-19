import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Fingerprint, Eye, Camera, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const biometricIssues = [
    {
        id: 'BIO-001',
        center: 'Bank Branch - Civil Lines',
        type: 'Fingerprint',
        issue: 'Poor quality capture - elderly citizen',
        status: 'Pending',
        timestamp: '2 hours ago',
        attempts: 3,
        severity: 'High',
    },
    {
        id: 'BIO-002',
        center: 'CSC Kendra - Sector 1',
        type: 'Iris',
        issue: 'Scanner calibration needed',
        status: 'In Progress',
        timestamp: '4 hours ago',
        attempts: 1,
        severity: 'Medium',
    },
    {
        id: 'BIO-003',
        center: 'Post Office - Main Market',
        type: 'Fingerprint',
        issue: 'Worn fingerprints - manual laborer',
        status: 'Resolved',
        timestamp: '1 day ago',
        attempts: 5,
        severity: 'High',
    },
    {
        id: 'BIO-004',
        center: 'Mobile Camp - Village B',
        type: 'Photo',
        issue: 'Lighting conditions poor',
        status: 'Pending',
        timestamp: '30 minutes ago',
        attempts: 2,
        severity: 'Low',
    },
    {
        id: 'BIO-005',
        center: 'Bank Branch - Civil Lines',
        type: 'Iris',
        issue: 'Cataract affecting scan',
        status: 'Escalated',
        timestamp: '3 hours ago',
        attempts: 4,
        severity: 'High',
    },
];

const deviceHealth = [
    { device: 'Iris Scanners', total: 12, working: 10, warning: 1, offline: 1 },
    { device: 'Fingerprint Readers', total: 12, working: 9, warning: 2, offline: 1 },
    { device: 'Cameras', total: 12, working: 11, warning: 1, offline: 0 },
];

export const BlockBiometricIssues: React.FC = () => {
    const getIssueIcon = (type: string) => {
        switch (type) {
            case 'Fingerprint': return <Fingerprint className="w-5 h-5" />;
            case 'Iris': return <Eye className="w-5 h-5" />;
            case 'Photo': return <Camera className="w-5 h-5" />;
            default: return <AlertTriangle className="w-5 h-5" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Resolved': return <Badge variant="default" className="bg-green-600">Resolved</Badge>;
            case 'In Progress': return <Badge variant="secondary">In Progress</Badge>;
            case 'Escalated': return <Badge variant="destructive">Escalated</Badge>;
            default: return <Badge variant="outline">Pending</Badge>;
        }
    };

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case 'High': return <Badge variant="destructive">High</Badge>;
            case 'Medium': return <Badge variant="secondary">Medium</Badge>;
            default: return <Badge variant="outline">Low</Badge>;
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Update & Biometric Issues</h1>
                    <p className="text-muted-foreground mt-1">Track and resolve biometric capture issues and device health</p>
                </div>

                {/* Device Health Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {deviceHealth.map((device, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="text-base">{device.device}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            <span className="text-sm">Working</span>
                                        </div>
                                        <span className="font-bold text-green-600">{device.working}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                            <span className="text-sm">Warning</span>
                                        </div>
                                        <span className="font-bold text-yellow-600">{device.warning}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <XCircle className="w-4 h-4 text-red-600" />
                                            <span className="text-sm">Offline</span>
                                        </div>
                                        <span className="font-bold text-red-600">{device.offline}</span>
                                    </div>
                                    <div className="pt-2 border-t">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Total Devices</span>
                                            <span className="font-bold">{device.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Issues List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Biometric Capture Issues</CardTitle>
                            <Button size="sm" variant="outline">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {biometricIssues.map((issue) => (
                                <div
                                    key={issue.id}
                                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        {getIssueIcon(issue.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">{issue.id}</span>
                                                    {getSeverityBadge(issue.severity)}
                                                    {getStatusBadge(issue.status)}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{issue.center}</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">{issue.timestamp}</span>
                                        </div>

                                        <p className="text-sm mb-2">{issue.issue}</p>

                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span>Type: {issue.type}</span>
                                            <span>•</span>
                                            <span>Attempts: {issue.attempts}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button size="sm" variant="outline">
                                            View Details
                                        </Button>
                                        {issue.status === 'Pending' && (
                                            <Button size="sm" variant="default">
                                                Resolve
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Resolution Guidelines */}
                <Card className="border-blue-600/20 bg-blue-600/5">
                    <CardHeader>
                        <CardTitle className="text-base">Common Resolution Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4" />
                                    Fingerprint Issues
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                                    <li>Clean scanner surface</li>
                                    <li>Ensure dry fingers</li>
                                    <li>Try alternate fingers</li>
                                    <li>Use exception handling for elderly/laborers</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Iris Scan Issues
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                                    <li>Adjust lighting conditions</li>
                                    <li>Recalibrate scanner</li>
                                    <li>Remove glasses if applicable</li>
                                    <li>Medical exception for cataracts</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default BlockBiometricIssues;
