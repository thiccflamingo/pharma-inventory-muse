
import { useState, useEffect } from 'react';
import { Truck, Search, Filter, Calendar, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import DeliveryCard from '@/components/DeliveryCard';

// Mock delivery data
const mockDeliveries = [
  {
    id: 'DEL-001',
    destination: 'City Hospital, 123 Medical Ave, New York',
    items: ['Glucose Meters', 'ECG Monitors'],
    quantity: 12,
    status: 'in-transit',
    estimatedArrival: 'Jul 25, 2023',
    createdAt: 'Jul 22, 2023',
  },
  {
    id: 'DEL-002',
    destination: 'Westside Clinic, 456 Health St, Boston',
    items: ['Blood Pressure Monitors', 'Surgical Instruments'],
    quantity: 8,
    status: 'pending',
    estimatedArrival: 'Jul 28, 2023',
    createdAt: 'Jul 21, 2023',
  },
  {
    id: 'DEL-003',
    destination: 'County Medical Center, 789 Care Rd, Chicago',
    items: ['Insulin Pumps', 'Infusion Sets', 'Glucose Meters'],
    quantity: 15,
    status: 'delivered',
    estimatedArrival: 'Jul 20, 2023',
    createdAt: 'Jul 18, 2023',
  },
  {
    id: 'DEL-004',
    destination: 'Memorial Hospital, 234 Recovery Ln, Los Angeles',
    items: ['Defibrillators', 'ECG Monitors'],
    quantity: 6,
    status: 'delayed',
    estimatedArrival: 'Jul 27, 2023',
    createdAt: 'Jul 19, 2023',
  },
  {
    id: 'DEL-005',
    destination: 'University Medical, 567 Research Blvd, Seattle',
    items: ['Oxygen Concentrators', 'Blood Pressure Monitors'],
    quantity: 10,
    status: 'in-transit',
    estimatedArrival: 'Jul 26, 2023',
    createdAt: 'Jul 22, 2023',
  },
  {
    id: 'DEL-006',
    destination: 'Community Health, 890 Wellness Way, Denver',
    items: ['Surgical Instruments', 'Glucose Meters'],
    quantity: 14,
    status: 'delivered',
    estimatedArrival: 'Jul 21, 2023',
    createdAt: 'Jul 17, 2023',
  },
];

type DeliveryStatus = 'pending' | 'in-transit' | 'delivered' | 'delayed';
type TabValue = 'all' | 'active' | 'delivered';

const Deliveries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [filteredDeliveries, setFilteredDeliveries] = useState(mockDeliveries);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Filter deliveries based on search query and active tab
    let results = mockDeliveries;

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        delivery =>
          delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          delivery.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          delivery.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply tab filter
    if (activeTab !== 'all') {
      results = results.filter(delivery => {
        if (activeTab === 'active') {
          return delivery.status === 'pending' || delivery.status === 'in-transit' || delivery.status === 'delayed';
        }
        if (activeTab === 'delivered') {
          return delivery.status === 'delivered';
        }
        return true;
      });
    }

    setFilteredDeliveries(results);

    // For animation purposes
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab]);

  // Get counts for tab badges
  const getCounts = () => {
    const all = mockDeliveries.length;
    const active = mockDeliveries.filter(
      delivery => ['pending', 'in-transit', 'delayed'].includes(delivery.status)
    ).length;
    const delivered = mockDeliveries.filter(delivery => delivery.status === 'delivered').length;
    
    return { all, active, delivered };
  };

  const counts = getCounts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <AnimatedTransition>
        <main className="container px-4 md:px-6 pt-24 pb-16 max-w-6xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/10 px-2.5 py-1 rounded-md">
                <span className="text-primary text-xs font-medium">Deliveries</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Shipment Tracking</h1>
                <p className="text-muted-foreground mt-1">Monitor deliveries of pharmaceutical instruments</p>
              </div>
              <Button className="flex items-center gap-1.5 self-start">
                <Plus className="h-4 w-4" />
                <span>New Delivery</span>
              </Button>
            </div>
          </header>

          {/* Tabs and search */}
          <section className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full sm:w-auto">
                <TabsList className="grid w-full sm:w-auto grid-cols-3">
                  <TabsTrigger value="all" className="flex items-center gap-1.5">
                    <Filter className="h-4 w-4" />
                    <span>All</span>
                    <span className="ml-1 text-xs bg-background/20 px-1.5 py-0.5 rounded-full">{counts.all}</span>
                  </TabsTrigger>
                  <TabsTrigger value="active" className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4" />
                    <span>Active</span>
                    <span className="ml-1 text-xs bg-background/20 px-1.5 py-0.5 rounded-full">{counts.active}</span>
                  </TabsTrigger>
                  <TabsTrigger value="delivered" className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Delivered</span>
                    <span className="ml-1 text-xs bg-background/20 px-1.5 py-0.5 rounded-full">{counts.delivered}</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deliveries..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Delivery Cards */}
            <TabsContent value="all" className="m-0">
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery, index) => (
                    <DeliveryCard
                      key={delivery.id}
                      {...delivery}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    />
                  ))
                ) : (
                  <div className="glassmorphism rounded-lg p-8 text-center col-span-full animate-fade-in">
                    <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No deliveries found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? `No deliveries match your search "${searchQuery}"`
                        : 'No deliveries match the selected filters'}
                    </p>
                    {searchQuery && (
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setSearchQuery('')}
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="m-0">
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery, index) => (
                    <DeliveryCard
                      key={delivery.id}
                      {...delivery}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    />
                  ))
                ) : (
                  <div className="glassmorphism rounded-lg p-8 text-center col-span-full animate-fade-in">
                    <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No active deliveries found</h3>
                    <p className="text-muted-foreground">There are currently no active deliveries that match your criteria</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="delivered" className="m-0">
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery, index) => (
                    <DeliveryCard
                      key={delivery.id}
                      {...delivery}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    />
                  ))
                ) : (
                  <div className="glassmorphism rounded-lg p-8 text-center col-span-full animate-fade-in">
                    <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No delivered shipments found</h3>
                    <p className="text-muted-foreground">There are currently no completed deliveries that match your criteria</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </section>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default Deliveries;
