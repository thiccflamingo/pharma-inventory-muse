
import { useState, useEffect } from 'react';
import { Line } from 'recharts';
import { PackageSearch, Truck, AlertTriangle, Package, BarChart3, Clock } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import DashboardCard from '@/components/DashboardCard';
import { Chart } from '@/components/ui/chart';
import { Link } from 'react-router-dom';

// Mock data
const inventoryData = [
  { name: 'Jan', value: 240 },
  { name: 'Feb', value: 380 },
  { name: 'Mar', value: 320 },
  { name: 'Apr', value: 450 },
  { name: 'May', value: 560 },
  { name: 'Jun', value: 490 },
  { name: 'Jul', value: 540 },
];

const deliveryData = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Apr', value: 61 },
  { name: 'May', value: 72 },
  { name: 'Jun', value: 64 },
  { name: 'Jul', value: 78 },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading (for animation purposes)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <AnimatedTransition>
        <main className="container px-4 md:px-6 pt-24 pb-16 max-w-6xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/10 px-2.5 py-1 rounded-md">
                <span className="text-primary text-xs font-medium">Dashboard</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to PharmTrack</h1>
            <p className="text-muted-foreground mt-1">Your centralized pharmaceutical inventory and delivery management system</p>
          </header>

          {/* Quick Stats */}
          <section 
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            <DashboardCard 
              title="Total Inventory"
              value="1,249"
              description="items tracked"
              icon={<Package className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            
            <DashboardCard 
              title="Active Deliveries"
              value="26"
              description="in transit now"
              icon={<Truck className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
            />
            
            <DashboardCard 
              title="Low Stock Alerts"
              value="8"
              description="items need attention"
              icon={<AlertTriangle className="h-5 w-5" />}
              trend={{ value: 2, isPositive: false }}
            />
            
            <DashboardCard 
              title="On-time Delivery"
              value="94%"
              description="last 30 days"
              icon={<Clock className="h-5 w-5" />}
              trend={{ value: 3, isPositive: true }}
            />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glassmorphism rounded-xl p-5 animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-medium flex items-center gap-2">
                  <PackageSearch className="h-5 w-5 text-primary" />
                  <span>Inventory Trends</span>
                </h2>
                <div className="text-xs text-muted-foreground">Last 7 months</div>
              </div>
              
              <div className="h-[240px] w-full">
                <Chart>
                  <Line
                    type="monotone"
                    dataKey="value"
                    data={inventoryData}
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    activeDot={{ fill: "hsl(var(--primary))", r: 6, strokeWidth: 0 }}
                  />
                </Chart>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-5 animate-scale-in" style={{ animationDelay: '300ms' }}>
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-medium flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Delivery Volume</span>
                </h2>
                <div className="text-xs text-muted-foreground">Last 7 months</div>
              </div>
              
              <div className="h-[240px] w-full">
                <Chart>
                  <Line
                    type="monotone"
                    dataKey="value"
                    data={deliveryData}
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))", r: 4 }}
                    activeDot={{ fill: "hsl(var(--accent))", r: 6, strokeWidth: 0 }}
                  />
                </Chart>
              </div>
            </div>
          </section>

          {/* Quick Access */}
          <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-lg font-medium mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/inventory" className="bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-xl p-5 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <PackageSearch className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Manage Inventory</h3>
                </div>
                <p className="text-sm text-muted-foreground">Track, update, and manage all pharmaceutical instruments</p>
              </Link>
              
              <Link to="/deliveries" className="bg-accent/5 hover:bg-accent/10 border border-accent/10 rounded-xl p-5 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-accent/10 p-2 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Truck className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Deliveries</h3>
                </div>
                <p className="text-sm text-muted-foreground">Schedule and track instrument deliveries to healthcare providers</p>
              </Link>
              
              <div className="bg-muted/50 hover:bg-muted border border-muted rounded-xl p-5 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-muted p-2 rounded-lg text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Low Stock</h3>
                </div>
                <p className="text-sm text-muted-foreground">View and address items that require immediate attention</p>
              </div>
            </div>
          </section>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default Index;
