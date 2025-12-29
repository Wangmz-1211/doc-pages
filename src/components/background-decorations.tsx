import React from 'react';

export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 pointer-events-none overflow-hidden">
      {/* Very subtle Gradient Orbs */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100vw] h-[800px] opacity-20 dark:opacity-10"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(120, 119, 198, 0.3) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div 
            className="absolute inset-0" 
            style={{ 
                background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.1), transparent)',
                filter: 'blur(100px)' 
            }} 
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128, 128, 128, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Noise Texture for 'Sanded' feel */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
}
