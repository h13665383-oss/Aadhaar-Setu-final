import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, Phone, Mail, MessageSquare, FileText, Video, ExternalLink, Shield } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book an appointment for enrollment?',
    answer: 'You can book an appointment by navigating to the "Book Appointment" section from the sidebar. Select your preferred center, date, and time slot to confirm your booking.',
  },
  {
    question: 'What documents are required for new enrollment?',
    answer: 'For new enrollment, you need a valid Proof of Identity (POI) and Proof of Address (POA). Common documents include Passport, PAN Card, Voter ID, and Driving License.',
  },
  {
    question: 'How long does biometric update take?',
    answer: 'Biometric update typically takes 5-10 minutes at the enrollment center. However, you may need to wait in queue depending on the center load.',
  },
  {
    question: 'Can I update my mobile number online?',
    answer: 'Mobile number update requires biometric verification and must be done at an authorized enrollment center. You can book an appointment for this service.',
  },
  {
    question: 'How do I track my grievance status?',
    answer: 'Go to "Complaints & Grievance" section and use the "Track Status" tab. Enter your grievance ID to view the current status and updates.',
  },
  {
    question: 'What is UdyamDisha AI?',
    answer: 'UdyamDisha AI is an AI-powered tool that suggests business opportunities based on your location, local market demand, and government schemes available in your area.',
  },
];

const resources = [
  { title: 'User Guide PDF', icon: FileText, description: 'Complete guide to using the platform' },
  { title: 'Video Tutorials', icon: Video, description: 'Step-by-step video instructions' },
  { title: 'Service Centers Directory', icon: ExternalLink, description: 'Find centers near you' },
];

export const PublicHelp: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help & Awareness</h1>
          <p className="text-muted-foreground mt-1">Get help, read FAQs, and access useful resources</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about our services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Helpline</p>
                    <p className="text-sm text-muted-foreground">1947 (Toll Free)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">help@uidai.gov.in</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-muted">
                      <resource.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="bg-success/5 border-success/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-success">Privacy Protected</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      This platform does not collect or store any Aadhaar numbers. 
                      All displayed data is aggregated for visualization purposes only.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PublicHelp;
