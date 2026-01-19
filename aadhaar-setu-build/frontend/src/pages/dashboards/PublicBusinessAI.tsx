import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, MapPin, TrendingUp, Users, Building2, Sparkles, ArrowRight, IndianRupee, MessageCircle, X, Send, Bot } from 'lucide-react';

const states = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat',
  'Uttar Pradesh', 'Rajasthan', 'West Bengal', 'Kerala', 'Telangana'
];

const businessSuggestions = [
  {
    id: 1,
    name: 'Food Processing Unit',
    category: 'Manufacturing',
    investment: '₹5-10 Lakhs',
    roi: '25-30%',
    demand: 'High',
    description: 'Local food processing with focus on pickles, papads, and snacks. Strong demand from urban areas.',
    skills: ['Food Safety', 'Packaging', 'Marketing'],
    governmentSchemes: ['PMEGP', 'Mudra Loan'],
  },
  {
    id: 2,
    name: 'Dairy Farm',
    category: 'Agriculture',
    investment: '₹3-8 Lakhs',
    roi: '20-25%',
    demand: 'Very High',
    description: 'Dairy farming with milk collection and distribution. Growing demand for organic dairy products.',
    skills: ['Animal Husbandry', 'Supply Chain'],
    governmentSchemes: ['DEDS', 'Kisan Credit Card'],
  },
  {
    id: 3,
    name: 'IT Services / Freelancing',
    category: 'Services',
    investment: '₹1-3 Lakhs',
    roi: '40-50%',
    demand: 'High',
    description: 'Web development, digital marketing, and IT support services. Growing digital economy.',
    skills: ['Web Development', 'Digital Marketing', 'SEO'],
    governmentSchemes: ['Startup India', 'Digital India'],
  },
  {
    id: 4,
    name: 'Textile / Garment Unit',
    category: 'Manufacturing',
    investment: '₹8-15 Lakhs',
    roi: '20-28%',
    demand: 'Medium',
    description: 'Small-scale garment manufacturing with focus on local designs and online sales.',
    skills: ['Tailoring', 'Design', 'E-commerce'],
    governmentSchemes: ['PMEGP', 'CGTMSE'],
  },
];

export const PublicBusinessAI: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showResults, setShowResults] = useState(false);

  // --- CHAT STATE ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: 'Namaste! I am UdyamDisha AI. Ask me about business opportunities, ROI ranges, or government schemes from our database.' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleAnalyze = () => {
    setShowResults(true);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/udyam-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg })
      });

      const data = await res.json();

      if (data.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
      } else {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          text: data.error === "Local AI Service Unreachable"
            ? "⚠️ Local AI Offline: Please run 'ollama serve' in your terminal."
            : "Sorry, I encountered an issue accessing the data."
        }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Network Error: Could not reach the backend." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 relative min-h-screen pb-20">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Brain className="w-7 h-7 text-primary" />
              UdyamDisha AI
            </h1>
            <p className="text-muted-foreground mt-1">AI-powered business recommendations based on your location</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Powered
          </Badge>
        </div>

        {/* Location Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Your Location</CardTitle>
            <CardDescription>
              Choose your state and district to get personalized business suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="district1">Central District</SelectItem>
                    <SelectItem value="district2">North District</SelectItem>
                    <SelectItem value="district3">South District</SelectItem>
                    <SelectItem value="district4">East District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!selectedState || !selectedDistrict}
              >
                <Brain className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">Business Opportunities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-success/5 border-success/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-success/10">
                      <TrendingUp className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">25-40%</p>
                      <p className="text-sm text-muted-foreground">Avg. ROI Range</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-info/5 border-info/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-info/10">
                      <Users className="w-6 h-6 text-info" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12+</p>
                      <p className="text-sm text-muted-foreground">Govt. Schemes Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {businessSuggestions.map((business) => (
                <Card key={business.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">{business.category}</Badge>
                        <CardTitle className="text-lg">{business.name}</CardTitle>
                      </div>
                      <Badge
                        variant={business.demand === 'Very High' ? 'default' : 'secondary'}
                        className="flex items-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3" />
                        {business.demand} Demand
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{business.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Investment</p>
                          <p className="font-medium">{business.investment}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <div>
                          <p className="text-muted-foreground">Expected ROI</p>
                          <p className="font-medium text-success">{business.roi}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {business.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Government Schemes</p>
                      <div className="flex flex-wrap gap-1">
                        {business.governmentSchemes.map((scheme) => (
                          <Badge key={scheme} variant="outline" className="text-xs bg-primary/5">{scheme}</Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-2">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ================= UDYAM DISHA CHAT WIDGET ================= */}

        {/* Floating Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setChatOpen(!chatOpen)}
            className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all animate-bounce-slow"
          >
            {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
          </Button>
        </div>

        {/* Chat Window */}
        {chatOpen && (
          <div className="fixed bottom-24 right-6 w-96 max-w-[90vw] z-40 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <Card className="border-2 border-blue-100 shadow-2xl overflow-hidden flex flex-col h-[500px]">
              {/* Header */}
              <div className="bg-blue-600 p-4 flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">UdyamDisha Assistant</h3>
                  <p className="text-blue-100 text-xs">Govt. Policy & Business Guide</p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white border shadow-sm text-slate-700 rounded-bl-none'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t">
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about schemes, ROI, ideas..."
                    className="flex-1 text-sm border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700" disabled={isChatLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                {/* Mandatory Disclaimer */}
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  AI guidance based on public data. Consult officials for final decisions.
                </p>
              </div>
            </Card>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default PublicBusinessAI;
