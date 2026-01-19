import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Users, Activity, AlertCircle, CheckCircle2, Clock, Phone } from 'lucide-react';

const centers = [
    {
        id: 1,
        name: 'CSC Kendra - Sector 1',
        type: 'Permanent',
        status: 'Active',
        address: 'Sector 1, Main Market',
        operator: 'Ram Kumar',
        phone: '+91 98765 43210',
        capacity: 50,
        currentLoad: 12,
        equipment: { iris: 'Working', fingerprint: 'Working', camera: 'Working' },
    },
    {
        id: 2,
        name: 'Post Office - Main Market',
        type: 'Permanent',
        status: 'Active',
        address: 'Main Market Road',
        operator: 'Sita Devi',
        phone: '+91 98765 43211',
        capacity: 40,
        currentLoad: 8,
        equipment: { iris: 'Working', fingerprint: 'Warning', camera: 'Working' },
    },
    {
        id: 3,
        name: 'Bank Branch - Civil Lines',
        type: 'Permanent',
        status: 'Busy',
        address: 'Civil Lines, Near Court',
        operator: 'Mohan Singh',
        phone: '+91 98765 43212',
        capacity: 60,
        currentLoad: 54,
        equipment: { iris: 'Working', fingerprint: 'Working', camera: 'Working' },
    },
    {
        id: 4,
        name: 'Mobile Camp - Village A',
        type: 'Camp',
        status: 'Inactive',
        address: 'Village A, Community Center',
        operator: 'Team Alpha',
        phone: '+91 98765 43213',
        capacity: 30,
        currentLoad: 0,
        equipment: { iris: 'Offline', fingerprint: 'Offline', camera: 'Offline' },
    },
    {
        id: 5,
        name: 'Mobile Camp - Village B',
        type: 'Camp',
        status: 'Active',
        address: 'Village B, School Ground',
        operator: 'Team Beta',
        phone: '+91 98765 43214',
        capacity: 30,
        currentLoad: 18,
        equipment: { iris: 'Working', fingerprint: 'Working', camera: 'Warning' },
    },
];

export const BlockCenterOperations: React.FC = () => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Busy': return 'destructive';
            case 'Inactive': return 'secondary';
            default: return 'outline';
        }
    };

    const getEquipmentIcon = (status: string) => {
        switch (status) {
            case 'Working': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
            case 'Warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
            case 'Offline': return <AlertCircle className="w-4 h-4 text-red-600" />;
            default: return null;
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Center & Camp Operations</h1>
                    <p className="text-muted-foreground mt-1">Monitor and manage all enrollment centers and mobile camps</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Centers</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <Building2 className="w-8 h-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Active Camps</p>
                                    <p className="text-2xl font-bold">3</p>
                                </div>
                                <MapPin className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Capacity</p>
                                    <p className="text-2xl font-bold">210</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Current Load</p>
                                    <p className="text-2xl font-bold">92</p>
                                </div>
                                <Activity className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Centers List */}
                <div className="grid grid-cols-1 gap-4">
                    {centers.map((center) => (
                        <Card key={center.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            {center.type === 'Camp' ? (
                                                <MapPin className="w-6 h-6 text-primary" />
                                            ) : (
                                                <Building2 className="w-6 h-6 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{center.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">{center.address}</p>
                                        </div>
                                    </div>
                                    <Badge variant={getStatusColor(center.status) as any}>
                                        {center.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Operator Info */}
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Operator</p>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">{center.operator}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{center.phone}</span>
                                        </div>
                                    </div>

                                    {/* Capacity */}
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Capacity Utilization</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{center.currentLoad} / {center.capacity}</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                                            <div
                                                className={`h-2 rounded-full ${(center.currentLoad / center.capacity) > 0.8 ? 'bg-red-600' :
                                                        (center.currentLoad / center.capacity) > 0.5 ? 'bg-yellow-600' :
                                                            'bg-green-600'
                                                    }`}
                                                style={{ width: `${(center.currentLoad / center.capacity) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Equipment Status */}
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-2">Equipment Status</p>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                {getEquipmentIcon(center.equipment.iris)}
                                                <span className="text-xs">Iris Scanner</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getEquipmentIcon(center.equipment.fingerprint)}
                                                <span className="text-xs">Fingerprint</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getEquipmentIcon(center.equipment.camera)}
                                                <span className="text-xs">Camera</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-end">
                                        <div className="space-y-2 w-full">
                                            <Button variant="outline" size="sm" className="w-full">
                                                View Details
                                            </Button>
                                            <Button variant="outline" size="sm" className="w-full">
                                                Contact Operator
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BlockCenterOperations;
