import { CookieMetrics } from '../types/cookie';
import { WaterActivityGauge } from './WaterActivityGauge';
import { SugarContentGauge } from './SugarContentGauge';
import { getTextureDescription, getWaterActivityDescription } from '../utils/cookieCalculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type MeasurementMode = 'metric' | 'imperial' | 'volumetric';

interface MetricsDisplayProps {
  metrics: CookieMetrics;
  measurementMode: MeasurementMode;
}

export function MetricsDisplay({ metrics, measurementMode }: MetricsDisplayProps) {
  const componentData = [
    { name: 'Fat', value: metrics.fatPercent, color: '#fbbf24' },
    { name: 'Sugar', value: metrics.sugarPercent, color: '#f472b6' },
    { name: 'Flour', value: metrics.flourPercent, color: '#a78bfa' },
    { name: 'Water', value: metrics.waterPercent, color: '#60a5fa' },
  ];

  const formatWeight = (grams: number) => {
    if (measurementMode === 'metric') {
      return `${grams.toFixed(0)} g`;
    } else if (measurementMode === 'imperial') {
      if (grams >= 453.592) return `${(grams / 453.592).toFixed(2)} lb`;
      return `${(grams / 28.3495).toFixed(2)} oz`;
    } else {
      // volumetric - approximate for total weight
      return `${(grams / 236.588).toFixed(2)} cups`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <WaterActivityGauge
            value={metrics.waterActivity}
            description={getWaterActivityDescription(metrics.waterActivity)}
          />
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <SugarContentGauge 
            totalSugar={metrics.totalActualSugar} 
            sugarPercent={metrics.sugarContentPercent}
          />
        </div>
      </div>

      {/* Science Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="text-sm text-blue-700 mb-1">Texture Force</div>
          <div className="text-3xl font-bold text-blue-900">
            {metrics.textureForce.toFixed(0)}
            <span className="text-lg ml-1">N</span>
          </div>
          <div className="text-xs text-blue-600 mt-1">
            {getTextureDescription(metrics.textureForce)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-sm text-purple-700 mb-1">Spread Ratio</div>
          <div className="text-3xl font-bold text-purple-900">
            {metrics.spreadRatio.toFixed(2)}
          </div>
          <div className="text-xs text-purple-600 mt-1">
            Diameter ÷ Height
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
          <div className="text-sm text-amber-700 mb-1">Total Weight</div>
          <div className="text-3xl font-bold text-amber-900">
            {formatWeight(metrics.totalWeight)}
          </div>
          <div className="text-xs text-amber-600 mt-1">
            Recipe Yield
          </div>
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Component Breakdown (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={componentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {componentData.map((entry, index) => (
                <Cell key={`component-cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}