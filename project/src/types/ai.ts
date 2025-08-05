export interface AIGenerationPrediction {
  id: string;
  timestamp: Date;
  siteId: string;
  siteName: string;
  predictedOutput: number;
  confidence: number;
  inputFactors: {
    solarIrradiance: number;
    temperature: number;
    humidity: number;
  };
  weatherConditions: string;
  efficiency: number;
}

export interface MaintenancePrediction {
  id: string;
  siteId: string;
  siteName: string;
  component: string;
  maintenanceType: 'cleaning' | 'angle_adjustment' | 'repair' | 'replacement';
  priority: 'low' | 'medium' | 'high' | 'critical';
  predictedDate: Date;
  description: string;
  impact: string;
  costSaving: number;
  confidence: number;
  basedOn: string[];
}

export interface ConsumerPrediction {
  id: string;
  userId: string;
  userName: string;
  timeframe: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  predictedConsumption: number;
  actualConsumption?: number;
  variance?: number;
  peakHours: string[];
  recommendations: string[];
  rationalizationSuggestions: {
    priority: 'high' | 'medium' | 'low';
    appliance: string;
    suggestedTime: string;
    energySaving: number;
  }[];
}

export interface EnergyAlert {
  id: string;
  type: 'generation' | 'maintenance' | 'consumption' | 'system';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  siteId?: string;
  userId?: string;
  aiGenerated: boolean;
  actionRequired: boolean;
  estimatedImpact: string;
  recommendations: string[];
}