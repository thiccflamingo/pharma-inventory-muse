
import { ReactNode } from 'react';
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

interface InventoryItemProps {
  id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  location: string;
  lastUpdated: string;
  className?: string;
}

const InventoryItem = ({
  id,
  name,
  category,
  stock,
  threshold,
  location,
  lastUpdated,
  className,
}: InventoryItemProps) => {
  // Determine status based on stock level
  const getStatus = (): InventoryStatus => {
    if (stock === 0) return 'out-of-stock';
    if (stock < threshold) return 'low-stock';
    return 'in-stock';
  };

  const status = getStatus();

  const getStatusDisplay = (): { icon: ReactNode; text: string; color: string } => {
    switch (status) {
      case 'in-stock':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          text: 'In Stock',
          color: 'bg-green-100 text-green-800',
        };
      case 'low-stock':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          text: 'Low Stock',
          color: 'bg-amber-100 text-amber-800',
        };
      case 'out-of-stock':
        return {
          icon: <HelpCircle className="h-4 w-4" />,
          text: 'Out of Stock',
          color: 'bg-red-100 text-red-800',
        };
      default:
        return {
          icon: <HelpCircle className="h-4 w-4" />,
          text: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div 
      className={cn(
        'glassmorphism rounded-lg p-4 transition-all duration-300 hover:shadow-md border-l-4',
        status === 'in-stock' ? 'border-l-green-500' : 
        status === 'low-stock' ? 'border-l-amber-500' : 'border-l-red-500',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{category}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">ID: {id}</div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Stock</span>
            <span className="font-medium">{stock} units</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="font-medium">{location}</span>
          </div>
          
          <div className="flex items-center">
            <span className={cn('status-chip flex items-center gap-1', statusDisplay.color)}>
              {statusDisplay.icon}
              {statusDisplay.text}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default InventoryItem;
