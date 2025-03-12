
import { useState, useEffect } from 'react';
import { Package, Search, Filter, Check, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import InventoryItem from '@/components/InventoryItem';

// Mock inventory data
const mockInventoryItems = [
  {
    id: 'INV-001',
    name: 'Glucose Meters',
    category: 'Diagnostic',
    stock: 45,
    threshold: 20,
    location: 'Warehouse A-1',
    lastUpdated: '2023-07-15',
  },
  {
    id: 'INV-002',
    name: 'Insulin Pump',
    category: 'Therapeutic',
    stock: 18,
    threshold: 15,
    location: 'Warehouse B-3',
    lastUpdated: '2023-07-18',
  },
  {
    id: 'INV-003',
    name: 'Blood Pressure Monitors',
    category: 'Diagnostic',
    stock: 32,
    threshold: 25,
    location: 'Warehouse A-2',
    lastUpdated: '2023-07-20',
  },
  {
    id: 'INV-004',
    name: 'Infusion Sets',
    category: 'Therapeutic',
    stock: 5,
    threshold: 30,
    location: 'Warehouse C-1',
    lastUpdated: '2023-07-10',
  },
  {
    id: 'INV-005',
    name: 'Oxygen Concentrator',
    category: 'Respiratory',
    stock: 0,
    threshold: 10,
    location: 'Warehouse D-2',
    lastUpdated: '2023-07-05',
  },
  {
    id: 'INV-006',
    name: 'ECG Monitors',
    category: 'Diagnostic',
    stock: 12,
    threshold: 8,
    location: 'Warehouse B-1',
    lastUpdated: '2023-07-22',
  },
  {
    id: 'INV-007',
    name: 'Surgical Instruments',
    category: 'Surgical',
    stock: 84,
    threshold: 50,
    location: 'Warehouse A-3',
    lastUpdated: '2023-07-17',
  },
  {
    id: 'INV-008',
    name: 'Defibrillators',
    category: 'Emergency',
    stock: 7,
    threshold: 5,
    location: 'Warehouse D-1',
    lastUpdated: '2023-07-21',
  },
];

type FilterOption = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [filteredItems, setFilteredItems] = useState(mockInventoryItems);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Filter inventory items based on search query and active filter
    let results = mockInventoryItems;

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilter !== 'all') {
      results = results.filter(item => {
        if (activeFilter === 'in-stock') return item.stock >= item.threshold;
        if (activeFilter === 'low-stock') return item.stock > 0 && item.stock < item.threshold;
        if (activeFilter === 'out-of-stock') return item.stock === 0;
        return true;
      });
    }

    setFilteredItems(results);

    // For animation purposes
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilter]);

  // Get counts for filter badges
  const getCounts = () => {
    const inStock = mockInventoryItems.filter(item => item.stock >= item.threshold).length;
    const lowStock = mockInventoryItems.filter(item => item.stock > 0 && item.stock < item.threshold).length;
    const outOfStock = mockInventoryItems.filter(item => item.stock === 0).length;
    
    return { inStock, lowStock, outOfStock };
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
                <span className="text-primary text-xs font-medium">Inventory</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Pharmaceutical Instruments</h1>
                <p className="text-muted-foreground mt-1">Manage your inventory of medical devices and equipment</p>
              </div>
              <Button className="flex items-center gap-1.5 self-start">
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </Button>
            </div>
          </header>

          {/* Search and filters */}
          <section className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or category..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('all')}
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" />
                  <span>All</span>
                </Button>
                <Button
                  variant={activeFilter === 'in-stock' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('in-stock')}
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  <span>In Stock</span>
                  <span className="ml-1 text-xs bg-background/20 px-1.5 py-0.5 rounded-full">{counts.inStock}</span>
                </Button>
                <Button
                  variant={activeFilter === 'low-stock' ? 'default' : 'outline'}
                  onClick={() => setActiveFilter('low-stock')}
                  className="flex items-center gap-1"
                >
                  <Package className="h-4 w-4" />
                  <span>Low</span>
                  <span className="ml-1 text-xs bg-background/20 px-1.5 py-0.5 rounded-full">{counts.lowStock}</span>
                </Button>
              </div>
            </div>
          </section>

          {/* Inventory listing */}
          <section 
            className={`space-y-4 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <InventoryItem
                  key={item.id}
                  {...item}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                />
              ))
            ) : (
              <div className="glassmorphism rounded-lg p-8 text-center animate-fade-in">
                <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No items found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No items match your search "${searchQuery}"`
                    : 'No items match the selected filters'}
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
          </section>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default Inventory;
