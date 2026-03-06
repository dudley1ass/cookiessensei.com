import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SweetnessGaugeProps {
  value: number; // Sucrose equivalence (0.4-1.6 practical range)
}

export function SweetnessGauge({ value }: SweetnessGaugeProps) {
  // Map 0.4-1.6 range to 0-100 for display (more sensitive to changes)
  const minValue = 0.4;
  const maxValue = 1.6;
  const percentage = Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100));

  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  // Color gradient based on sweetness level
  const getColor = (val: number) => {
    if (val < 0.7) return '#fde047'; // yellow - less sweet
    if (val < 0.9) return '#fbbf24'; // amber - moderately sweet
    if (val < 1.1) return '#fb923c'; // orange - sweet (near sucrose)
    if (val < 1.3) return '#f97316'; // dark orange - very sweet
    return '#f472b6'; // pink - extremely sweet
  };

  const getLabel = (val: number) => {
    if (val < 0.7) return 'Less Sweet';
    if (val < 0.9) return 'Moderately Sweet';
    if (val < 1.1) return 'Sweet';
    if (val < 1.3) return 'Very Sweet';
    return 'Extremely Sweet';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              <Cell key="sweetness-fill" fill={getColor(value)} />
              <Cell key="sweetness-empty" fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
          <div className="text-4xl font-bold text-gray-900">
            {value.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 mt-1">Sucrose Equiv.</div>
          <div className="text-xs font-medium text-gray-700 mt-1">
            {getLabel(value)}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-48 mt-2 text-xs text-gray-600">
        <span>0.4</span>
        <span>1.0 (Sucrose)</span>
        <span>1.6</span>
      </div>
    </div>
  );
}