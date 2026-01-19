import React from 'react';
import { cn } from '@/lib/utils';
import { BarChart3, PieChart, TrendingUp, Map } from 'lucide-react';

interface ChartPlaceholderProps {
  title: string;
  type?: 'bar' | 'pie' | 'line' | 'map';
  height?: string;
  className?: string;
}

const iconMap = {
  bar: BarChart3,
  pie: PieChart,
  line: TrendingUp,
  map: Map,
};

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  title,
  type = 'bar',
  height = 'h-64',
  className,
}) => {
  const Icon = iconMap[type];

  return (
    <div className={cn("gov-card p-6", className)}>
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <div className={cn("chart-placeholder", height)}>
        <div className="text-center">
          <Icon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium">Chart Visualization</p>
          <p className="text-xs mt-1">Mock data for demonstration</p>
        </div>
      </div>
    </div>
  );
};
