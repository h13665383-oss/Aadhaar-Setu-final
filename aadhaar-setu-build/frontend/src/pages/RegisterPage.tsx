import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole, User as UserType } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, Mail, Lock, MapPin, Building2, ChevronRight, AlertCircle, Briefcase } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
];

// Authoritative Designation Mapping
const designationToLevelMap: Record<string, UserRole> = {
  'Block Development Officer': 'block',
  'District Collector': 'district',
  'Additional Collector': 'district',
  'Deputy Commissioner': 'district',
  'State Commissioner': 'state',
  'Joint Secretary (State)': 'state',
  'Director (State Department)': 'state',
  'Joint Secretary (Central Government)': 'national',
  'Director (Central / Ministry Level)': 'national',
};

// Initial list of designations (can be expanded dynamically)
const initialDesignations = Object.keys(designationToLevelMap);

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Public form state
  const [publicName, setPublicName] = useState('');
  const [publicEmail, setPublicEmail] = useState('');
  const [publicState, setPublicState] = useState('');
  const [publicDistrict, setPublicDistrict] = useState('');
  const [publicPassword, setPublicPassword] = useState('');
  const [publicConfirmPassword, setPublicConfirmPassword] = useState('');

  // Official form state
  const [officialName, setOfficialName] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [officialDesignation, setOfficialDesignation] = useState('');
  const [officialLevel, setOfficialLevel] = useState<UserRole>('block');
  const [officialState, setOfficialState] = useState('');
  const [officialDistrict, setOfficialDistrict] = useState('');
  const [officialBlock, setOfficialBlock] = useState('');
  const [officialPassword, setOfficialPassword] = useState('');
  const [officialConfirmPassword, setOfficialConfirmPassword] = useState('');

  // Dynamic list of designations to support fallback additions
  const [availableDesignations, setAvailableDesignations] = useState<string[]>(initialDesignations);

  // Intelligent Level Inference Logic
  const getLevelFromDesignation = (designation: string): UserRole => {
    // 1. Check strict mapping
    if (designationToLevelMap[designation]) {
      return designationToLevelMap[designation];
    }

    // 2. Keyword-based Fallback Inference
    const lower = designation.toLowerCase();
    let inferredLevel: UserRole = 'block'; // Default safe fallback

    if (lower.includes('central') || lower.includes('ministry') || lower.includes('national')) {
      inferredLevel = 'national';
    } else if (lower.includes('state') || lower.includes('secretary')) {
      inferredLevel = 'state';
    } else if (lower.includes('district') || lower.includes('collector') || lower.includes('deputy')) {
      inferredLevel = 'district';
    } else if (lower.includes('block') || lower.includes('development')) {
      inferredLevel = 'block';
    }

    // Log the inference (Simulating a backend update)
    console.log(`[System Info] New designation identified: "${designation}". Auto-assigned Level: ${inferredLevel}`);

    // Add to local map for this session (Self-correcting behavior)
    designationToLevelMap[designation] = inferredLevel;

    return inferredLevel;
  };

  // Sync Level when Designation changes
  useEffect(() => {
    if (officialDesignation) {
      const level = getLevelFromDesignation(officialDesignation);
      setOfficialLevel(level);
    }
  }, [officialDesignation]);

  // Location logic based on level
  useEffect(() => {
    if (officialLevel === 'national') {
      setOfficialState('All India');
      setOfficialDistrict('All Districts');
      setOfficialBlock('All Blocks');
    } else if (officialLevel === 'state') {
      // Clear state if it was automatically set to 'All India' previously
      if (officialState === 'All India') {
        setOfficialState('');
      }
      setOfficialDistrict('All Districts');
      setOfficialBlock('All Blocks');
    } else if (officialLevel === 'district') {
      if (officialState === 'All India') setOfficialState('');
      setOfficialBlock('All Blocks');
    } else if (officialLevel === 'block') {
      if (officialState === 'All India') setOfficialState('');
    }
  }, [officialLevel]);

  const handlePublicRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (publicPassword !== publicConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser: UserType = {
      name: publicName,
      email: publicEmail,
      role: 'public',
      state: publicState,
      district: publicDistrict,
      location: `${publicDistrict}, ${publicState}`
    };

    try {
      await register({ ...newUser, password: publicPassword });
      navigate('/dashboard/public/insights');
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  const handleOfficialRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (officialPassword !== officialConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser: UserType = {
      name: officialName,
      email: officialEmail,
      role: officialLevel,
      designation: officialDesignation,
      state: officialState,
      district: officialDistrict,
      block: officialBlock,
      location: `${officialBlock}, ${officialDistrict}, ${officialState}`
    };

    try {
      await register({ ...newUser, password: officialPassword });

      const dashboardPaths: Record<UserRole, string> = {
        public: '/dashboard/public/insights',
        block: '/dashboard/block',
        district: '/dashboard/district',
        state: '/dashboard/state',
        national: '/dashboard/national',
      };

      navigate(dashboardPaths[officialLevel]);
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
              <Shield className="w-10 h-10 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading tracking-tight">{APP_NAME}</h1>
              <p className="text-primary-foreground/80 font-medium">Hackathon Prototype</p>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">Join the Platform</h2>
            <p className="text-primary-foreground/80 leading-relaxed font-medium">
              Register with your Gmail and location to access tailored data insights, book appointments, and more.
            </p>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="flex items-start gap-4">
              <div className="bg-accent/20 p-2 rounded-lg">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-accent">Smart Onboarding</h4>
                <p className="text-sm text-primary-foreground/70 mt-1 font-medium">
                  We automatically sync your designation with your administrative level to ensure 100% compliance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-12">
            <p className="text-xs text-primary-foreground/50 font-medium italic">
              Built for {APP_NAME} 2026 • Intelligent Data Distribution
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Forms */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md my-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-foreground tracking-tight">Create Account</h2>
            <p className="text-muted-foreground mt-2 font-medium">Provide your Gmail and location to start</p>
          </div>

          <Tabs defaultValue="public" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted p-1 rounded-xl">
              <TabsTrigger value="public" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <User className="w-4 h-4" />
                Public
              </TabsTrigger>
              <TabsTrigger value="official" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Building2 className="w-4 h-4" />
                Official
              </TabsTrigger>
            </TabsList>

            <TabsContent value="public" className="animate-in fade-in-50 duration-500">
              <form onSubmit={handlePublicRegister} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="publicName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="publicName" placeholder="Enter name" value={publicName} onChange={(e) => setPublicName(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="publicEmail">Gmail Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="publicEmail" type="email" placeholder="example@gmail.com" value={publicEmail} onChange={(e) => setPublicEmail(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select value={publicState} onValueChange={setPublicState} required>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicDistrict">District</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="publicDistrict" placeholder="District" value={publicDistrict} onChange={(e) => setPublicDistrict(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="publicPass">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="publicPass" type="password" placeholder="••••••••" value={publicPassword} onChange={(e) => setPublicPassword(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicConfirm">Confirm</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="publicConfirm" type="password" placeholder="••••••••" value={publicConfirmPassword} onChange={(e) => setPublicConfirmPassword(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-700 shadow-lg shadow-primary/20" size="lg">
                  Register as Citizen
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="official" className="animate-in fade-in-50 duration-500">
              <form onSubmit={handleOfficialRegister} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="offName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="offName" placeholder="Enter official name" value={officialName} onChange={(e) => setOfficialName(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="offEmail">Gmail Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="offEmail" type="email" placeholder="official@gmail.com" value={officialEmail} onChange={(e) => setOfficialEmail(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Designation</Label>
                    <Select value={officialDesignation} onValueChange={setOfficialDesignation} required>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDesignations.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Level
                      <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded uppercase font-bold">Auto-Set</span>
                    </Label>
                    {/* Read-only simulated dropdown input */}
                    <div className="relative">
                      <Select value={officialLevel} disabled>
                        <SelectTrigger className="bg-muted text-muted-foreground opacity-100 cursor-not-allowed border-dashed">
                          <SelectValue placeholder="Auto-assigned" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="block">Block</SelectItem>
                          <SelectItem value="district">District</SelectItem>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                        </SelectContent>
                      </Select>
                      <Lock className="absolute right-8 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-muted/40 rounded-xl border border-dashed border-muted-foreground/30">
                  <Label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    <Briefcase className="w-3 h-3" />
                    Current Job Location
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px]">State</Label>
                      <Select value={officialState} onValueChange={setOfficialState} disabled={officialLevel === 'national'} required={officialLevel !== 'national'}>
                        <SelectTrigger className="h-9 text-xs">
                          <SelectValue placeholder={officialLevel === 'national' ? 'All India' : 'Select State'} />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">District</Label>
                      <Input
                        placeholder={officialLevel === 'national' || officialLevel === 'state' ? 'All Districts' : 'District'}
                        value={officialDistrict}
                        onChange={(e) => setOfficialDistrict(e.target.value)}
                        disabled={officialLevel === 'national' || officialLevel === 'state'}
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Block</Label>
                      <Input
                        placeholder={officialLevel !== 'block' ? 'All Blocks' : 'Block'}
                        value={officialBlock}
                        onChange={(e) => setOfficialBlock(e.target.value)}
                        disabled={officialLevel !== 'block'}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="offPass">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="offPass" type="password" placeholder="••••••••" value={officialPassword} onChange={(e) => setOfficialPassword(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="offConfirm">Confirm</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="offConfirm" type="password" placeholder="••••••••" value={officialConfirmPassword} onChange={(e) => setOfficialConfirmPassword(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg shadow-indigo-200" size="lg">
                  Register as Official
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-8 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-blue-700 transition-colors font-bold underline underline-offset-4">
              Sign in here
            </Link>
          </p>

          <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-muted-foreground/10 text-center">
            <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1.5 font-medium">
              <Shield className="w-3 h-3 text-primary" />
              Secure Data Protocol • AES-256 Mock Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
