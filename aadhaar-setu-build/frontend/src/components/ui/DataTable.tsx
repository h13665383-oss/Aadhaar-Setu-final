import React from 'react';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  header: string;
  className?: string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  className,
}) => {
  return (
    <div className={cn("gov-card p-6", className)}>
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={cn(
                    "text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors"
              >
                {columns.map((col) => (
                  <td 
                    key={col.key} 
                    className={cn("py-3 px-4 text-sm", col.className)}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
