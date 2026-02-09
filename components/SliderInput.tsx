import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  unit?: string;
  helperText?: string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = '',
  helperText
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-4">
        <label className="text-xl font-semibold text-gray-900">{label}</label>
        <div className="text-3xl font-bold text-[#FF7A00]">
          {unit === '€' ? `${value.toLocaleString('es-ES')}€` : `${value} ${unit}`}
        </div>
      </div>
      
      <div className="relative h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
        />
        {/* Custom Track */}
        <div className="w-full h-2 bg-gray-200 rounded-full absolute z-0 overflow-hidden">
          <div 
            className="h-full bg-[#FF7A00] transition-all duration-75 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {/* Custom Thumb handle visual */}
        <div 
          className="h-6 w-6 bg-white border-4 border-[#FF7A00] rounded-full absolute z-10 shadow-md transition-all duration-75 ease-out pointer-events-none"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};