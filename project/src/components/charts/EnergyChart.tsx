import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface EnergyChartProps {
  data: any[];
  type?: 'line' | 'area';
  showPrediction?: boolean;
}

export const EnergyChart: React.FC<EnergyChartProps> = ({ data, type = 'area', showPrediction = false }) => {
  const Chart = type === 'area' ? AreaChart : LineChart;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="time" 
          stroke="#666"
          fontSize={12}
        />
        <YAxis 
          stroke="#666"
          fontSize={12}
          label={{ value: 'MW', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        {type === 'area' ? (
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#22c55e"
            fill="url(#colorActual)"
            strokeWidth={2}
          />
        ) : (
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
          />
        )}
        {showPrediction && (
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
          />
        )}
        <defs>
          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </Chart>
    </ResponsiveContainer>
  );
};