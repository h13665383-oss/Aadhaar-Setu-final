import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Mail, Lock, ChevronRight, CheckCircle2, User, Building2 } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, user: currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOfficer, setIsOfficer] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Login using backend API
    const success = await login(email, password, isOfficer ? undefined : 'public');

    if (success) {
      // Get the user from storage to determine redirect
      const savedUser = localStorage.getItem('currentUser');
      const user = savedUser ? JSON.parse(savedUser) : null;
      const role = user?.role || (isOfficer ? 'block' : 'public');

      const dashboardPaths: Record<UserRole, string> = {
        public: '/dashboard/public/insights',
        block: '/dashboard/block',
        district: '/dashboard/district',
        state: '/dashboard/state',
        national: '/dashboard/national',
      };

      navigate(dashboardPaths[role]);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-2xl">
              <Shield className="w-10 h-10 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-black font-heading tracking-tight">{APP_NAME}</h1>
              <p className="text-primary-foreground/80 font-medium">Hackathon Prototype</p>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Location-Aware Analytics</h3>
                <p className="text-primary-foreground/70 text-sm mt-1 font-medium">Log in to automatically see data trends for your specific state or district.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Integrated Access</h3>
                <p className="text-primary-foreground/70 text-sm mt-1 font-medium">One account for all your UIDAI operational needs and public insights.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-12">
            <p className="text-xs text-primary-foreground/40 font-medium tracking-wide">
              ADMINISTRATIVE PORTAL v2.0 • FOR DEMONSTRATION ONLY
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-foreground tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground mt-2 font-medium">Sign in with your Gmail address</p>
          </div>

          <Tabs defaultValue="public" className="w-full" onValueChange={(v) => setIsOfficer(v === 'officer')}>
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted p-1 rounded-xl">
              <TabsTrigger value="public" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <User className="w-4 h-4" />
                Public
              </TabsTrigger>
              <TabsTrigger value="officer" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Building2 className="w-4 h-4" />
                Officer
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Gmail Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-xs font-bold text-primary hover:text-blue-700 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-blue-700 shadow-xl shadow-primary/10 transition-all active:scale-[0.98]" size="lg">
                Sign In as {isOfficer ? 'Officer' : 'Citizen'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-sm text-muted-foreground font-medium pt-2">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-blue-700 transition-colors font-bold underline underline-offset-4">
                  Register here
                </Link>
              </p>
            </form>
          </Tabs>

          <div className="mt-12 p-5 rounded-2xl bg-muted/40 border border-muted-foreground/10 flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
              <strong>Hackathon Mode:</strong> Registration details are remembered locally on this browser. Use any Gmail to test auto-profile generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
