import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Send, Sparkles, TrendingUp, Users, MapPin, AlertTriangle } from 'lucide-react';

interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: string;
}

const aiSuggestions = [
    {
        title: 'Resource Allocation',
        priority: 'High',
        suggestion: 'Deploy additional operator at Bank Branch - Civil Lines. Current queue: 24 people, avg wait: 35 min.',
        impact: 'Reduce wait time by 40%',
        icon: Users,
    },
    {
        title: 'Mobile Camp Planning',
        priority: 'Medium',
        suggestion: 'Schedule mobile camp at Village B next week. 45% residents pending Aadhaar updates.',
        impact: 'Cover 200+ residents',
        icon: MapPin,
    },
    {
        title: 'Equipment Maintenance',
        priority: 'High',
        suggestion: 'Fingerprint scanner at Post Office needs calibration. 3 failed captures in last hour.',
        impact: 'Prevent service disruption',
        icon: AlertTriangle,
    },
    {
        title: 'Operational Efficiency',
        priority: 'Low',
        suggestion: 'Consider extended hours at CSC Kendra during festival season (next month).',
        impact: 'Increase capacity by 25%',
        icon: TrendingUp,
    },
];

export const BlockAI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'ai',
            content: 'Namaste! I am KshetraDaksha, your Field Operations AI. I can help you optimize resource allocation, plan mobile camps, and manage equipment health across your block.',
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        const userMessage: Message = {
            role: 'user',
            content: userMsg,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/field-ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMsg })
            });
            const data = await res.json();

            if (data.success) {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: data.response,
                    timestamp: new Date().toLocaleTimeString(),
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: "⚠️ Operational Alert: Unable to access field intelligence at the moment. Please verify backend state.",
                    timestamp: new Date().toLocaleTimeString(),
                }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "Network Connectivity Issue: Could not reach the Field AI service.",
                timestamp: new Date().toLocaleTimeString(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickQuestion = (q: string) => {
        setInput(q);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'destructive';
            case 'Medium': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <Brain className="w-8 h-8 text-blue-600" />
                            Field Action AI
                        </h1>
                        <p className="text-muted-foreground mt-1">AI-powered recommendations for block-level operations</p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                        <Sparkles className="w-3 h-3" />
                        AI Powered
                    </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AI Suggestions Panel */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-blue-600" />
                                    Smart Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {aiSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="p-3 rounded-xl border border-border hover:bg-muted/50 transition-all cursor-pointer group"
                                        onClick={() => handleQuickQuestion(`Details on ${suggestion.title.toLowerCase()}?`)}
                                    >
                                        <div className="flex items-start gap-2 mb-2">
                                            <suggestion.icon className="w-4 h-4 text-blue-600 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold text-sm">{suggestion.title}</span>
                                                    <Badge variant={getPriorityColor(suggestion.priority) as any} className="text-[10px] px-1.5 h-4 font-bold">
                                                        {suggestion.priority}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{suggestion.suggestion}</p>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                                                    <TrendingUp className="w-3 h-3" />
                                                    <span>{suggestion.impact}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Questions */}
                        <Card className="border-none shadow-sm bg-slate-50/50">
                            <CardHeader>
                                <CardTitle className="text-base">Field Inquiries</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[
                                    'What is the current performance of my block?',
                                    'Where should I deploy mobile camps?',
                                    'Which equipment needs maintenance?',
                                    'How can I reduce wait times?'
                                ].map((q) => (
                                    <Button
                                        key={q}
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start text-left h-auto py-2 bg-white hover:bg-blue-50 hover:border-blue-200 text-xs shadow-sm transition-all"
                                        onClick={() => handleQuickQuestion(q)}
                                    >
                                        {q}
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Chat Interface */}
                    <Card className="lg:col-span-2 border-none shadow-md overflow-hidden flex flex-col h-[700px]">
                        <CardHeader className="bg-white border-b py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Brain className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-sm font-bold">KshetraDaksha Assistant</CardTitle>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">System Operational</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/40">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                                            <div
                                                className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${message.role === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                                                    }`}
                                            >
                                                <p className="whitespace-pre-wrap">{message.content}</p>
                                                <p className={`text-[10px] mt-2 opacity-60 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                                                    {message.timestamp}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white border-t">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Ask about operations, camps, or resources..."
                                        className="rounded-full px-6 focus:ring-blue-500 border-slate-200"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        disabled={isLoading}
                                    />
                                    <Button
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                        className="rounded-full bg-blue-600 hover:bg-blue-700 w-10 h-10 p-0"
                                    >
                                        {isLoading ? <Sparkles className="w-4 h-4 animate-spin text-white" /> : <Send className="w-4 h-4 text-white" />}
                                    </Button>
                                </div>
                                <p className="text-[10px] text-center text-slate-400 mt-3 font-medium px-8">
                                    AI guidance provided for operational assistance. Decisions must strictly adhere to District Policy.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BlockAI;
