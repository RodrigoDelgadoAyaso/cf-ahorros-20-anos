import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SimulationData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ResultsChartProps {
  data: SimulationData[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ data }) => {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FF7A00" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="age" 
            label={{ value: 'Edad', position: 'insideBottomRight', offset: -5 }} 
            tickLine={false}
            axisLine={false}
            tick={{fontSize: 12, fill: '#666'}}
          />
          <YAxis 
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
            tickLine={false}
            axisLine={false}
            tick={{fontSize: 12, fill: '#666'}}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Area 
            name="Plan Contigo Futuro (Est.)"
            type="monotone" 
            dataKey="projectedValueOptimized" 
            stroke="#FF7A00" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorOptimized)" 
          />
          <Area 
            name="Ahorro Tradicional / IPC"
            type="monotone" 
            dataKey="projectedValueConservative" 
            stroke="#9CA3AF" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1} 
            fill="url(#colorConservative)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};