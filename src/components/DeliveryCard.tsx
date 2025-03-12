
import { ReactNode } from 'react';
import { Package, MapPin, Clock, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';

type DeliveryStatus = 'pending' | 'in-transit' | 'delivered' | 'delayed';

interface DeliveryCardProps {
  id: string;
  destination: string;
  items: string[];
  quantity: number;
  status: DeliveryStatus;
  estimatedArrival: string;
  createdAt: string;
  className?: string;
}

const DeliveryCard = ({
  id,
  destination,
  items,
  quantity,
  status,
  estimatedArrival,
  createdAt,
  className,
}: DeliveryCardProps) => {
  const getStatusDisplay = (): { label: string; color: string } => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', color: 'bg-blue-100 text-blue-800' };
      case 'in-transit':
        return { label: 'In Transit', color: 'bg-amber-100 text-amber-800' };
      case 'delivered':
        return { label: 'Delivered', color: 'bg-green-100 text-green-800' };
      case 'delayed':
        return { label: 'Delayed', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusDisplay = getStatusDisplay();

  // Calculate progress based on status
  const getProgressPercent = (): number => {
    switch (status) {
      case 'pending': return 10;
      case 'in-transit': return 60;
      case 'delivered': return 100;
      case 'delayed': return 40;
      default: return 0;
    }
  };

  const progress = getProgressPercent();

  return (
    <div 
      className={cn(
        'glassmorphism rounded-xl p-5 animate-scale-in card-hover',
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium">Delivery #{id}</h3>
        <span className={cn('status-chip', statusDisplay.color)}>
          {statusDisplay.label}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium">Destination</div>
            <div className="text-sm text-muted-foreground">{destination}</div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium">Items ({quantity})</div>
            <div className="text-sm text-muted-foreground truncate max-w-[250px]">
              {items.join(', ')}
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <CalendarClock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium">Expected Arrival</div>
            <div className="text-sm text-muted-foreground">{estimatedArrival}</div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-1.5 mb-1">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Created: {createdAt}</span>
        {status !== 'delivered' && <span>ETA: {estimatedArrival}</span>}
      </div>
    </div>
  );
};

export default DeliveryCard;
