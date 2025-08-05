import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  Thermometer, 
  Droplets, 
  Sun, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Activity,
  Wrench
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { SensorChart } from '../components/charts/SensorChart';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockSites, mockRecommendations } from '../utils/mockData';

export const OperatorDashboard: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState(mockSites[0]);
  
  // Generate sensor data for charts
  const sensorData = selectedSite.sensors.slice(-12).map(sensor => ({
    time: sensor.timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    temperature: sensor.temperature,
    humidity: sensor.humidity,
    solarIrradiance: sensor.solarIrradiance
  }));

  const criticalRecommendations = mockRecommendations.filter(rec => 
    rec.priority === 'critical' || rec.priority === 'high'
  );

  return (
    <div className="space-y-6">
      {/* Site Selection */}
      <Card title="Site Control Center" subtitle="Select a site to monitor and control">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockSites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedSite.id === site.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{site.name}</h4>
                <StatusBadge status={site.status} size="sm" />
              </div>
              <div className="text-sm text-gray-600">
                <div>Capacity: {(site.capacity / 1000).toFixed(0)}MW</div>
                <div>Output: {(site.currentOutput / 1000).toFixed(1)}MW</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Selected Site Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Power Output"
          value={Math.round(selectedSite.currentOutput / 1000)}
          unit="MW"
          icon={Zap}
          color="primary"
          change={{ value: 3.2, type: 'increase' }}
        />
        <MetricCard
          title="Efficiency"
          value={selectedSite.efficiency}
          unit="%"
          icon={Activity}
          color="success"
        />
        <MetricCard
          title="Temperature"
          value={selectedSite.sensors[0]?.temperature.toFixed(1) || '0'}
          unit="°C"
          icon={Thermometer}
          color="warning"
        />
        <MetricCard
          title="Solar Irradiance"
          value={Math.round(selectedSite.sensors[0]?.solarIrradiance || 0)}
          unit="W/m²"
          icon={Sun}
          color="solar"
        />
      </div>

      {/* Sensor Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Temperature Monitoring" subtitle="Last 12 hours">
          <SensorChart data={sensorData} metric="temperature" />
        </Card>
        <Card title="Humidity Levels" subtitle="Environmental conditions">
          <SensorChart data={sensorData} metric="humidity" />
        </Card>
        <Card title="Solar Irradiance" subtitle="Solar energy availability">
          <SensorChart data={sensorData} metric="solarIrradiance" />
        </Card>
      </div>

      {/* System Controls and AI Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Controls */}
        <Card title="System Controls" subtitle="Operational management">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Start System</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">Emergency Stop</span>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Panel Tracking</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">AI Optimization</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Diagnostics */}
        <Card title="AI Diagnostics" subtitle="Critical recommendations">
          <div className="space-y-3">
            {criticalRecommendations.map((rec) => (
              <div key={rec.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Wrench className="w-4 h-4 text-blue-600" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.priority === 'critical' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {rec.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{rec.impact}</span>
                  <button className="px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 transition-colors">
                    Apply Fix
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Device Status Grid */}
      <Card title="Device Status" subtitle="Hardware monitoring and diagnostics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Inverter #1', status: 'online', temp: '42°C', load: '85%' },
            { name: 'Inverter #2', status: 'online', temp: '38°C', load: '92%' },
            { name: 'Inverter #3', status: 'warning', temp: '55°C', load: '78%' },
            { name: 'Battery Bank', status: 'online', temp: '25°C', load: '67%' },
          ].map((device, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">{device.name}</h5>
                <StatusBadge status={device.status as any} size="sm" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Temperature:</span>
                  <span className="font-medium">{device.temp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Load:</span>
                  <span className="font-medium">{device.load}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};