import { AIGenerationPrediction, MaintenancePrediction, ConsumerPrediction, EnergyAlert } from '../types/ai';
import { mockSites } from './mockData';

// AI Solar Generation Prediction Algorithm
export const generateSolarPredictions = (): AIGenerationPrediction[] => {
  const predictions: AIGenerationPrediction[] = [];
  const now = new Date();

  mockSites.forEach(site => {
    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(now.getTime() + (i * 60 * 60 * 1000));
      const hour = timestamp.getHours();
      
      // Simulate environmental factors
      const solarIrradiance = hour >= 6 && hour <= 18 
        ? Math.sin(((hour - 6) / 12) * Math.PI) * (800 + Math.random() * 200)
        : 0;
      
      const temperature = 25 + Math.random() * 15 + (hour > 10 && hour < 16 ? 5 : 0);
      const humidity = 40 + Math.random() * 30;
      
      // AI Prediction Algorithm
      const tempFactor = temperature > 35 ? 0.95 - ((temperature - 35) * 0.01) : 1.0;
      const humidityFactor = humidity > 70 ? 0.98 - ((humidity - 70) * 0.005) : 1.0;
      const irradianceFactor = solarIrradiance / 1000;
      
      const predictedOutput = site.capacity * irradianceFactor * tempFactor * humidityFactor;
      const confidence = 0.75 + (Math.random() * 0.2);
      
      predictions.push({
        id: `pred-${site.id}-${i}`,
        timestamp,
        siteId: site.id,
        siteName: site.name,
        predictedOutput: Math.max(0, predictedOutput),
        confidence,
        inputFactors: {
          solarIrradiance,
          temperature,
          humidity
        },
        weatherConditions: solarIrradiance > 600 ? 'Clear' : solarIrradiance > 300 ? 'Partly Cloudy' : 'Cloudy',
        efficiency: site.efficiency
      });
    }
  });

  return predictions;
};

// AI Predictive Maintenance Algorithm
export const generateMaintenancePredictions = (): MaintenancePrediction[] => {
  const predictions: MaintenancePrediction[] = [];
  
  mockSites.forEach(site => {
    const lastSensor = site.sensors[0];
    
    // Panel cleaning prediction based on efficiency drop and dust accumulation
    if (site.efficiency < 85) {
      predictions.push({
        id: `maint-clean-${site.id}`,
        siteId: site.id,
        siteName: site.name,
        component: 'Solar Panels',
        maintenanceType: 'cleaning',
        priority: site.efficiency < 80 ? 'high' : 'medium',
        predictedDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
        description: `Panel efficiency has dropped to ${site.efficiency}%. Dust accumulation detected.`,
        impact: `+${(90 - site.efficiency).toFixed(1)}% efficiency gain`,
        costSaving: (site.capacity * 0.1 * (90 - site.efficiency)) / 1000,
        confidence: 0.87,
        basedOn: ['Efficiency trends', 'Weather patterns', 'Historical data']
      });
    }
    
    // Angle adjustment prediction based on seasonal optimization
    const currentMonth = new Date().getMonth();
    if (currentMonth === 2 || currentMonth === 8) { // March or September
      predictions.push({
        id: `maint-angle-${site.id}`,
        siteId: site.id,
        siteName: site.name,
        component: 'Panel Tracking System',
        maintenanceType: 'angle_adjustment',
        priority: 'medium',
        predictedDate: new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)),
        description: 'Seasonal angle optimization recommended for maximum solar capture.',
        impact: '+12% energy generation',
        costSaving: site.capacity * 0.12 * 0.1,
        confidence: 0.92,
        basedOn: ['Solar angle calculations', 'Seasonal patterns', 'Geographic data']
      });
    }
    
    // Component replacement prediction based on temperature stress
    if (lastSensor && lastSensor.temperature > 45) {
      predictions.push({
        id: `maint-repair-${site.id}`,
        siteId: site.id,
        siteName: site.name,
        component: 'Inverter System',
        maintenanceType: 'repair',
        priority: 'high',
        predictedDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        description: 'High operating temperatures detected. Inverter cooling system requires attention.',
        impact: 'Prevent 25% output loss',
        costSaving: site.capacity * 0.25 * 0.15,
        confidence: 0.78,
        basedOn: ['Temperature monitoring', 'Component stress analysis', 'Failure patterns']
      });
    }
  });
  
  return predictions;
};

