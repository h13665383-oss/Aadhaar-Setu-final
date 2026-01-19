import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarCheck, Clock, Users, TrendingUp, AlertCircle } from 'lucide-react';

const appointmentData = [
    { time: '09:00 AM', center: 'CSC Kendra - Sector 1', booked: 8, capacity: 10 },
    { time: '10:00 AM', center: 'CSC Kendra - Sector 1', booked: 10, capacity: 10 },
    { time: '11:00 AM', center: 'CSC Kendra - Sector 1', booked: 7, capacity: 10 },
    { time: '12:00 PM', center: 'Post Office - Main Market', booked: 6, capacity: 8 },
    { time: '01:00 PM', center: 'Post Office - Main Market', booked: 8, capacity: 8 },
    { time: '02:00 PM', center: 'Bank Branch - Civil Lines', booked: 12, capacity: 12 },
    { time: '03:00 PM', center: 'Bank Branch - Civil Lines', booked: 10, capacity: 12 },
    { time: '04:00 PM', center: 'Mobile Camp - Village B', booked: 5, capacity: 6 },
];

export const BlockAppointments: React.FC = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const getUtilizationColor = (booked: number, capacity: number) => {
        const percentage = (booked / capacity) * 100;
        if (percentage >= 100) return 'bg-red-600';
        if (percentage >= 80) return 'bg-yellow-600';
        return 'bg-green-600';
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Appointment & Queue Management</h1>
                    <p className="text-muted-foreground mt-1">Monitor appointment load and queue status across centers</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Today's Appointments</p>
                                    <p className="text-2xl font-bold">156</p>
                                </div>
                                <CalendarCheck className="w-8 h-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Walk-ins</p>
                                    <p className="text-2xl font-bold">42</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                                    <p className="text-2xl font-bold">18 min</p>
                                </div>
                                <Clock className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Utilization Rate</p>
                                    <p className="text-2xl font-bold">87%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Select Date</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Selected Date:</span>
                                    <span className="font-medium">{date?.toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Total Slots:</span>
                                    <span className="font-medium">200</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Booked:</span>
                                    <span className="font-medium">156</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Available:</span>
                                    <span className="font-medium text-green-600">44</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Time Slot Schedule */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Today's Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {appointmentData.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="flex items-center gap-2 min-w-[100px]">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-medium">{slot.time}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{slot.center}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right min-w-[80px]">
                                                <p className="text-sm font-medium">{slot.booked} / {slot.capacity}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {Math.round((slot.booked / slot.capacity) * 100)}% filled
                                                </p>
                                            </div>
                                            <div className="w-24 bg-muted rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${getUtilizationColor(slot.booked, slot.capacity)}`}
                                                    style={{ width: `${(slot.booked / slot.capacity) * 100}%` }}
                                                />
                                            </div>
                                            {slot.booked >= slot.capacity && (
                                                <Badge variant="destructive" className="ml-2">Full</Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Queue Alerts */}
                <Card className="border-yellow-600/20 bg-yellow-600/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            Queue Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">High queue at Bank Branch - Civil Lines</p>
                                    <p className="text-xs text-muted-foreground mt-1">24 people waiting, avg wait time: 35 minutes</p>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto">
                                    View Details
                                </Button>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Low utilization at Post Office - Main Market</p>
                                    <p className="text-xs text-muted-foreground mt-1">Only 45% slots filled for afternoon slots</p>
                                </div>
                                <Button size="sm" variant="outline" className="ml-auto">
                                    Adjust Schedule
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default BlockAppointments;
