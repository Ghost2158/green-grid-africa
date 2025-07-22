import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Zap, 
  TrendingUp, 
  Battery,
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  Clock,
  Target,
  Award,
  Leaf,
  DollarSign,
  Settings,
  Eye,
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
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';

interface UserSolarSetup {
  panelCount: number;
  panelCapacity: number; // watts per panel
  totalCapacity: number; // total kW
  installationDate: Date;
  panelType: string;
  inverterEfficiency: number;
  batteryCapacity?: number; // kWh
  location: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
}

interface SolarPrediction {
  timestamp: Date;
  predictedGeneration: number; // kWh
  confidence: number;
  weatherFactor: number;
  temperature: number;
  solarIrradiance: number;
  cloudCover: number;
  efficiency: number;
}

interface WeatherCondition {
  time: string;
  condition: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy';
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
}

export const ConsumerDashboard: React.FC = () => {
  const { authState } = useAuth();
  const [timeHorizon, setTimeHorizon] = useState('24h');
  const [predictions, setPredictions] = useState<SolarPrediction[]>([]);
  const [weatherForecast, setWeatherForecast] = useState<WeatherCondition[]>([]);
  const [userSetup, setUserSetup] = useState<UserSolarSetup | null>(null);

  // Mock user solar setup - in real app, this would come from user profile
  useEffect(() => {
    const mockSetup: UserSolarSetup = {
      panelCount: 12,
      panelCapacity: 400, // 400W per panel
      totalCapacity: 4.8, // 4.8 kW total
      installationDate: new Date('2023-06-15'),
      panelType: 'Monocrystalline Silicon',
      inverterEfficiency: 96,
      batteryCapacity: 10, // 10 kWh battery storage
      location: {
        city: 'Lagos',
        country: 'Nigeria',
        lat: 6.5244,
        lng: 3.3792
      }
    };
    setUserSetup(mockSetup);
    generatePredictions(mockSetup);
    generateWeatherForecast();
  }, [timeHorizon]);

  const generatePredictions = (setup: UserSolarSetup) => {
    const predictions: SolarPrediction[] = [];
    const now = new Date();
    const hours = timeHorizon === '24h' ? 24 : timeHorizon === '7d' ? 168 : 720;
    const interval = timeHorizon === '24h' ? 1 : timeHorizon === '7d' ? 6 : 24;

    for (let i = 0; i < hours; i += interval) {
      const timestamp = new Date(now.getTime() + (i * 60 * 60 * 1000));
      const hour = timestamp.getHours();
      const dayOfYear = Math.floor((timestamp.getTime() - new Date(timestamp.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      
      // Solar generation calculation
      let solarIrradiance = 0;
      let generation = 0;
      
      if (hour >= 6 && hour <= 18) {
        const solarCurve = Math.sin(((hour - 6) / 12) * Math.PI);
        const seasonalFactor = 0.8 + 0.4 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
        solarIrradiance = solarCurve * 1000 * seasonalFactor * (0.8 + Math.random() * 0.4);
        
        // Generation = Panel Capacity × Solar Irradiance × Efficiency × Weather Factor
        const temperature = 25 + 10 * Math.sin((dayOfYear / 365) * 2 * Math.PI) + 8 * Math.sin(((hour - 6) / 12) * Math.PI);
        const tempFactor = temperature > 25 ? 1 - ((temperature - 25) * 0.004) : 1;
        const cloudCover = Math.random() * 60;
        const weatherFactor = (100 - cloudCover) / 100;
        
        generation = (setup.totalCapacity * (solarIrradiance / 1000) * (setup.inverterEfficiency / 100) * tempFactor * weatherFactor);
        
        predictions.push({
          timestamp,
          predictedGeneration: Math.max(0, generation),
          confidence: 0.85 + (Math.random() * 0.1),
          weatherFactor,
          temperature,
          solarIrradiance,
          cloudCover,
          efficiency: tempFactor * weatherFactor * (setup.inverterEfficiency / 100) * 100
        });
      } else {
        predictions.push({
          timestamp,
          predictedGeneration: 0,
          confidence: 0.95,
          weatherFactor: 0,
          temperature: 20 + Math.random() * 10,
          solarIrradiance: 0,
          cloudCover: Math.random() * 40,
          efficiency: 0
        });
      }
    }

    setPredictions(predictions);
  };

  const generateWeatherForecast = () => {
    const forecast: WeatherCondition[] = [];
    const conditions: ('sunny' | 'partly-cloudy' | 'cloudy' | 'rainy')[] = ['sunny', 'partly-cloudy', 'cloudy', 'rainy'];
    
    for (let i = 0; i < 24; i += 3) {
      const hour = (new Date().getHours() + i) % 24;
      forecast.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        temperature: 25 + Math.random() * 10,
        humidity: 40 + Math.random() * 40,
        windSpeed: 5 + Math.random() * 15,
        uvIndex: hour >= 6 && hour <= 18 ? 3 + Math.random() * 8 : 0
      });
    }
    
    setWeatherForecast(forecast);
  };

  const formatChartData = () => {
    return predictions.slice(0, timeHorizon === '24h' ? 24 : 48).map(pred => ({
      time: timeHorizon === '24h' 
        ? pred.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : pred.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      generation: pred.predictedGeneration,
      confidence: pred.confidence * 100,
      efficiency: pred.efficiency,
      temperature: pred.temperature,
      irradiance: pred.solarIrradiance / 10 // Scale for chart
    }));
  };

  const todayGeneration = predictions.slice(0, 24).reduce((sum, pred) => sum + pred.predictedGeneration, 0);
  const peakGeneration = Math.max(...predictions.slice(0, 24).map(pred => pred.predictedGeneration));
  const avgEfficiency = predictions.slice(0, 24).reduce((sum, pred) => sum + pred.efficiency, 0) / 24;
  const estimatedRevenue = todayGeneration * 0.12; // $0.12 per kWh

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'partly-cloudy': return <CloudSun className="w-6 h-6 text-yellow-400" />;
      case 'cloudy': return <CloudSun className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudSun className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  if (!userSetup) {
    return <div className="flex items-center justify-center h-64">Loading your solar setup...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Personal Solar Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Sun className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Solar System</h1>
                <p className="text-yellow-100">Personal energy generation predictions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{userSetup.totalCapacity} kW</div>
              <div className="text-yellow-100">{userSetup.panelCount} Solar Panels</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Today's Generation</span>
              </div>
              <div className="text-2xl font-bold">{todayGeneration.toFixed(1)} kWh</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Peak Output</span>
              </div>
              <div className="text-2xl font-bold">{peakGeneration.toFixed(2)} kW</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Efficiency</span>
              </div>
              <div className="text-2xl font-bold">{avgEfficiency.toFixed(1)}%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">Est. Revenue</span>
              </div>
              <div className="text-2xl font-bold">${estimatedRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Solar Generation Prediction Chart */}
      <Card title="Solar Generation Forecast" subtitle="AI-powered predictions for your solar system">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select 
              value={timeHorizon} 
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
            >
              <option value="24h">Next 24 Hours</option>
              <option value="7d">Next 7 Days</option>
              <option value="30d">Next 30 Days</option>
            </select>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Predictions</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="h-96 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={formatChartData()}>
              <defs>
                <linearGradient id="generationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} label={{ value: 'kW', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => [
                  `${value.toFixed(2)} ${name === 'generation' ? 'kW' : name === 'confidence' ? '%' : ''}`,
                  name === 'generation' ? 'Generation' : name === 'confidence' ? 'Confidence' : name
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="generation" 
                stroke="#f59e0b" 
                fill="url(#generationGradient)"
                strokeWidth={3}
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#10b981" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            <span>Predicted Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-green-500 rounded-full" style={{ 
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #10b981 2px, #10b981 4px)' 
            }}></div>
            <span>Confidence Level</span>
          </div>
        </div>
      </Card>

      {/* System Overview and Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Information */}
        <Card title="Your Solar System" subtitle="Installation details and specifications">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Sun className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-900">{userSetup.panelCount}</div>
                    <div className="text-sm text-blue-700">Solar Panels</div>
                  </div>
                </div>
                <div className="text-xs text-blue-600">
                  {userSetup.panelCapacity}W each • {userSetup.panelType}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-900">{userSetup.totalCapacity}</div>
                    <div className="text-sm text-green-700">kW Capacity</div>
                  </div>
                </div>
                <div className="text-xs text-green-600">
                  {userSetup.inverterEfficiency}% Inverter Efficiency
                </div>
              </div>
            </div>
            
            {userSetup.batteryCapacity && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <Battery className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-900">{userSetup.batteryCapacity} kWh</div>
                    <div className="text-sm text-purple-700">Battery Storage</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Installation Date</span>
                <span className="font-medium">{userSetup.installationDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">{userSetup.location.city}, {userSetup.location.country}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Weather Forecast */}
        <Card title="Weather Forecast" subtitle="Conditions affecting your solar generation">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {weatherForecast.slice(0, 4).map((weather, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="text-xs text-gray-500 mb-2">{weather.time}</div>
                  <div className="mb-2">{getWeatherIcon(weather.condition)}</div>
                  <div className="text-sm font-bold text-gray-900">{weather.temperature.toFixed(0)}°C</div>
                  <div className="text-xs text-gray-600 capitalize">{weather.condition.replace('-', ' ')}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Humidity</span>
                </div>
                <span className="text-sm font-medium">{weatherForecast[0]?.humidity.toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Wind Speed</span>
                </div>
                <span className="text-sm font-medium">{weatherForecast[0]?.windSpeed.toFixed(1)} m/s</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Daily Performance" subtitle="Today's generation pattern">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formatChartData().slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip />
                <Bar dataKey="generation" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Efficiency Trends" subtitle="System performance over time">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formatChartData().slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip />
                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Environmental Impact" subtitle="Your contribution to sustainability">
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">
                {(todayGeneration * 0.5).toFixed(1)} kg
              </div>
              <div className="text-sm text-green-600">CO₂ Offset Today</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly CO₂ Saved</span>
                <span className="font-medium text-green-600">{(todayGeneration * 0.5 * 30).toFixed(0)} kg</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Trees Equivalent</span>
                <span className="font-medium text-green-600">{Math.round(todayGeneration * 0.5 * 30 / 22)} trees</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Cars Off Road</span>
                <span className="font-medium text-green-600">{Math.round(todayGeneration * 0.5 * 30 / 404)} days</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights and Recommendations */}
      <Card title="AI Insights & Recommendations" subtitle="Personalized optimization suggestions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-blue-900">Peak Optimization</h4>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Your system will generate peak power between 11 AM - 2 PM today. Consider running high-energy appliances during this window.
            </p>
            <div className="text-xs text-blue-600 font-medium">
              Potential savings: $2.50/day
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-green-900">Performance Alert</h4>
            </div>
            <p className="text-sm text-green-800 mb-3">
              Your system is performing 8% above expected efficiency! Clear weather conditions are optimal for generation.
            </p>
            <div className="text-xs text-green-600 font-medium">
              Extra generation: +0.4 kWh today
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-yellow-900">Maintenance Tip</h4>
            </div>
            <p className="text-sm text-yellow-800 mb-3">
              Panel cleaning recommended next week. Dust accumulation may reduce efficiency by 3-5% if not addressed.
            </p>
            <div className="text-xs text-yellow-600 font-medium">
              Schedule maintenance
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};