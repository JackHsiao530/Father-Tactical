import React from 'react';

export default function RealisticFire() {
  return (
    <>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-45deg) scale(1) skewX(0deg); opacity: 0.9; }
          25% { transform: rotate(-43deg) scale(1.02, 0.98) skewX(2deg); opacity: 1; }
          50% { transform: rotate(-48deg) scale(0.98, 1.05) skewX(-2deg); opacity: 0.8; }
          75% { transform: rotate(-44deg) scale(1.01, 0.99) skewX(1deg); opacity: 0.95; }
        }

        @keyframes sway-reverse {
          0%, 100% { transform: rotate(-45deg) scale(1); opacity: 0.9; }
          25% { transform: rotate(-47deg) scale(0.98, 1.04) skewY(-2deg); opacity: 0.8; }
          50% { transform: rotate(-43deg) scale(1.02, 0.98) skewY(2deg); opacity: 1; }
          75% { transform: rotate(-46deg) scale(0.99, 1.01) skewY(-1deg); opacity: 0.85; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes float-ember {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100px) scale(0.5) translateX(20px); opacity: 0; }
        }

        .flame-shape {
          border-radius: 50% 0 50% 50%;
          transform-origin: bottom left;
          mix-blend-mode: screen;
        }

        .flame-red {
          width: 140px;
          height: 140px;
          background: #d84315;
          box-shadow: 0 0 50px #FF5722, inset 0 0 20px #bf360c;
          animation: sway 2.8s ease-in-out infinite alternate;
          filter: blur(8px);
        }

        .flame-orange {
          width: 100px;
          height: 100px;
          background: #FF5722;
          box-shadow: 0 0 30px #FF9800;
          animation: sway-reverse 2.2s ease-in-out infinite alternate;
          filter: blur(4px);
        }

        .flame-yellow {
          width: 65px;
          height: 65px;
          background: #FFBF00;
          box-shadow: 0 0 20px #FFEB3B;
          animation: sway 1.8s ease-in-out infinite alternate;
          filter: blur(2px);
        }

        .flame-white {
          width: 35px;
          height: 35px;
          background: #FFFFFF;
          box-shadow: 0 0 10px #FFF9C4;
          animation: sway-reverse 1.4s ease-in-out infinite alternate;
          filter: blur(1px);
        }

        .ember {
          animation: float-ember 2.5s ease-in infinite;
        }
      `}</style>

      <div className="relative w-64 h-64 flex justify-center items-end pointer-events-none pb-4">
        {/* Base Ambient Glow */}
        <div 
          className="absolute bottom-4 w-56 h-56 bg-[#FF5722] rounded-full blur-[60px] mix-blend-screen" 
          style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}
        />
        
        {/* Core Flames - The pure CSS stacked teardrop trick */}
        <div className="absolute bottom-8 w-full h-[150px] opacity-90 drop-shadow-xl">
          <div className="absolute bottom-0 left-1/2 flame-shape flame-red" />
          <div className="absolute bottom-2 left-1/2 flame-shape flame-orange" />
          <div className="absolute bottom-4 left-1/2 flame-shape flame-yellow" />
          <div className="absolute bottom-6 left-1/2 flame-shape flame-white" />
        </div>

        {/* Floating Sparks/Embers handled by static CSS */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-10 w-1.5 h-1.5 bg-[#FFBF00] rounded-full ember"
            style={{
              left: `calc(50% + ${(Math.random() - 0.5) * 80}px)`,
              animationDuration: `${2 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * -3}s`
            }}
          />
        ))}

        {/* Physical Logs underneath */}
        <div className="absolute bottom-0 w-48 h-20 flex justify-center items-center">
          {/* Base Ash / Ground Shadow */}
          <div className="absolute bottom-0 w-56 h-12 bg-black blur-[10px] rounded-[100%] scale-y-50" />
          
          {/* Embers glow underneath logs */}
          <div 
            className="absolute bottom-2 w-32 h-8 bg-[#FF5722] blur-[12px] opacity-80 rounded-full mix-blend-screen" 
            style={{ animation: 'pulse-glow 3s ease-in-out infinite alternate-reverse' }}
          />
          <div className="absolute bottom-2 w-20 h-6 bg-[#FFBF00] blur-[8px] opacity-70 rounded-full mix-blend-screen" />
          
          {/* Back Log */}
          <div className="absolute w-36 h-7 rounded-full rotate-[18deg] -translate-x-4 -translate-y-2 overflow-hidden border-b border-orange-900/30"
               style={{
                 background: 'linear-gradient(to bottom, #2a1f1a, #0a0806)',
                 boxShadow: 'inset 0 -4px 12px rgba(255, 87, 34, 0.4), 0 10px 20px rgba(0,0,0,0.8)'
               }}>
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />
            <div className="absolute top-1 left-4 w-8 h-3 bg-[#FF5722] blur-[4px] rounded-full mix-blend-screen" 
                 style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
          </div>

          {/* Middle Log */}
          <div className="absolute w-40 h-8 rounded-full -rotate-[15deg] translate-x-2 overflow-hidden border-b border-orange-900/40"
               style={{
                 background: 'linear-gradient(to bottom, #33251e, #050403)',
                 boxShadow: 'inset 0 -5px 15px rgba(255, 87, 34, 0.6), 0 12px 24px rgba(0,0,0,0.9)'
               }}>
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(2deg, transparent, transparent 3px, #000 3px, #000 5px)' }} />
            <div className="absolute top-2 left-10 w-12 h-4 bg-[#FF5722] blur-[5px] rounded-full mix-blend-screen" 
                 style={{ animation: 'pulse-glow 2.5s ease-in-out infinite alternate-reverse' }} />
            <div className="absolute bottom-1 right-6 w-8 h-2 bg-[#FFBF00] blur-[3px] rounded-full mix-blend-screen" 
                 style={{ animation: 'pulse-glow 1.8s ease-in-out infinite' }} />
          </div>

          {/* Front Log */}
          <div className="absolute w-32 h-7 rounded-full rotate-[4deg] translate-y-3 -translate-x-2 overflow-hidden border-b border-orange-900/50"
               style={{
                 background: 'linear-gradient(to bottom, #241a15, #000000)',
                 boxShadow: 'inset 0 -3px 12px rgba(255, 87, 34, 0.8), 0 15px 25px rgba(0,0,0,0.95)'
               }}>
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(-2deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />
            <div className="absolute top-1 left-1/2 w-16 h-3 bg-[#FFBF00] blur-[4px] rounded-full mix-blend-screen -translate-x-1/2" 
                 style={{ animation: 'pulse-glow 2.2s ease-in-out infinite' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
          </div>
        </div>
      </div>
    </>
  );
}
