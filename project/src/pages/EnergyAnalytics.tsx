import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Sun, 
  Battery,
  DollarSign,
  Leaf,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Target,
  Activity,
  PieChart
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Pie
} from 'recharts';
import { mockSites } from '../utils/mockData';

interface EnergyData {
  timestamp: Date;
  totalGeneration: number;
  totalConsumption: number;
  gridExport: number;
  efficiency: number;
  revenue: number;
  carbonOffset: number;
}

interface SitePerformance {
  siteId: string;
  siteName: string;
  generation: number;
  efficiency: number;
  revenue: number;
  capacity: number;
}

export const EnergyAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('generation');
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [sitePerformance, setSitePerformance] = useState<SitePerformance[]>([]);

  useEffect(() => {
    generateEnergyData();
    generateSitePerformance();
  }, [timeRange]);

  const generateEnergyData = () => {
    const data: EnergyData[] = [];
    const now = new Date();
    const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
    const interval = timeRange === '24h' ? 1 : timeRange === '7d' ? 24 : 24;

    for (let i = 0; i < hours; i += interval) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
      const hour = timestamp.getHours();
      
      // Simulate solar generation curve
      let generation = 0;
      if (hour >= 6 && hour <= 18) {
        const solarCurve = Math.sin(((hour - 6) / 12) * Math.PI);
        generation = solarCurve * 180000 + Math.random() * 20000;
      }
      
      const consumption = generation * (0.7 + Math.random() * 0.3);
      const gridExport = Math.max(0, generation - consumption);
      const efficiency = 85 + Math.random() * 10;
      const revenue = (generation / 1000) * 0.12; // $0.12 per kWh
      const carbonOffset = (generation / 1000) * 0.5; // 0.5 tons CO2 per MWh

      data.unshift({
        timestamp,
        totalGeneration: generation,
        totalConsumption: consumption,
        gridExport,
        efficiency,
        revenue,
        carbonOffset
      });
    }

    setEnergyData(data);
  };

  const generateSitePerformance = () => {
    const performance: SitePerformance[] = mockSites.map(site => ({
      siteId: site.id,
      siteName: site.name,
      generation: site.currentOutput,
      efficiency: site.efficiency,
      revenue: (site.currentOutput / 1000) * 0.12 * 24, // Daily revenue
      capacity: site.capacity
    }));

    setSitePerformance(performance);
  };

  const formatChartData = () => {
    return energyData.map(data => ({
      time: timeRange === '24h' 
        ? data.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : data.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      generation: data.totalGeneration / 1000,
      consumption: data.totalConsumption / 1000,
      export: data.gridExport / 1000,
      efficiency: data.efficiency,
      revenue: data.revenue,
      carbonOffset: data.carbonOffset
    }));
  };

  const totalGeneration = energyData.reduce((sum, data) => sum + data.totalGeneration, 0) / 1000;
  const totalRevenue = energyData.reduce((sum, data) => sum + data.revenue, 0);
  const totalCarbonOffset = energyData.reduce((sum, data) => sum + data.carbonOffset, 0);
  const avgEfficiency = energyData.reduce((sum, data) => sum + data.efficiency, 0) / energyData.length;

  const pieData = [
    { name: 'Solar Generation', value: totalGeneration * 0.8, color: '#22c55e' },
    { name: 'Grid Import', value: totalGeneration * 0.2, color: '#64748b' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Generation"
          value={Math.round(totalGeneration)}
          unit="MWh"
          icon={Zap}
          color="primary"
          change={{ value: 12.5, type: 'increase' }}
        />
        <MetricCard
          title="System Efficiency"
          value={Math.round(avgEfficiency)}
          unit="%"
          icon={Activity}
          color="success"
          change={{ value: 3.2, type: 'increase' }}
        />
        <MetricCard
          title="Revenue Generated"
          value={`$${Math.round(totalRevenue).toLocaleString()}`}
          icon={DollarSign}
          color="solar"
          change={{ value: 8.7, type: 'increase' }}
        />
        <MetricCard
          title="Carbon Offset"
          value={Math.round(totalCarbonOffset)}
          unit="tons CO₂"
          icon={Leaf}
          color="success"
          change={{ value: 15.3, type: 'increase' }}
        />
      </div>

      {/* Main Chart */}
      <Card title="Energy Flow Analysis" subtitle="Generation, consumption, and grid export">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <select 
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="generation">Generation vs Consumption</option>
              <option value="efficiency">Efficiency Trends</option>
              <option value="revenue">Revenue Analysis</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetric === 'generation' ? (
              <ComposedChart data={formatChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="generation" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                <Area type="monotone" dataKey="consumption" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Line type="monotone" dataKey="export" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }} />
              </ComposedChart>
            ) : selectedMetric === 'efficiency' ? (
              <LineChart data={formatChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} />
              </LineChart>
            ) : (
              <BarChart data={formatChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} label={{ value: '$', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Energy Mix and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Energy Mix" subtitle="Source distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)} MWh`, 'Energy']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Performance Targets" subtitle="Goal tracking and achievements">
          <div className="space-y-4">
            {[
              { name: 'Daily Generation Target', current: 2847, target: 3000, unit: 'MWh' },
              { name: 'Efficiency Target', current: avgEfficiency, target: 90, unit: '%' },
              { name: 'Revenue Target', current: totalRevenue, target: totalRevenue * 1.2, unit: '$' },
              { name: 'Carbon Offset Goal', current: totalCarbonOffset, target: totalCarbonOffset * 1.5, unit: 'tons' }
            ].map((target, index) => {
              const percentage = (target.current / target.target) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{target.name}</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(target.current)} / {Math.round(target.target)} {target.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${percentage >= 100 ? 'bg-green-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {percentage.toFixed(1)}% of target achieved
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSiteComparison = () => (
    <div className="space-y-6">
      <Card title="Site Performance Comparison" subtitle="Detailed analysis across all locations">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Site</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Generation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Efficiency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Capacity Factor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {sitePerformance.map((site) => {
                const capacityFactor = (site.generation / site.capacity) * 100;
                return (
                  <tr key={site.siteId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{site.siteName}</div>
                      <div className="text-sm text-gray-500">{(site.capacity / 1000).toFixed(0)}MW Capacity</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{(site.generation / 1000).toFixed(1)} MW</div>
                      <div className="text-sm text-gray-500">Current Output</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${site.efficiency}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{site.efficiency.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{capacityFactor.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500">of Capacity</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-green-600">${site.revenue.toFixed(0)}</div>
                      <div className="text-sm text-gray-500">Daily</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        site.efficiency > 85 ? 'bg-green-100 text-green-800' :
                        site.efficiency > 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {site.efficiency > 85 ? 'Excellent' : site.efficiency > 75 ? 'Good' : 'Needs Attention'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Site Generation Trends" subtitle="Comparative performance over time">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sitePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="siteName" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} label={{ value: 'MW', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="generation" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Energy Overview', icon: BarChart3 },
    { id: 'sites', name: 'Site Comparison', icon: Target },
    { id: 'trends', name: 'Historical Trends', icon: TrendingUp },
    { id: 'forecasting', name: 'Energy Forecasting', icon: Activity }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <BarChart3 className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">Energy Analytics</h1>
            <p className="text-blue-100">Comprehensive energy performance analysis and insights</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'sites' && renderSiteComparison()}
      {activeTab === 'trends' && (
        <Card title="Historical Trends" subtitle="Long-term performance analysis">
          <div className="p-8 text-center text-gray-500">
            Historical trends analysis coming soon with advanced time-series data
          </div>
        </Card>
      )}
      {activeTab === 'forecasting' && (
        <Card title="Energy Forecasting" subtitle="Predictive analytics for future planning">
          <div className="p-8 text-center text-gray-500">
            Advanced forecasting models coming soon
          </div>
        </Card>
      )}
    </div>
  );
};