// AI Consumer Energy Prediction Algorithm
export const generateConsumerPredictions = (): ConsumerPrediction[] => {
  const predictions: ConsumerPrediction[] = [];
  const timeframes: ('hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly')[] = 
    ['hourly', 'daily', 'weekly', 'monthly', 'yearly'];
  
  // Mock consumer data
  const consumers = [
    { id: 'user-1', name: 'John Consumer', baseConsumption: 850 },
    { id: 'user-2', name: 'Sarah Johnson', baseConsumption: 720 },
    { id: 'user-3', name: 'Mike Wilson', baseConsumption: 950 },
  ];
  
  consumers.forEach(consumer => {
    timeframes.forEach(timeframe => {
      let multiplier = 1;
      let peakHours: string[] = [];
      
      switch (timeframe) {
        case 'hourly':
          multiplier = consumer.baseConsumption / (24 * 30); // Per hour
          peakHours = ['07:00-09:00', '18:00-22:00'];
          break;
        case 'daily':
          multiplier = consumer.baseConsumption / 30; // Per day
          peakHours = ['Evening', 'Morning'];
          break;
        case 'weekly':
          multiplier = consumer.baseConsumption / 4; // Per week
          peakHours = ['Weekends', 'Friday evenings'];
          break;
        case 'monthly':
          multiplier = consumer.baseConsumption; // Per month
          peakHours = ['Summer months', 'Holiday periods'];
          break;
        case 'yearly':
          multiplier = consumer.baseConsumption * 12; // Per year
          peakHours = ['Summer season', 'Winter holidays'];
          break;
      }
      
      const seasonalFactor = 0.9 + (Math.random() * 0.2);
      const predictedConsumption = multiplier * seasonalFactor;
      
      predictions.push({
        id: `cons-pred-${consumer.id}-${timeframe}`,
        userId: consumer.id,
        userName: consumer.name,
        timeframe,
        predictedConsumption,
        peakHours,
        recommendations: [
          'Use high-energy appliances during solar peak hours (10 AM - 2 PM)',
          'Consider battery storage for evening usage',
          'Implement smart scheduling for non-essential devices'
        ],
        rationalizationSuggestions: [
          {
            priority: 'high',
            appliance: 'Air Conditioning',
            suggestedTime: '10:00-14:00',
            energySaving: 25
          },
          {
            priority: 'medium',
            appliance: 'Water Heater',
            suggestedTime: '11:00-13:00',
            energySaving: 15
          },
          {
            priority: 'low',
            appliance: 'Washing Machine',
            suggestedTime: '12:00-15:00',
            energySaving: 10
          }
        ]
      });
    });
  });
  
  return predictions;
};

// AI Alert Generation System
export const generateAIAlerts = (): EnergyAlert[] => {
  const alerts: EnergyAlert[] = [];
  const now = new Date();
  
  // Generation alerts
  alerts.push({
    id: 'ai-alert-1',
    type: 'generation',
    severity: 'warning',
    title: 'Predicted Output Decline',
    message: 'AI models predict 15% output reduction at Lagos Solar Farm due to approaching dust storm.',
    timestamp: new Date(now.getTime() - 30 * 60 * 1000),
    siteId: 'site-1',
    aiGenerated: true,
    actionRequired: true,
    estimatedImpact: '7.5 MW capacity reduction for 2-3 days',
    recommendations: [
      'Schedule immediate panel cleaning',
      'Activate backup power systems',
      'Notify grid operators of reduced capacity'
    ]
  });
  
  // Maintenance alerts
  alerts.push({
    id: 'ai-alert-2',
    type: 'maintenance',
    severity: 'error',
    title: 'Critical Maintenance Required',
    message: 'Inverter temperature patterns indicate imminent failure at Accra Power Station.',
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    siteId: 'site-4',
    aiGenerated: true,
    actionRequired: true,
    estimatedImpact: 'Potential 40% output loss if not addressed within 48 hours',
    recommendations: [
      'Schedule emergency maintenance',
      'Prepare backup inverter',
      'Reduce load on affected inverter'
    ]
  });
  
  // Consumption alerts
  alerts.push({
    id: 'ai-alert-3',
    type: 'consumption',
    severity: 'info',
    title: 'Peak Demand Prediction',
    message: 'AI forecasts 30% increase in consumer demand during upcoming heatwave.',
    timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    aiGenerated: true,
    actionRequired: false,
    estimatedImpact: 'Grid stress during 6-8 PM peak hours',
    recommendations: [
      'Implement demand response programs',
      'Encourage off-peak usage',
      'Prepare additional generation capacity'
    ]
  });
  
  // System optimization alerts
  alerts.push({
    id: 'ai-alert-4',
    type: 'system',
    severity: 'info',
    title: 'Optimization Opportunity',
    message: 'AI identified 8% efficiency gain possible through panel angle adjustment.',
    timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    aiGenerated: true,
    actionRequired: false,
    estimatedImpact: '+12 MW additional capacity across all sites',
    recommendations: [
      'Schedule angle optimization maintenance',
      'Update tracking algorithms',
      'Implement seasonal adjustment protocols'
    ]
  });
  
  return alerts;
};