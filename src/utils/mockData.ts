import { SensorData, Site, EnergyPrediction, AIRecommendation, Alert, ConsumerData } from '../types';

// Generate mock sensor data
export const generateSensorData = (siteId: string, siteName: string, lat: number, lng: number): SensorData[] => {
  const data: SensorData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
    const hour = timestamp.getHours();
    
    // Simulate solar irradiance based on time of day
    let solarIrradiance = 0;
    if (hour >= 6 && hour <= 18) {
      const solarCurve = Math.sin(((hour - 6) / 12) * Math.PI);
      solarIrradiance = Math.max(0, solarCurve * 1000 + Math.random() * 100 - 50);
    }
    
    data.push({
      id: `${siteId}-${i}`,
      timestamp,
      temperature: 25 + Math.random() * 15 + (hour > 10 && hour < 16 ? 5 : 0),
      humidity: 40 + Math.random() * 30,
      solarIrradiance,
      powerOutput: solarIrradiance * 0.2 * (0.8 + Math.random() * 0.4),
      location: { lat, lng, name: siteName }
    });
  }
  
  return data.reverse();
};

export const mockSites: Site[] = [
  {
    id: 'site-1',
    name: 'Lagos Solar Farm',
    location: { lat: 6.5244, lng: 3.3792 },
    capacity: 50000,
    currentOutput: 42500,
    efficiency: 85,
    status: 'online',
    sensors: generateSensorData('site-1', 'Lagos Solar Farm', 6.5244, 3.3792)
  },
  {
    id: 'site-2',
    name: 'Nairobi Green Grid',
    location: { lat: -1.2921, lng: 36.8219 },
    capacity: 35000,
    currentOutput: 28000,
    efficiency: 80,
    status: 'online',
    sensors: generateSensorData('site-2', 'Nairobi Green Grid', -1.2921, 36.8219)
  },
  {
    id: 'site-3',
    name: 'Cape Town Solar Hub',
    location: { lat: -33.9249, lng: 18.4241 },
    capacity: 75000,
    currentOutput: 0,
    efficiency: 0,
    status: 'maintenance',
    sensors: generateSensorData('site-3', 'Cape Town Solar Hub', -33.9249, 18.4241)
  },
  {
    id: 'site-4',
    name: 'Accra Power Station',
    location: { lat: 5.6037, lng: -0.1870 },
    capacity: 40000,
    currentOutput: 35000,
    efficiency: 87.5,
    status: 'warning',
    sensors: generateSensorData('site-4', 'Accra Power Station', 5.6037, -0.1870)
  }
];

export const mockPredictions: EnergyPrediction[] = Array.from({ length: 24 }, (_, i) => {
  const timestamp = new Date();
  timestamp.setHours(timestamp.getHours() + i);
  
  const hour = timestamp.getHours();
  let predictedOutput = 0;
  
  if (hour >= 6 && hour <= 18) {
    const solarCurve = Math.sin(((hour - 6) / 12) * Math.PI);
    predictedOutput = Math.max(0, solarCurve * 180000 + Math.random() * 20000 - 10000);
  }
  
  return {
    timestamp,
    predictedOutput,
    confidence: 0.75 + Math.random() * 0.2,
    weatherFactor: 0.8 + Math.random() * 0.4
  };
});

export const mockRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    type: 'efficiency',
    priority: 'high',
    title: 'Optimize Panel Angle',
    description: 'Adjust solar panel angles at Lagos Solar Farm to increase efficiency by 12%',
    impact: '+5,200 kWh/day',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 'rec-2',
    type: 'maintenance',
    priority: 'critical',
    title: 'Inverter Replacement Required',
    description: 'Inverter #3 at Accra Power Station showing degraded performance',
    impact: 'Prevent 15% output loss',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: 'rec-3',
    type: 'grid',
    priority: 'medium',
    title: 'Load Balancing Opportunity',
    description: 'Redistribute excess capacity from Nairobi to Lagos during peak hours',
    impact: '+8% grid efficiency',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: 'rec-4',
    type: 'weather',
    priority: 'low',
    title: 'Weather Pattern Alert',
    description: 'Cloudy conditions expected tomorrow, prepare backup systems',
    impact: 'Maintain 95% uptime',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'warning',
    title: 'High Temperature Detected',
    message: 'Temperature sensors at Accra Power Station reading 45°C',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    siteId: 'site-4',
    acknowledged: false
  },
  {
    id: 'alert-2',
    type: 'error',
    title: 'Site Offline',
    message: 'Cape Town Solar Hub is currently offline for maintenance',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    siteId: 'site-3',
    acknowledged: true
  },
  {
    id: 'alert-3',
    type: 'success',
    title: 'Efficiency Target Met',
    message: 'Lagos Solar Farm exceeded 85% efficiency target',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    siteId: 'site-1',
    acknowledged: true
  }
];

export const mockConsumerData: ConsumerData = {
  userId: 'user-1',
  totalConsumption: 850,
  solarGeneration: 1200,
  gridConsumption: 350,
  savings: 420,
  carbonOffset: 0.8,
  monthlyTrend: [
    { month: 'Jan', consumption: 800, generation: 1100, savings: 380 },
    { month: 'Feb', consumption: 750, generation: 1050, savings: 350 },
    { month: 'Mar', consumption: 820, generation: 1180, savings: 410 },
    { month: 'Apr', consumption: 780, generation: 1220, savings: 440 },
    { month: 'May', consumption: 850, generation: 1200, savings: 420 },
    { month: 'Jun', consumption: 900, generation: 1150, savings: 380 }
  ]
};