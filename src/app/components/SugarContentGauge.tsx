interface SugarContentGaugeProps {
  totalSugar: number; // Total sugar in grams
  sugarPercent: number; // Sugar as % of total weight
}

export function SugarContentGauge({ totalSugar, sugarPercent }: SugarContentGaugeProps) {
  // Map 0-50% to 0-100 for linear position (most cookies are 15-35% sugar)
  const minPercent = 0;
  const maxPercent = 50;
  const percentage = Math.min(100, Math.max(0, (sugarPercent / maxPercent) * 100));

  // Color gradient based on sugar content
  const getColor = (percent: number) => {
    if (percent < 15) return '#fde047'; // yellow - low sugar
    if (percent < 25) return '#fbbf24'; // amber - moderate sugar
    if (percent < 35) return '#fb923c'; // orange - sweet
    if (percent < 45) return '#f97316'; // dark orange - very sweet
    return '#f472b6'; // pink - extremely sweet
  };

  const getLabel = (percent: number) => {
    if (percent < 15) return 'Low Sugar';
    if (percent < 25) return 'Moderate';
    if (percent < 35) return 'Sweet';
    if (percent < 45) return 'Very Sweet';
    return 'Candy-Like';
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl">
      <div className="text-sm text-gray-500 mb-2">Sugar Content</div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {totalSugar.toFixed(0)}<span className="text-xl ml-1">g</span>
      </div>
      <div className="text-sm text-gray-600 mb-1">{sugarPercent.toFixed(1)}% of recipe</div>
      <div className="text-xs font-medium text-gray-700 mb-4">
        {getLabel(sugarPercent)}
      </div>
      
      {/* Linear Scale */}
      <div className="w-full relative">
        {/* Background gradient bar */}
        <div className="h-12 w-full rounded-lg relative overflow-hidden"
          style={{
            background: 'linear-gradient(to right, #fde047 0%, #fbbf24 30%, #fb923c 50%, #f97316 70%, #f472b6 100%)'
          }}
        >
          {/* Position marker */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-300"
            style={{ left: `${percentage}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-800 rounded px-2 py-1 shadow-lg whitespace-nowrap">
              <div className="text-xs font-bold text-gray-900">{sugarPercent.toFixed(1)}%</div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        </div>
        
        {/* Scale labels */}
        <div className="flex justify-between mt-3 text-xs font-medium">
          <div className="text-left">
            <div className="text-yellow-500 font-bold">0%</div>
            <div className="text-gray-600">No Sugar</div>
          </div>
          <div className="text-center">
            <div className="text-orange-500 font-bold">25%</div>
            <div className="text-gray-600">Typical</div>
          </div>
          <div className="text-right">
            <div className="text-pink-500 font-bold">50%</div>
            <div className="text-gray-600">Candy-Like</div>
          </div>
        </div>
      </div>
    </div>
  );
}