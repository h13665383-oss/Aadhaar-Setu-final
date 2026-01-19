import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, Clock, MapPin, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const mockAppointments = [
  {
    id: 'APT-2024-1234',
    service: 'Biometric Update',
    center: 'Central Post Office, MG Road',
    date: '2024-02-15',
    time: '10:30 AM',
    status: 'Completed',
  },
  {
    id: 'APT-2024-1567',
    service: 'Address Update',
    center: 'CSC Kendra, Sector 15',
    date: '2024-02-20',
    time: '02:00 PM',
    status: 'Upcoming',
  },
  {
    id: 'APT-2024-1890',
    service: 'Mobile Update',
    center: 'Bank of India Branch',
    date: '2024-01-28',
    time: '11:00 AM',
    status: 'Cancelled',
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ElementType }> = {
    Completed: { variant: 'default', icon: CheckCircle2 },
    Upcoming: { variant: 'secondary', icon: Clock },
    Cancelled: { variant: 'destructive', icon: XCircle },
    Pending: { variant: 'outline', icon: AlertCircle },
  };

  const { variant, icon: Icon } = variants[status] || variants.Pending;

  return (
    <Badge variant={variant} className="flex items-center gap-1 w-fit">
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
};

export const PublicMyAppointments: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground mt-1">View and manage your scheduled appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <CalendarCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Total Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-info/10">
                  <Clock className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments.map((apt) => (
                <div 
                  key={apt.id} 
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{apt.service}</span>
                        <StatusBadge status={apt.status} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {apt.center}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarCheck className="w-4 h-4" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Token</p>
                      <p className="font-mono text-sm font-medium">{apt.id}</p>
                    </div>
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

export default PublicMyAppointments;
