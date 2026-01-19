import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    User,
    Mail,
    MapPin,
    Shield,
    Calendar,
    Phone,
    CreditCard,
    Briefcase,
    CheckCircle2
} from 'lucide-react';

const UserProfile: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    // Generate mock Aadhaar number (masked)
    const mockAadhaar = `XXXX XXXX ${Math.floor(1000 + Math.random() * 9000)}`;

    // Generate mock mobile (masked)
    const mockMobile = `+91 XXXXX ${Math.floor(10000 + Math.random() * 90000)}`;

    // Generate registration date (mock - use localStorage or current date)
    const registrationDate = localStorage.getItem('userRegistrationDate') || new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Format role display
    const roleDisplayNames: Record<string, string> = {
        public: 'Public Citizen',
        block: 'Block Officer',
        district: 'District Officer',
        state: 'State Officer',
        national: 'National Administrator'
    };

    const roleDisplay = roleDisplayNames[user.role] || user.role;

    // Build location string
    const locationParts = [user.block, user.district, user.state].filter(Boolean);
    const fullLocation = user.location || locationParts.join(', ') || 'Not specified';

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">User Profile</h1>
                    <p className="text-muted-foreground">
                        View your account information and registration details
                    </p>
                </div>

                {/* Main Profile Card */}
                <Card>
                    <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                        <Badge variant="secondary" className="font-medium">
                                            {roleDisplay}
                                        </Badge>
                                    </CardDescription>
                                </div>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Active
                            </Badge>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                    <p className="text-base text-foreground truncate">{user.email}</p>
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground">Mobile Number</p>
                                    <p className="text-base text-foreground font-mono">{mockMobile}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Masked for privacy</p>
                                </div>
                            </div>

                            {/* Aadhaar */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground">Aadhaar Number</p>
                                    <p className="text-base text-foreground font-mono">{mockAadhaar}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Masked for privacy</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                                    <p className="text-base text-foreground">{fullLocation}</p>
                                </div>
                            </div>

                            {/* Designation (if exists) */}
                            {user.designation && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-muted-foreground">Designation</p>
                                        <p className="text-base text-foreground">{user.designation}</p>
                                    </div>
                                </div>
                            )}

                            {/* Registration Date */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                                    <p className="text-base text-foreground">{registrationDate}</p>
                                </div>
                            </div>

                            {/* Account Type */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                                    <p className="text-base text-foreground">{roleDisplay}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy Notice */}
                <Card className="border-success/30 bg-success/5">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-success mb-1">Privacy Protected</p>
                                <p className="text-sm text-muted-foreground">
                                    Sensitive information like Aadhaar and mobile numbers are masked for your security.
                                    This is a demo account with no real personal data stored.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default UserProfile;
