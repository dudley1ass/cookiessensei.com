import { Flame, Clock, Timer, Cookie } from 'lucide-react';

interface BakingInstructionsProps {
  cookieType: string;
  totalWeight: number;
  cookieCount: number;
  measurementMode: 'metric' | 'imperial' | 'volumetric';
}

interface BakingData {
  tempF: number;
  tempC: number;
  timeMin: number;
  timeMax: number;
  instructions: string;
  doneness: string;
}

export function BakingInstructions({ 
  cookieType, 
  totalWeight, 
  cookieCount,
  measurementMode 
}: BakingInstructionsProps) {
  
  const getBakingData = (): BakingData => {
    const weightPerCookie = cookieCount > 0 ? totalWeight / cookieCount : 30;
    
    // Base data for each cookie type
    const baseData: Record<string, BakingData> = {
      'drop-cookie': {
        tempF: 350,
        tempC: 175,
        timeMin: 10,
        timeMax: 12,
        instructions: 'Space 2 inches apart on parchment-lined baking sheets',
        doneness: 'Edges golden brown, centers slightly soft'
      },
      'soft-cake': {
        tempF: 350,
        tempC: 175,
        timeMin: 8,
        timeMax: 10,
        instructions: 'Do not overbake - remove when barely set',
        doneness: 'No browning, tops spring back when touched'
      },
      'shortbread': {
        tempF: 325,
        tempC: 165,
        timeMin: 18,
        timeMax: 22,
        instructions: 'Bake low and slow for tender texture',
        doneness: 'Lightly golden on bottom, pale on top'
      },
      'sugar-cookie': {
        tempF: 350,
        tempC: 175,
        timeMin: 8,
        timeMax: 10,
        instructions: 'Chill dough 30 min before baking for best shape retention',
        doneness: 'Edges just set, no browning for soft cookies'
      },
      'snickerdoodle': {
        tempF: 375,
        tempC: 190,
        timeMin: 8,
        timeMax: 10,
        instructions: 'Roll in cinnamon-sugar immediately before baking',
        doneness: 'Puffy with crackled tops, edges lightly golden'
      },
      'brownie-cookie': {
        tempF: 350,
        tempC: 175,
        timeMin: 10,
        timeMax: 13,
        instructions: 'Centers should look slightly underbaked',
        doneness: 'Crackled tops, fudgy centers'
      },
      'biscotti': {
        tempF: 350,
        tempC: 175,
        timeMin: 25,
        timeMax: 30,
        instructions: 'First bake 25-30 min, slice, then bake 15-20 min more per side',
        doneness: 'First bake: firm and golden. Second bake: dry and crisp'
      },
      'pressed-butter': {
        tempF: 350,
        tempC: 175,
        timeMin: 10,
        timeMax: 12,
        instructions: 'Pipe dough while soft, chill before baking',
        doneness: 'Edges lightly golden, shape maintained'
      },
      'slice-bake': {
        tempF: 350,
        tempC: 175,
        timeMin: 10,
        timeMax: 12,
        instructions: 'Slice chilled logs 1/4-inch thick',
        doneness: 'Edges golden, centers set'
      },
      'molded': {
        tempF: 350,
        tempC: 175,
        timeMin: 10,
        timeMax: 12,
        instructions: 'Roll into balls or shape by hand before baking',
        doneness: 'Surface cracked, edges set'
      },
      'macaron-meringue': {
        tempF: 300,
        tempC: 150,
        timeMin: 15,
        timeMax: 18,
        instructions: 'Let piped macarons rest 30-60 min until skin forms',
        doneness: 'Feet formed, shells lift easily from parchment'
      },
      'no-bake': {
        tempF: 0,
        tempC: 0,
        timeMin: 15,
        timeMax: 30,
        instructions: 'Drop onto parchment while hot, let cool at room temperature',
        doneness: 'Firm to touch, no longer sticky'
      }
    };

    let data = baseData[cookieType] || baseData['drop-cookie'];
    
    // Adjust baking time based on cookie weight
    if (weightPerCookie > 40 && cookieType !== 'biscotti' && cookieType !== 'no-bake') {
      // Larger cookies need more time (add 1 min per 10g over 40g)
      const extraTime = Math.floor((weightPerCookie - 40) / 10);
      data = {
        ...data,
        timeMin: data.timeMin + extraTime,
        timeMax: data.timeMax + extraTime
      };
    } else if (weightPerCookie < 20 && cookieType !== 'biscotti' && cookieType !== 'no-bake') {
      // Smaller cookies need less time
      data = {
        ...data,
        timeMin: Math.max(6, data.timeMin - 2),
        timeMax: Math.max(8, data.timeMax - 2)
      };
    }

    return data;
  };

  const bakingData = getBakingData();
  const weightPerCookie = cookieCount > 0 ? totalWeight / cookieCount : 0;
  
  const formatTemp = (tempF: number, tempC: number) => {
    if (measurementMode === 'imperial') {
      return `${tempF}°F`;
    } else {
      return `${tempC}°C`;
    }
  };

  const formatWeight = (grams: number) => {
    if (measurementMode === 'imperial') {
      return `${(grams * 0.035274).toFixed(1)}oz`;
    } else {
      return `${grams.toFixed(0)}g`;
    }
  };

  if (cookieType === 'no-bake') {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Timer className="w-6 h-6 text-blue-700" />
          <h3 className="text-xl font-bold text-blue-900">No-Bake Instructions</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/70 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Setting Time</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {bakingData.timeMin}-{bakingData.timeMax} min
            </div>
            <div className="text-xs text-blue-600 mt-1">At room temperature</div>
          </div>

          <div className="bg-white/70 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Yield</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{cookieCount} cookies</div>
            <div className="text-xs text-blue-600 mt-1">
              ~{formatWeight(weightPerCookie)} each
            </div>
          </div>
        </div>

        <div className="bg-white/70 p-4 rounded-lg space-y-2">
          <div className="text-sm font-semibold text-blue-700">Instructions:</div>
          <div className="text-sm text-blue-800">{bakingData.instructions}</div>
          <div className="text-sm font-semibold text-blue-700 mt-3">Doneness:</div>
          <div className="text-sm text-blue-800">{bakingData.doneness}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl border border-orange-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-6 h-6 text-orange-700" />
        <h3 className="text-xl font-bold text-orange-900">Baking Instructions</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white/70 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">Temperature</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {formatTemp(bakingData.tempF, bakingData.tempC)}
          </div>
          <div className="text-xs text-orange-600 mt-1">
            {measurementMode === 'imperial' 
              ? `${bakingData.tempC}°C` 
              : `${bakingData.tempF}°F`}
          </div>
        </div>

        <div className="bg-white/70 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">Baking Time</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {bakingData.timeMin}-{bakingData.timeMax} min
          </div>
          <div className="text-xs text-orange-600 mt-1">
            {cookieType === 'biscotti' ? 'First bake' : 'Total time'}
          </div>
        </div>

        <div className="bg-white/70 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Cookie className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">Yield</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">{cookieCount} cookies</div>
          <div className="text-xs text-orange-600 mt-1">
            ~{formatWeight(weightPerCookie)} each
          </div>
        </div>
      </div>

      <div className="bg-white/70 p-4 rounded-lg space-y-2">
        <div className="text-sm font-semibold text-orange-700">Instructions:</div>
        <div className="text-sm text-orange-800">{bakingData.instructions}</div>
        <div className="text-sm font-semibold text-orange-700 mt-3">Doneness:</div>
        <div className="text-sm text-orange-800">{bakingData.doneness}</div>
      </div>
    </div>
  );
}
