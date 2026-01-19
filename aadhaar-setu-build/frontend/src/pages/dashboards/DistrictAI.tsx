import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, Sparkles, Map, Users, TrendingDown, Target } from 'lucide-react';

interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: string;
}

export const DistrictAI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'ai',
            content: 'Namaste! I am ZilaPrerak, your District Resource AI. How can I help you resolve inter-block disparities or optimize district-wide service delivery today?',
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
                body: JSON.stringify({ query: userMsg, persona: 'district' })
            });
            const data = await res.json();
            if (data.success) {
                setMessages(prev => [...prev, { role: 'ai', content: data.response, timestamp: new Date().toLocaleTimeString() }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', content: "Error connecting to District Intelligence service.", timestamp: new Date().toLocaleTimeString() }]);
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
                            <Brain className="w-8 h-8 text-indigo-600" />
                            District AI Planner
                        </h1>
                        <p className="text-muted-foreground mt-1">Strategic resource optimization for the District Administration</p>
                    </div>
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        <Target className="w-3 h-3 mr-1" />
                        District Hub
                    </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4 lg:col-span-1">
                        <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-50 to-white">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-600" />
                                    Planning Focus
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { icon: Map, title: "Inter-block Disparity", desc: "Identify under-performing blocks" },
                                    { icon: Users, title: "Staff Distribution", desc: "Optimize operator count per district" },
                                    { icon: TrendingDown, title: "Wait-time Reduction", desc: "District-wide efficiency goals" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm">
                                        <item.icon className="w-5 h-5 text-indigo-500" />
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
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Brain className="w-5 h-5 text-indigo-600" />
                                </div>
                                <CardTitle className="text-sm font-bold">ZilaPrerak Assistant</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border rounded-bl-none shadow-sm'
                                        }`}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && <div className="flex gap-2 p-2"><div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" /></div>}
                        </CardContent>
                        <div className="p-4 bg-white border-t">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Ask about district-level optimization..."
                                    className="rounded-full shadow-none"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button onClick={handleSend} className="rounded-full bg-indigo-600">
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

export default DistrictAI;
