/**
 * Lightweight in-app “screenshot” so visitors see the builder without maintaining image assets.
 * Replace with <img src="/cookie-tool-preview.png" /> in CookieHeroBanner when you have a real capture.
 */
export function CookieToolPreviewMockup() {
  return (
    <div
      className="w-full max-w-lg mx-auto rounded-2xl border border-white/25 bg-white/[0.07] backdrop-blur-md shadow-2xl overflow-hidden text-left"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/20">
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-amber-300/80" />
          <span className="size-2 rounded-full bg-green-400/80" />
        </div>
        <span className="text-[10px] font-semibold text-orange-200/90 tracking-wide">Cookie Sensei · live</span>
      </div>
      <div className="p-3 sm:p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Butter', val: '113 g' },
            { label: 'Sugar', val: '200 g' },
            { label: 'Flour', val: '280 g' },
            { label: 'Egg', val: '1 med' },
          ].map(n => (
            <div key={n.label} className="flex justify-between gap-2 rounded-lg bg-white/10 px-2.5 py-2 text-[11px]">
              <span className="text-orange-100/80">{n.label}</span>
              <span className="font-mono font-semibold text-white">{n.val}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white/10 px-3 py-2.5">
          <div className="flex justify-between text-[10px] text-orange-200/80 mb-1">
            <span>Water activity</span>
            <span className="font-mono text-white">0.52 · Chewy</span>
          </div>
          <div className="h-2 rounded-full bg-black/30 overflow-hidden">
            <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>
          <div className="flex justify-between text-[10px] text-orange-200/80 mt-1">
            <span>Spread ratio</span>
            <span className="font-mono text-white">7.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
