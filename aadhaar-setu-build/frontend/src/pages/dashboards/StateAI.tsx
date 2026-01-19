import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, Sparkles, Shield, BarChart3, Globe, Zap } from 'lucide-react';

interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: string;
}

export const StateAI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'ai',
            content: 'Welcome, Commissioner. I am RajyaDrishti, your State Strategic Assistant. I provide intelligence on inter-district compliance, statewide coverage, and infrastructure scaling.',
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: new Date().toLocaleTimeString() }]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/admin-ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMsg, persona: 'state' })
            });
            const data = await res.json();
            if (data.success) {
                setMessages(prev => [...prev, { role: 'ai', content: data.response, timestamp: new Date().toLocaleTimeString() }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', content: "Connectivity Error: RajyaDrishti offline.", timestamp: new Date().toLocaleTimeString() }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <Brain className="w-8 h-8 text-emerald-600" />
                            StateOps AI Intelligence
                        </h1>
                        <p className="text-muted-foreground mt-1">Strategic oversight and statewide optimization engine</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <Globe className="w-3 h-3 mr-1" />
                        State HQ
                    </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4 lg:col-span-1">
                        <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-emerald-600" />
                                    Strategic Oversight
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { icon: BarChart3, title: "State Compliance", desc: "Monitor policy adherence across 36 districts" },
                                    { icon: Zap, title: "Resource Allocation", desc: "Global budget and equipment distribution" },
                                    { icon: Sparkles, title: "Impact Forecasting", desc: "Predict coverage outcomes for next 12 months" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm border border-emerald-50">
                                        <item.icon className="w-5 h-5 text-emerald-500" />
                                        <div>
                                            <p className="text-xs font-bold text-slate-700">{item.title}</p>
                                            <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="lg:col-span-2 border-shadow-sm h-[600px] flex flex-col overflow-hidden">
                        <CardHeader className="border-b py-3 px-6 bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Brain className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-bold">RajyaDrishti Command Assistant</CardTitle>
                                    <p className="text-[10px] text-emerald-600 font-bold uppercase">State-Level Access Active</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-emerald-700 text-white rounded-br-none' : 'bg-white border rounded-bl-none shadow-md'
                                        }`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && <div className="flex gap-2 p-2"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" /></div>}
                        </CardContent>
                        <div className="p-4 bg-white border-t">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter strategic query (e.g. statewide compliance report)..."
                                    className="rounded-full shadow-none border-slate-200 focus:ring-emerald-500"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button onClick={handleSend} className="rounded-full bg-emerald-700 hover:bg-emerald-800">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StateAI;
