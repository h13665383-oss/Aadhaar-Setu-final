import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, Users, Brain, Sparkles, AlertCircle, FileText, IndianRupee } from 'lucide-react';

export const NationalSimulator: React.FC = () => {
    const [budget, setBudget] = useState([50]);
    const [centers, setCenters] = useState([100]);
    const [state, setState] = useState('All India');
    const [isLoading, setIsLoading] = useState(false);
    const [simulationResult, setSimulationResult] = useState<{
        analysis: string;
        metrics: {
            coverage: string;
            efficiency: string;
            roi: string;
        };
    } | null>(null);

    const runSimulation = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/policy-simulator/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    budget: budget[0],
                    centers: centers[0],
                    state: state
                })
            });
            const data = await res.json();
            if (data.success) {
                setSimulationResult({
                    analysis: data.analysis,
                    metrics: data.metrics
                });
            }
        } catch (err) {
            console.error("Simulation error", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-xl">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            Policy Impact Simulator
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">AI-driven predictive analysis for national-scale policy variations</p>
                    </div>
                    <Badge variant="outline" className="px-3 py-1 border-indigo-200 bg-indigo-50 text-indigo-700 font-semibold gap-1">
                        <Brain className="w-3 h-3" />
                        Llama 3 Powered
                    </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Parameters Panel */}
                    <Card className="lg:col-span-4 border-none shadow-sm h-fit">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Simulation Parameters</CardTitle>
                            <CardDescription>Adjust the levers to simulate outcomes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="font-semibold text-slate-700">Budget Allocation</Label>
                                    <Badge variant="secondary" className="bg-slate-100 font-mono">₹{budget[0]} Crores</Badge>
                                </div>
                                <Slider
                                    value={budget}
                                    onValueChange={setBudget}
                                    max={500}
                                    step={5}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase">
                                    <span>min: 0</span>
                                    <span>max: 500 Cr</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="font-semibold text-slate-700">Additional Centers</Label>
                                    <Badge variant="secondary" className="bg-slate-100 font-mono">{centers[0]} Units</Badge>
                                </div>
                                <Slider
                                    value={centers}
                                    onValueChange={setCenters}
                                    max={2000}
                                    step={50}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase">
                                    <span>current: 0</span>
                                    <span>cap: 2000</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="font-semibold text-slate-700">Scope of Action</Label>
                                <Input
                                    placeholder="State or Region (e.g. Maharashtra)"
                                    className="focus:ring-indigo-500"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 shadow-md font-bold text-base transition-all"
                                onClick={runSimulation}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                        Analyzing Impact...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4 mr-2" />
                                        Execute Simulation
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results Panel */}
                    <div className="lg:col-span-8 space-y-6">
                        {!simulationResult && !isLoading ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center bg-slate-50/50">
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
                                    <FileText className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-600">Awaiting Policy Parameters</h3>
                                <p className="text-slate-400 max-w-sm mt-2">Adjust the sliders and click execute to generate a 70B parameter AI impact analysis.</p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <Card className="border-none shadow-sm bg-indigo-50/50">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col items-center text-center">
                                                <Users className="w-5 h-5 text-indigo-600 mb-2" />
                                                <p className="text-xs font-medium text-slate-500 uppercase">Coverage</p>
                                                <p className="text-2xl font-bold text-indigo-700">{simulationResult?.metrics.coverage || '---'}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-none shadow-sm bg-green-50/50">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col items-center text-center">
                                                <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                                                <p className="text-xs font-medium text-slate-500 uppercase">Efficiency</p>
                                                <p className="text-2xl font-bold text-green-700">{simulationResult?.metrics.efficiency || '---'}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-none shadow-sm bg-orange-50/50">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col items-center text-center">
                                                <Zap className="w-5 h-5 text-orange-600 mb-2" />
                                                <p className="text-xs font-medium text-slate-500 uppercase">Est. ROI</p>
                                                <p className="text-2xl font-bold text-orange-700">{simulationResult?.metrics.roi || '---'}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Deep Analysis */}
                                <Card className="border-none shadow-sm overflow-hidden min-h-[400px]">
                                    <CardHeader className="bg-white border-b flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-bold">Policy Impact Analysis</CardTitle>
                                            <CardDescription>AI-generated strategic breakdown</CardDescription>
                                        </div>
                                        {isLoading && <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />}
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        {isLoading ? (
                                            <div className="p-8 space-y-4">
                                                <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse" />
                                                <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
                                                <div className="h-4 bg-slate-100 rounded w-2/3 animate-pulse" />
                                                <div className="h-32 bg-slate-50 rounded w-full animate-pulse mt-8" />
                                            </div>
                                        ) : (
                                            <div className="p-8 prose prose-slate max-w-none prose-sm prose-headings:text-indigo-900 prose-headings:font-bold prose-strong:text-indigo-700">
                                                <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
                                                    {simulationResult?.analysis}
                                                </div>
                                                <div className="mt-8 pt-6 border-t flex items-center gap-4 bg-slate-50 -mx-8 px-8 py-4">
                                                    <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                                                    <p className="text-[10px] text-slate-500 font-medium leading-normal">
                                                        This simulation uses predictive modeling based on aggregated historical data.
                                                        Real-world outcomes may vary based on localized implementation factors and infrastructure constraints.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NationalSimulator;
