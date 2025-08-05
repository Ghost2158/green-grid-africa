import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SensorChartData {
  time: string;
  temperature?: number;
  humidity?: number;
  solarIrradiance?: number;
  irradiance?: number;
}

interface SensorChartProps {
  data: SensorChartData[];
  metric: 'temperature' | 'humidity' | 'solarIrradiance' | 'irradiance';
}

export const SensorChart: React.FC<SensorChartProps> = ({ data, metric }) => {
  const getColor = (metric: string) => {
    switch (metric) {
      case 'temperature': return '#f59e0b';
      case 'humidity': return '#3b82f6';
      case 'solarIrradiance':
      case 'irradiance': return '#f97316';
      case 'powerOutput': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getUnit = (metric: string) => {
    switch (metric) {
      case 'temperature': return '°C';
      case 'humidity': return '%';
      case 'solarIrradiance':
      case 'irradiance': return 'W/m²';
      case 'powerOutput': return 'kW';
      default: return '';
    }
  };

  const getDisplayName = (metric: string) => {
    switch (metric) {
      case 'temperature': return 'Temperature';
      case 'humidity': return 'Humidity';
      case 'solarIrradiance':
      case 'irradiance': return 'Solar Irradiance';
      case 'powerOutput': return 'Power Output';
      default: return metric;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="time" 
          stroke="#666"
          fontSize={12}
        />
        <YAxis 
          stroke="#666"
          fontSize={12}
          label={{ value: getUnit(metric), angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value) => [`${Math.round(Number(value))} ${getUnit(metric)}`, getDisplayName(metric)]}
        />
        <Bar 
          dataKey={metric} 
          fill={getColor(metric)}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};