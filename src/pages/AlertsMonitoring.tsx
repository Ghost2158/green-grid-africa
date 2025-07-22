import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Zap, 
  Wrench, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sun,
  Thermometer,
  Droplets,
  Activity,
  Calendar,
  BarChart3,
  Settings
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  generateSolarPredictions, 
  generateMaintenancePredictions, 
  generateConsumerPredictions, 
  generateAIAlerts 
} from '../utils/aiPredictions';
import { AIGenerationPrediction, MaintenancePrediction, ConsumerPrediction, EnergyAlert } from '../types/ai';

export const AlertsMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [solarPredictions, setSolarPredictions] = useState<AIGenerationPrediction[]>([]);
  const [maintenancePredictions, setMaintenancePredictions] = useState<MaintenancePrediction[]>([]);
  const [consumerPredictions, setConsumerPredictions] = useState<ConsumerPrediction[]>([]);
  const [aiAlerts, setAiAlerts] = useState<EnergyAlert[]>([]);

  useEffect(() => {
    // Generate AI predictions and alerts
    setSolarPredictions(generateSolarPredictions());
    setMaintenancePredictions(generateMaintenancePredictions());
    setConsumerPredictions(generateConsumerPredictions());
    setAiAlerts(generateAIAlerts());
  }, []);

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const renderOverview = () => {
    const criticalAlerts = aiAlerts.filter(alert => alert.severity === 'critical').length;
    const warningAlerts = aiAlerts.filter(alert => alert.severity === 'warning').length;
    const totalPredictions = solarPredictions.length + maintenancePredictions.length + consumerPredictions.length;
    const avgConfidence = solarPredictions.reduce((sum, pred) => sum + pred.confidence, 0) / solarPredictions.length * 100;

    return (
      <div className="space-y-6">
        {/* AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Alerts"
            value={aiAlerts.length}
            icon={AlertTriangle}
            color={criticalAlerts > 0 ? 'error' : warningAlerts > 0 ? 'warning' : 'success'}
            change={{ value: 12, type: 'decrease' }}
          />
          <MetricCard
            title="AI Predictions"
            value={totalPredictions}
            icon={Brain}
            color="primary"
            change={{ value: 8, type: 'increase' }}
          />
          <MetricCard
            title="Prediction Accuracy"
            value={Math.round(avgConfidence)}
            unit="%"
            icon={TrendingUp}
            color="success"
            change={{ value: 3.2, type: 'increase' }}
          />
          <MetricCard
            title="Maintenance Tasks"
            value={maintenancePredictions.length}
            icon={Wrench}
            color="warning"
          />
        </div>

        {/* Real-time AI Alerts */}
        <Card title="AI-Generated Alerts" subtitle="Real-time intelligent monitoring and predictions">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {aiAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 p-4 rounded-r-lg transition-all duration-200 hover:shadow-md ${getAlertColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.severity)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">{alert.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          AI Generated
                        </span>
                        <span className="text-xs text-gray-500">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <div className="text-xs text-gray-500 mb-2">
                      <strong>Impact:</strong> {alert.estimatedImpact}
                    </div>
                    <div className="space-y-1">
                      <strong className="text-xs text-gray-700">AI Recommendations:</strong>
                      {alert.recommendations.map((rec, index) => (
                        <div key={index} className="text-xs text-gray-600 ml-2">
                          • {rec}
                        </div>
                      ))}
                    </div>
                    {alert.actionRequired && (
                      <button className="mt-2 px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 transition-colors">
                        Take Action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderSolarPredictions = () => {
    const chartData = solarPredictions.slice(0, 24).map(pred => ({
      time: pred.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      predicted: pred.predictedOutput / 1000,
      confidence: pred.confidence * 100,
      temperature: pred.inputFactors.temperature,
      humidity: pred.inputFactors.humidity,
      irradiance: pred.inputFactors.solarIrradiance
    }));

    return (
      <div className="space-y-6">
        <Card title="AI Solar Generation Predictions" subtitle="Based on Solar Irradiance, Temperature, and Humidity">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                <Line type="monotone" dataKey="predicted" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Environmental Factors" subtitle="Real-time sensor data">
            <div className="space-y-4">
              {solarPredictions.slice(0, 1).map(pred => (
                <div key={pred.id} className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">Solar Irradiance</span>
                    </div>
                    <span className="font-bold text-yellow-800">
                      {Math.round(pred.inputFactors.solarIrradiance)} W/m²
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-5 h-5 text-red-600" />
                      <span className="font-medium">Temperature</span>
                    </div>
                    <span className="font-bold text-red-800">
                      {pred.inputFactors.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Humidity</span>
                    </div>
                    <span className="font-bold text-blue-800">
                      {pred.inputFactors.humidity.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Prediction Confidence" subtitle="AI model accuracy">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.slice(0, 12)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="confidence" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Weather Impact Analysis" subtitle="Conditions affecting generation">
            <div className="space-y-3">
              {['Clear', 'Partly Cloudy', 'Cloudy'].map((condition, index) => {
                const count = solarPredictions.filter(p => p.weatherConditions === condition).length;
                const percentage = (count / solarPredictions.length) * 100;
                return (
                  <div key={condition} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{condition}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderMaintenancePredictions = () => (
    <div className="space-y-6">
      <Card title="Predictive Maintenance Schedule" subtitle="AI-powered maintenance recommendations">
        <div className="space-y-4">
          {maintenancePredictions.map((prediction) => (
            <div key={prediction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Wrench className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{prediction.siteName}</h4>
                    <p className="text-sm text-gray-600">{prediction.component}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    prediction.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    prediction.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    prediction.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {prediction.priority.toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {prediction.predictedDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{prediction.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-xs text-green-600">Impact</p>
                  <p className="font-semibold text-green-800">{prediction.impact}</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-xs text-blue-600">Cost Saving</p>
                  <p className="font-semibold text-blue-800">${prediction.costSaving.toFixed(0)}</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <p className="text-xs text-purple-600">Confidence</p>
                  <p className="font-semibold text-purple-800">{(prediction.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                <strong>Based on:</strong> {prediction.basedOn.join(', ')}
              </div>
              
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
                Schedule Maintenance
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderConsumerPredictions = () => {
    const monthlyData = consumerPredictions.filter(p => p.timeframe === 'monthly');
    
    return (
      <div className="space-y-6">
        <Card title="Consumer Energy Consumption Predictions" subtitle="AI-powered usage forecasting and rationalization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Monthly Consumption Forecast</h4>
              <div className="space-y-3">
                {monthlyData.map((prediction) => (
                  <div key={prediction.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{prediction.userName}</h5>
                      <span className="text-lg font-bold text-primary-600">
                        {Math.round(prediction.predictedConsumption)} kWh
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <strong>Peak Hours:</strong> {prediction.peakHours.join(', ')}
                    </div>
                    <div className="space-y-2">
                      <strong className="text-sm text-gray-700">Energy Rationalization:</strong>
                      {prediction.rationalizationSuggestions.map((suggestion, index) => (
                        <div key={index} className={`text-xs p-2 rounded ${
                          suggestion.priority === 'high' ? 'bg-red-50 text-red-700' :
                          suggestion.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-green-50 text-green-700'
                        }`}>
                          <strong>{suggestion.appliance}:</strong> Use during {suggestion.suggestedTime} 
                          (Save {suggestion.energySaving}%)
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Usage Pattern Analysis</h4>
              <div className="space-y-4">
                {['hourly', 'daily', 'weekly'].map(timeframe => {
                  const data = consumerPredictions.filter(p => p.timeframe === timeframe);
                  const avgConsumption = data.reduce((sum, p) => sum + p.predictedConsumption, 0) / data.length;
                  
                  return (
                    <div key={timeframe} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{timeframe} Average</span>
                        <span className="font-bold text-gray-900">
                          {avgConsumption.toFixed(1)} kWh
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((avgConsumption / 1000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">Smart Recommendations</h5>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>• Shift 60% of energy usage to solar peak hours (10 AM - 2 PM)</p>
                    <p>• Implement smart scheduling for water heating and AC</p>
                    <p>• Consider battery storage for evening peak reduction</p>
                    <p>• Use demand response programs during grid stress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const tabs = [
    { id: 'overview', name: 'AI Overview', icon: Brain },
    { id: 'solar', name: 'Solar Predictions', icon: Sun },
    { id: 'maintenance', name: 'Predictive Maintenance', icon: Wrench },
    { id: 'consumption', name: 'Consumer Analytics', icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <Brain className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">AI-Powered Alerts & Monitoring</h1>
            <p className="text-purple-100">Intelligent predictions and real-time monitoring system</p>
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
      {activeTab === 'solar' && renderSolarPredictions()}
      {activeTab === 'maintenance' && renderMaintenancePredictions()}
      {activeTab === 'consumption' && renderConsumerPredictions()}
    </div>
  );
};