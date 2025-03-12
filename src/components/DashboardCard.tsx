
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  children?: ReactNode;
}

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  children,
}: DashboardCardProps) => {
  return (
    <div 
      className={cn(
        'glassmorphism rounded-xl p-6 card-hover animate-scale-in',
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      <div className="flex flex-col">
        <div className="text-2xl font-bold mb-1">{value}</div>
        
        {trend && (
          <div className="flex items-center gap-1.5">
            <span 
              className={cn(
                'text-xs font-medium flex items-center',
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
        
        {!trend && description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default DashboardCard;
