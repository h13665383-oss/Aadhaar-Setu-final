import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, MapPin, Clock, CheckCircle2, User } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const centers = [
  { id: '1', name: 'Central Post Office, MG Road', distance: '2.3 km', slots: 12 },
  { id: '2', name: 'CSC Kendra, Sector 15', distance: '4.1 km', slots: 8 },
  { id: '3', name: 'Bank of India Branch, Main Market', distance: '5.7 km', slots: 15 },
  { id: '4', name: 'Block Office, Civil Lines', distance: '7.2 km', slots: 6 },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

export const PublicAppointments: React.FC = () => {
  const { bookAppointment, addNotification } = useData();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [booked, setBooked] = useState(false);
  const [userName, setUserName] = useState('');

  const handleBook = () => {
    if (!serviceType || !selectedCenter || !selectedSlot || !date) return;

    const centerName = centers.find(c => c.id === selectedCenter)?.name || 'Unknown Center';

    // Create new appointment for global state
    bookAppointment({
      name: userName || 'Anonymous User',
      date: date.toLocaleDateString(),
      time: selectedSlot,
      center: centerName,
      type: serviceType === 'new' ? 'New Enrollment' : 'Update'
    });

    setBooked(true);
    // Notification handled by context, but we can add UI success state here
  };

  if (booked) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh] animate-in zoom-in-50 duration-500">
          <Card className="w-full max-w-md text-center border-green-200 bg-green-50/50">
            <CardContent className="pt-10 pb-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Appointment Booked!</h2>
              <p className="text-muted-foreground mb-6">Your appointment has been confirmed and synced to the Block Office.</p>
              <div className="bg-white/80 rounded-lg p-4 text-left space-y-2 border border-green-100 shadow-sm">
                <p className="text-sm"><strong>Name:</strong> {userName || 'Anonymous User'}</p>
                <p className="text-sm"><strong>Center:</strong> {centers.find(c => c.id === selectedCenter)?.name}</p>
                <p className="text-sm"><strong>Date:</strong> {date?.toLocaleDateString()}</p>
                <p className="text-sm"><strong>Time:</strong> {selectedSlot}</p>
                <p className="text-sm"><strong>Service:</strong> {serviceType}</p>
                <p className="text-sm border-t pt-2 mt-2"><strong>Token:</strong> <span className="font-mono text-primary">APT-2024-{Math.floor(Math.random() * 10000)}</span></p>
              </div>
              <Button className="mt-6 w-full" onClick={() => { setBooked(false); setUserName(''); }}>
                Book Another Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground mt-1">Schedule your visit to an enrollment center</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Simple User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Service</CardTitle>
                <CardDescription>Choose the type of service you need</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Enrollment</SelectItem>
                    <SelectItem value="update">Update Details</SelectItem>
                    <SelectItem value="biometric">Biometric Update</SelectItem>
                    <SelectItem value="mobile">Mobile Number Update</SelectItem>
                    <SelectItem value="address">Address Update</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Center</CardTitle>
                <CardDescription>Choose a nearby enrollment center</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {centers.map((center) => (
                  <div
                    key={center.id}
                    onClick={() => setSelectedCenter(center.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedCenter === center.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border hover:border-primary/50'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{center.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {center.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {center.slots} slots available
                          </span>
                        </div>
                      </div>
                      {selectedCenter === center.id && (
                        <CheckCircle2 className="w-5 h-5 text-primary animate-in zoom-in" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Time Slot</CardTitle>
                <CardDescription>Choose a convenient time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSlot(slot)}
                      className="text-xs"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar & Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full flex justify-center"
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>

            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">User</span>
                  <span className="font-medium max-w-[150px] truncate">{userName || 'Not provided'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{serviceType || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{date?.toLocaleDateString() || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedSlot || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Center</span>
                  <span className="font-medium text-right max-w-[150px] truncate">
                    {centers.find(c => c.id === selectedCenter)?.name || 'Not selected'}
                  </span>
                </div>
                <hr className="my-4" />
                <Button
                  className="w-full"
                  disabled={!serviceType || !selectedCenter || !selectedSlot || !date || !userName}
                  onClick={handleBook}
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PublicAppointments;
