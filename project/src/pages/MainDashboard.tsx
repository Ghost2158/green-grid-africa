import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  MapPin, 
  AlertTriangle,
  Sun,
  Battery,
  Activity,
  Users
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { EnergyChart } from '../components/charts/EnergyChart';
import { SiteMap } from '../components/maps/SiteMap';
import { AlertPanel } from '../components/alerts/AlertPanel';
import { mockSites, mockAlerts, mockPredictions } from '../utils/mockData';

export const MainDashboard: React.FC = () => {
  const totalCapacity = mockSites.reduce((sum, site) => sum + site.capacity, 0);
  const totalOutput = mockSites.reduce((sum, site) => sum + site.currentOutput, 0);
  const averageEfficiency = mockSites.reduce((sum, site) => sum + site.efficiency, 0) / mockSites.length;
  const activeSites = mockSites.filter(site => site.status === 'online').length;

  // Generate chart data
  const chartData = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date().getHours() - 23 + i;
    const normalizedHour = hour < 0 ? 24 + hour : hour;
    
    let output = 0;
    if (normalizedHour >= 6 && normalizedHour <= 18) {
      const solarCurve = Math.sin(((normalizedHour - 6) / 12) * Math.PI);
      output = Math.max(0, solarCurve * totalOutput + Math.random() * 10000 - 5000);
    }
    
    return {
      time: `${normalizedHour.toString().padStart(2, '0')}:00`,
      actual: Math.max(0, output),
      predicted: mockPredictions[i]?.predictedOutput || 0,
      temperature: 25 + Math.random() * 10
    };
  });

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Capacity"
          value={Math.round(totalCapacity / 1000)}
          unit="MW"
          icon={Zap}
          color="primary"
          change={{ value: 5.2, type: 'increase' }}
        />
        <MetricCard
          title="Current Output"
          value={Math.round(totalOutput / 1000)}
          unit="MW"
          icon={Sun}
          color="solar"
          change={{ value: 12.8, type: 'increase' }}
        />
        <MetricCard
          title="System Efficiency"
          value={Math.round(averageEfficiency)}
          unit="%"
          icon={Activity}
          color="success"
          change={{ value: 2.1, type: 'increase' }}
        />
        <MetricCard
          title="Active Sites"
          value={activeSites}
          unit={`of ${mockSites.length}`}
          icon={MapPin}
          color="grid"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Production Chart */}
        <div className="lg:col-span-2">
          <Card title="Energy Production" subtitle="Real-time vs Predicted Output">
            <EnergyChart 
              data={chartData} 
              type="area" 
              showPrediction={true}
            />
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span>Actual Output</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-solar-500 rounded-full border-2 border-solar-500" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, white 2px, white 4px)' }}></div>
                <span>AI Prediction</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card title="Today's Performance">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Peak Output</span>
                <span className="font-semibold">142.5 MW</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Energy Generated</span>
                <span className="font-semibold">2,847 MWh</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CO₂ Avoided</span>
                <span className="font-semibold text-green-600">1,423 tons</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-semibold">$284,700</span>
              </div>
            </div>
          </Card>

          <Card title="AI Insights">
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Optimization Opportunity</span>
                </div>
                <p className="text-xs text-green-700">
                  Adjusting panel angles could increase output by 8.5%
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Battery className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Weather Forecast</span>
                </div>
                <p className="text-xs text-blue-700">
                  Clear skies expected for next 3 days - optimal conditions
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Site Map and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Site Overview" subtitle="Real-time status across all locations">
          <SiteMap sites={mockSites} />
        </Card>

        <Card title="System Alerts" subtitle="Recent notifications and warnings">
          <div className="max-h-96 overflow-y-auto">
            <AlertPanel alerts={mockAlerts} />
          </div>
        </Card>
      </div>
    </div>
  );
};