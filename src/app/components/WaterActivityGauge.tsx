interface WaterActivityGaugeProps {
  value: number; // 0.30 - 0.75
  description: string;
}

export function WaterActivityGauge({
  value,
  description,
}: WaterActivityGaugeProps) {
  // Map 0.30-0.75 to 0-100 for linear position
  const percentage = ((value - 0.3) / (0.75 - 0.3)) * 100;

  // Color gradient from amber (crisp) to blue (soft)
  const getColor = (val: number) => {
    if (val < 0.35) return '#f59e0b'; // amber
    if (val < 0.45) return '#f97316'; // orange
    if (val < 0.55) return '#84cc16'; // lime
    if (val < 0.65) return '#3b82f6'; // blue
    return '#6366f1'; // indigo
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <div className="text-sm text-gray-500 mb-2">Water Activity</div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {value.toFixed(3)}
      </div>
      <div className="text-xs font-medium text-gray-700 mb-4">
        {description}
      </div>
      
      {/* Linear Scale */}
      <div className="w-full relative">
        {/* Background gradient bar */}
        <div className="h-12 w-full rounded-lg relative overflow-hidden"
          style={{
            background: 'linear-gradient(to right, #f59e0b 0%, #f97316 25%, #84cc16 50%, #3b82f6 75%, #6366f1 100%)'
          }}
        >
          {/* Position marker */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-300"
            style={{ left: `${percentage}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-800 rounded px-2 py-1 shadow-lg whitespace-nowrap">
              <div className="text-xs font-bold text-gray-900">{value.toFixed(3)}</div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        </div>
        
        {/* Scale labels */}
        <div className="flex justify-between mt-3 text-xs font-medium">
          <div className="text-left">
            <div className="text-amber-600 font-bold">0.30</div>
            <div className="text-gray-600">Crisp</div>
          </div>
          <div className="text-center">
            <div className="text-lime-600 font-bold">0.525</div>
            <div className="text-gray-600">Balanced</div>
          </div>
          <div className="text-right">
            <div className="text-indigo-600 font-bold">0.75</div>
            <div className="text-gray-600">Soft</div>
          </div>
        </div>
      </div>
    </div>
  );
}