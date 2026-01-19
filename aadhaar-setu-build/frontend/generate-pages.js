#!/usr/bin/env node

/**
 * Script to generate stub dashboard pages for all navigation items
 * This ensures every button in the navigation works
 */

const fs = require('fs');
const path = require('path');

const dashboardPages = [
    // District Dashboard Pages
    {
        name: 'DistrictServiceDelivery',
        title: 'Service Delivery Operations',
        description: 'Monitor service delivery metrics and operational efficiency across the district',
    },
    {
        name: 'DistrictDemandAnalysis',
        title: 'Demand & Appointment Load Analysis',
        description: 'Analyze service demand patterns and appointment distribution',
    },
    {
        name: 'DistrictGrievanceTrends',
        title: 'Grievance Trends Analysis',
        description: 'Track and analyze grievance patterns across blocks',
    },
    {
        name: 'DistrictAI',
        title: 'District AI Planner',
        description: 'AI-powered resource planning and optimization for district operations',
    },

    // State Dashboard Pages
    {
        name: 'StateDistrictHeatmap',
        title: 'District Performance Heatmap',
        description: 'Geographic visualization of district-level performance metrics',
    },
    {
        name: 'StateDemographics',
        title: 'Demographic Intelligence',
        description: 'State-wide demographic analysis and coverage statistics',
    },
    {
        name: 'StateInfrastructure',
        title: 'Infrastructure Analysis',
        description: 'Infrastructure availability and technology adoption across the state',
    },
    {
        name: 'StateCompliance',
        title: 'Risk & Compliance Monitoring',
        description: 'Compliance monitoring, risk indicators, and audit findings',
    },
    {
        name: 'StateAI',
        title: 'StateOps AI',
        description: 'State-level AI insights for policy and strategic planning',
    },

    // National Dashboard Pages
    {
        name: 'NationalDemographics',
        title: 'National Demographic Intelligence',
        description: 'National-level demographic trends and population coverage analysis',
    },
    {
        name: 'NationalDisparity',
        title: 'Regional Disparity Analysis',
        description: 'State-wise comparison and equity analysis',
    },
    {
        name: 'NationalPerformance',
        title: 'Service Performance Metrics',
        description: 'National service metrics, SLA compliance, and quality indicators',
    },
    {
        name: 'NationalSimulator',
        title: 'Policy Impact Simulator',
        description: 'Interactive policy simulator with what-if analysis',
    },
    {
        name: 'NationalAlerts',
        title: 'Alerts & Reports',
        description: 'Critical alerts dashboard and automated reporting',
    },
];

const generatePageTemplate = (pageName, title, description) => {
    return `import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export const ${pageName}: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">${title}</h1>
          <p className="text-muted-foreground mt-1">${description}</p>
        </div>

        {/* Coming Soon Placeholder */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-12 pb-12 text-center">
            <Construction className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Page Under Development</h3>
            <p className="text-muted-foreground mb-4">
              This page is currently being built. Check back soon for full functionality.
            </p>
            <Button variant="outline">Go Back to Dashboard</Button>
          </CardContent>
        </Card>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Feature 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Content coming soon...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Feature 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Content coming soon...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Feature 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Content coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ${pageName};
`;
};

// Generate all pages
const outputDir = path.join(__dirname, 'src', 'pages', 'dashboards');

dashboardPages.forEach(({ name, title, description }) => {
    const filePath = path.join(outputDir, `${name}.tsx`);
    const content = generatePageTemplate(name, title, description);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Created ${name}.tsx`);
});

console.log(`\n✓ Generated ${dashboardPages.length} dashboard pages successfully!`);
