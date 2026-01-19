import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronRight, Users, BarChart3, Brain, Lock, Globe, Building2 } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const features = [
  {
    icon: Users,
    title: 'Role-Based Dashboards',
    description: 'Tailored views for Public, Block, District, State, and National users',
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description: 'Aggregated analytics and insights for informed decision making',
  },
  {
    icon: Brain,
    title: 'AI-Powered Tools',
    description: 'Smart recommendations for business, operations, and policy planning',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'No personal Aadhaar data collected - aggregated statistics only',
  },
];

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">{APP_NAME}</h1>
              <p className="text-xs text-muted-foreground">Hackathon Prototype</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/register')}>
              Get Started
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Globe className="w-3 h-3 mr-1" />
              {APP_NAME} 2024
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Data-Driven Insights for{' '}
              <span className="text-primary">Aadhaar Services</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A unified platform providing aggregated analytics, AI-powered recommendations,
              and streamlined services for citizens and administrators across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/register')}>
                Get Started
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-success/10 border border-success/30 inline-flex items-center gap-2">
              <Lock className="w-5 h-5 text-success" />
              <span className="text-sm text-success font-medium">
                Privacy Protected: No Aadhaar numbers collected or displayed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive tools designed for every level of administration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">For Every Stakeholder</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Specialized dashboards tailored to different administrative levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { role: 'Public', icon: Users, desc: 'Citizens access insights, appointments & grievances' },
              { role: 'Block', icon: Building2, desc: 'Manage center operations & field activities' },
              { role: 'District', icon: BarChart3, desc: 'Monitor block performance & service delivery' },
              { role: 'State', icon: Globe, desc: 'Oversee districts & infrastructure planning' },
              { role: 'National', icon: Shield, desc: 'Executive overview & policy simulation' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.role}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Select your role and experience the platform with mock data.
            This is a UI/UX prototype for visualization purposes only.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/login')}
          >
            Enter Platform
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {APP_NAME} Prototype
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              This is a frontend-only prototype. No real data processing or authentication.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
