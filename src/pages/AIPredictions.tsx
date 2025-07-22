import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Sun, 
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  Settings,
  Download,
  RefreshCw
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
  AreaChart, 
  Area,
  BarChart,
  Bar,
  ComposedChart,
  ScatterChart,
  Scatter
} from 'recharts';
import { mockSites } from '../utils/mockData';

interface WeatherPrediction {
  timestamp: Date;
  temperature: number;
  humidity: number;
  cloudCover: number;
  windSpeed: number;
  solarIrradiance: number;
  precipitation: number;
}

interface EnergyForecast {
  timestamp: Date;
  predictedGeneration: number;
  confidence: number;
  weatherImpact: number;
  maintenanceImpact: number;
  demandForecast: number;
}

interface MLModel {
  id: string;
  name: string;
  type: 'generation' | 'weather' | 'demand' | 'maintenance';
  accuracy: number;
  lastTrained: Date;
  status: 'active' | 'training' | 'updating';
  predictions: number;
}

export const AIPredictions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeHorizon, setTimeHorizon] = useState('24h');
  const [selectedModel, setSelectedModel] = useState('all');
  const [weatherPredictions, setWeatherPredictions] = useState<WeatherPrediction[]>([]);
  const [energyForecasts, setEnergyForecasts] = useState<EnergyForecast[]>([]);
  const [mlModels, setMLModels] = useState<MLModel[]>([]);

  useEffect(() => {
    generatePredictions();
    generateMLModels();
  }, [timeHorizon]);

  const generatePredictions = () => {
    const hours = timeHorizon === '24h' ? 24 : timeHorizon === '7d' ? 168 : 720;
    const interval = timeHorizon === '24h' ? 1 : timeHorizon === '7d' ? 6 : 24;
    
    const weather: WeatherPrediction[] = [];
    const energy: EnergyForecast[] = [];
    const now = new Date();

    for (let i = 0; i < hours; i += interval) {
      const timestamp = new Date(now.getTime() + (i * 60 * 60 * 1000));
      const hour = timestamp.getHours();
      const dayOfYear = Math.floor((timestamp.getTime() - new Date(timestamp.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      
      // Weather prediction with seasonal patterns
      const seasonalTemp = 25 + 10 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
      const dailyTempVariation = 8 * Math.sin(((hour - 6) / 12) * Math.PI);
      const temperature = seasonalTemp + dailyTempVariation + (Math.random() - 0.5) * 5;
      
      const humidity = 50 + 30 * Math.sin((dayOfYear / 365) * 2 * Math.PI + Math.PI) + (Math.random() - 0.5) * 20;
      const cloudCover = Math.max(0, Math.min(100, 30 + (Math.random() - 0.5) * 60));
      const windSpeed = 5 + Math.random() * 15;
      const precipitation = cloudCover > 70 ? Math.random() * 10 : 0;
      
      // Solar irradiance based on time, clouds, and season
      let solarIrradiance = 0;
      if (hour >= 6 && hour <= 18) {
        const solarCurve = Math.sin(((hour - 6) / 12) * Math.PI);
        const cloudReduction = (100 - cloudCover) / 100;
        const seasonalFactor = 0.8 + 0.4 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
        solarIrradiance = solarCurve * 1000 * cloudReduction * seasonalFactor;
      }

      weather.push({
        timestamp,
        temperature,
        humidity,
        cloudCover,
        windSpeed,
        solarIrradiance,
        precipitation
      });

      // Energy forecast based on weather and other factors
      const totalCapacity = mockSites.reduce((sum, site) => sum + site.capacity, 0);
      const weatherEfficiency = (solarIrradiance / 1000) * (temperature < 35 ? 1 : 0.95) * ((100 - humidity) / 100 * 0.1 + 0.9);
      const predictedGeneration = totalCapacity * weatherEfficiency;
      
      const confidence = 0.85 + (Math.random() - 0.5) * 0.2;
      const weatherImpact = cloudCover > 50 ? -0.3 : cloudCover < 20 ? 0.2 : 0;
      const maintenanceImpact = Math.random() > 0.9 ? -0.1 : 0;
      const demandForecast = 150000 + 50000 * Math.sin(((hour - 12) / 12) * Math.PI) + (Math.random() - 0.5) * 20000;

      energy.push({
        timestamp,
        predictedGeneration,
        confidence,
        weatherImpact,
        maintenanceImpact,
        demandForecast
      });
    }

    setWeatherPredictions(weather);
    setEnergyForecasts(energy);
  };

  const generateMLModels = () => {
    const models: MLModel[] = [
      {
        id: 'solar-gen-lstm',
        name: 'Solar Generation LSTM',
        type: 'generation',
        accuracy: 94.2,
        lastTrained: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'active',
        predictions: 15420
      },
      {
        id: 'weather-cnn',
        name: 'Weather Forecast CNN',
        type: 'weather',
        accuracy: 89.7,
        lastTrained: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'active',
        predictions: 8930
      },
      {
        id: 'demand-prophet',
        name: 'Demand Prophet Model',
        type: 'demand',
        accuracy: 91.5,
        lastTrained: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'training',
        predictions: 12100
      },
      {
        id: 'maintenance-rf',
        name: 'Maintenance Random Forest',
        type: 'maintenance',
        accuracy: 87.3,
        lastTrained: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'active',
        predictions: 3450
      }
    ];

    setMLModels(models);
  };

  const formatChartData = () => {
    return energyForecasts.map((forecast, index) => ({
      time: timeHorizon === '24h' 
        ? forecast.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : forecast.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      predicted: forecast.predictedGeneration / 1000,
      demand: forecast.demandForecast / 1000,
      confidence: forecast.confidence * 100,
      weather: weatherPredictions[index]?.solarIrradiance || 0,
      temperature: weatherPredictions[index]?.temperature || 0,
      cloudCover: weatherPredictions[index]?.cloudCover || 0
    }));
  };

  const avgAccuracy = mlModels.reduce((sum, model) => sum + model.accuracy, 0) / mlModels.length;
  const totalPredictions = mlModels.reduce((sum, model) => sum + model.predictions, 0);
  const activeModels = mlModels.filter(model => model.status === 'active').length;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* AI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Model Accuracy"
          value={avgAccuracy.toFixed(1)}
          unit="%"
          icon={Target}
          color="success"
          change={{ value: 2.3, type: 'increase' }}
        />
        <MetricCard
          title="Active Models"
          value={activeModels}
          unit={`of ${mlModels.length}`}
          icon={Brain}
          color="primary"
        />
        <MetricCard
          title="Predictions Made"
          value={totalPredictions.toLocaleString()}
          icon={Activity}
          color="solar"
          change={{ value: 15.7, type: 'increase' }}
        />
        <MetricCard
          title="Forecast Horizon"
          value={timeHorizon === '24h' ? '24' : timeHorizon === '7d' ? '7' : '30'}
          unit={timeHorizon === '24h' ? 'hours' : 'days'}
          icon={Clock}
          color="grid"
        />
      </div>

      {/* Main Prediction Chart */}
      <Card title="AI Energy Generation Forecast" subtitle="Machine learning predictions with confidence intervals">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select 
              value={timeHorizon} 
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="24h">Next 24 Hours</option>
              <option value="7d">Next 7 Days</option>
              <option value="30d">Next 30 Days</option>
            </select>
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Models</option>
              <option value="generation">Generation Only</option>
              <option value="weather">Weather Impact</option>
              <option value="demand">Demand Forecast</option>
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
            <ComposedChart data={formatChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} label={{ value: 'MW', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="predicted" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              <Line type="monotone" dataKey="demand" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
              <Bar dataKey="confidence" fill="#8b5cf6" opacity={0.3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Predicted Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Demand Forecast</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full opacity-30"></div>
            <span>Confidence Level</span>
          </div>
        </div>
      </Card>

      {/* Weather Impact and Model Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weather Impact Analysis" subtitle="Environmental factors affecting generation">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={formatChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="weather" stroke="#666" fontSize={12} label={{ value: 'Solar Irradiance (W/m²)', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#666" fontSize={12} label={{ value: 'Generation (MW)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Scatter dataKey="predicted" fill="#22c55e" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Model Performance" subtitle="AI model accuracy and status">
          <div className="space-y-4">
            {mlModels.map((model) => (
              <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    model.status === 'active' ? 'bg-green-500' :
                    model.status === 'training' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">{model.name}</div>
                    <div className="text-sm text-gray-500">{model.type} model</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{model.accuracy.toFixed(1)}% accuracy</div>
                  <div className="text-xs text-gray-500">{model.predictions.toLocaleString()} predictions</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderWeatherForecast = () => (
    <div className="space-y-6">
      <Card title="Weather Forecast" subtitle="AI-powered meteorological predictions">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Temperature & Humidity</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Cloud Cover Impact</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formatChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="cloudCover" stroke="#64748b" fill="#64748b" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weatherPredictions.slice(0, 4).map((weather, index) => (
          <Card key={index} title={`${index === 0 ? 'Now' : `+${index * (timeHorizon === '24h' ? 6 : 24)}h`}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className="font-medium">{weather.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className="font-medium">{weather.humidity.toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CloudRain className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Cloud Cover</span>
                </div>
                <span className="font-medium">{weather.cloudCover.toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Irradiance</span>
                </div>
                <span className="font-medium">{Math.round(weather.solarIrradiance)} W/m²</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderModelManagement = () => (
    <div className="space-y-6">
      <Card title="AI Model Management" subtitle="Monitor and manage machine learning models">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Model</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Accuracy</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Trained</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mlModels.map((model) => (
                <tr key={model.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{model.name}</div>
                    <div className="text-sm text-gray-500">{model.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      model.type === 'generation' ? 'bg-green-100 text-green-800' :
                      model.type === 'weather' ? 'bg-blue-100 text-blue-800' :
                      model.type === 'demand' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {model.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${model.accuracy}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{model.accuracy.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      model.status === 'active' ? 'bg-green-100 text-green-800' :
                      model.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {model.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {model.lastTrained.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-yellow-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Training Progress" subtitle="Model improvement over time">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mlModels.map((model, index) => ({
                name: model.name.split(' ')[0],
                accuracy: model.accuracy,
                predictions: model.predictions / 1000
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Prediction Volume" subtitle="Model usage statistics">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mlModels.map(model => ({
                name: model.name.split(' ')[0],
                predictions: model.predictions
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip />
                <Bar dataKey="predictions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'AI Overview', icon: Brain },
    { id: 'generation', name: 'Generation Forecast', icon: Zap },
    { id: 'weather', name: 'Weather Predictions', icon: CloudRain },
    { id: 'models', name: 'Model Management', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <Brain className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">AI Predictions</h1>
            <p className="text-purple-100">Advanced machine learning forecasting and analytics</p>
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
                    ? 'border-purple-500 text-purple-600'
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
      {activeTab === 'generation' && (
        <Card title="Generation Forecast Details" subtitle="Detailed energy generation predictions">
          <div className="p-8 text-center text-gray-500">
            Detailed generation forecasting interface coming soon
          </div>
        </Card>
      )}
      {activeTab === 'weather' && renderWeatherForecast()}
      {activeTab === 'models' && renderModelManagement()}
    </div>
  );
};