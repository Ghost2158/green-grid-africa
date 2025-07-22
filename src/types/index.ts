export interface SensorData {
  id: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  solarIrradiance: number;
  powerOutput: number;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface EnergyPrediction {
  timestamp: Date;
  predictedOutput: number;
  confidence: number;
  weatherFactor: number;
}

export interface AIRecommendation {
  id: string;
  type: 'efficiency' | 'maintenance' | 'grid' | 'weather';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  timestamp: Date;
}

export interface SiteStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  capacity: number;
  currentOutput: number;
  efficiency: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Site {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  capacity: number;
  currentOutput: number;
  efficiency: number;
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  sensors: SensorData[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  siteId: string;
  acknowledged: boolean;
}

export interface ConsumerData {
  userId: string;
  totalConsumption: number;
  solarGeneration: number;
  gridConsumption: number;
  savings: number;
  carbonOffset: number;
  monthlyTrend: Array<{
    month: string;
    consumption: number;
    generation: number;
    savings: number;
  }>;
}