import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Send, Search, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

const mockGrievances = [
  {
    id: 'GRV-2024-5678',
    subject: 'Delayed enrollment update',
    category: 'Service Delay',
    status: 'In Progress',
    date: '2024-02-10',
    lastUpdate: '2024-02-12',
  },
  {
    id: 'GRV-2024-4321',
    subject: 'Biometric rejection issue',
    category: 'Technical Issue',
    status: 'Resolved',
    date: '2024-01-25',
    lastUpdate: '2024-02-01',
  },
  {
    id: 'GRV-2024-9999',
    subject: 'Wrong information printed',
    category: 'Data Correction',
    status: 'Pending',
    date: '2024-02-14',
    lastUpdate: '2024-02-14',
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    Resolved: 'default',
    'In Progress': 'secondary',
    Pending: 'outline',
    Rejected: 'destructive',
  };

  return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
};

export const PublicGrievance: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [trackId, setTrackId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Complaints & Grievance</h1>
          <p className="text-muted-foreground mt-1">Raise or track your complaints and grievances</p>
        </div>

        <Tabs defaultValue="raise" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="raise">Raise Grievance</TabsTrigger>
            <TabsTrigger value="track">Track Status</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="raise" className="mt-6">
            {submitted ? (
              <Card className="max-w-xl">
                <CardContent className="pt-10 pb-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Grievance Submitted!</h2>
                  <p className="text-muted-foreground mb-6">Your complaint has been registered (mock)</p>
                  <div className="bg-muted/50 rounded-lg p-4 text-left">
                    <p className="text-sm"><strong>Grievance ID:</strong> GRV-2024-{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-sm mt-1"><strong>Category:</strong> {category}</p>
                    <p className="text-sm mt-1"><strong>Subject:</strong> {subject}</p>
                  </div>
                  <Button className="mt-6" onClick={() => setSubmitted(false)}>
                    Raise Another Grievance
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Submit a Grievance
                  </CardTitle>
                  <CardDescription>
                    Fill in the details below to register your complaint
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Service Delay">Service Delay</SelectItem>
                          <SelectItem value="Technical Issue">Technical Issue</SelectItem>
                          <SelectItem value="Data Correction">Data Correction</SelectItem>
                          <SelectItem value="Staff Behavior">Staff Behavior</SelectItem>
                          <SelectItem value="Infrastructure">Infrastructure Issue</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief subject of your complaint"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your issue in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Grievance
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="track" className="mt-6">
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Track Grievance Status
                </CardTitle>
                <CardDescription>
                  Enter your grievance ID to check the current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Grievance ID (e.g., GRV-2024-5678)"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                  />
                  <Button>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                {trackId && (
                  <div className="mt-6 p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-sm text-muted-foreground">{trackId}</p>
                        <h4 className="font-medium text-foreground mt-1">Delayed enrollment update</h4>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Submitted: 2024-02-10</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                        <span>Last Update: 2024-02-12</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
                      <p className="font-medium">Status Note:</p>
                      <p className="text-muted-foreground mt-1">
                        Your grievance is being reviewed by the concerned authority. 
                        Expected resolution within 7 working days.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Grievance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGrievances.map((grv) => (
                    <div 
                      key={grv.id} 
                      className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-muted-foreground">{grv.id}</span>
                            <StatusBadge status={grv.status} />
                          </div>
                          <h4 className="font-medium text-foreground mt-1">{grv.subject}</h4>
                          <p className="text-sm text-muted-foreground mt-1">Category: {grv.category}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>Filed: {grv.date}</p>
                          <p>Updated: {grv.lastUpdate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PublicGrievance;
