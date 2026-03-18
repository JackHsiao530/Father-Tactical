import { motion } from 'motion/react';

export default function RealisticFire() {
  return (
    <div className="relative w-64 h-64 flex justify-center items-end pointer-events-none">
      {/* Base Ambient Glow */}
      <div className="absolute bottom-4 w-56 h-56 bg-[#FF5722] rounded-full blur-[60px] opacity-30 mix-blend-screen" />
      
      {/* Flames Container */}
      <div className="relative w-full h-full flex justify-center items-end">
        
        {/* Outer Flames (Darker Orange/Red) */}
        {[...Array(12)].map((_, i) => {
          const size = 50 + Math.random() * 40;
          const left = 50 + (Math.random() - 0.5) * 40;
          const delay = Math.random() * -2;
          const duration = 1 + Math.random() * 1;
          
          return (
            <motion.div
              key={`outer-${i}`}
              className="absolute bottom-8 rounded-full mix-blend-screen"
              style={{
                width: size,
                height: size * 1.5,
                left: `${left}%`,
                x: '-50%',
                background: `radial-gradient(ellipse at bottom, #FF5722 0%, #d84315 40%, transparent 70%)`,
                filter: 'blur(6px)',
              }}
              animate={{
                y: [0, -120 - Math.random() * 60],
                scale: [1, 0.2],
                opacity: [0.6, 0],
                x: ['-50%', `calc(-50% + ${(Math.random() - 0.5) * 60}px)`]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeIn"
              }}
            />
          );
        })}

        {/* Mid Flames (Orange/Yellow) */}
        {[...Array(15)].map((_, i) => {
          const size = 40 + Math.random() * 40;
          const left = 50 + (Math.random() - 0.5) * 30;
          const delay = Math.random() * -2;
          const duration = 0.8 + Math.random() * 0.8;
          
          return (
            <motion.div
              key={`mid-${i}`}
              className="absolute bottom-6 rounded-full mix-blend-screen"
              style={{
                width: size,
                height: size * 1.5,
                left: `${left}%`,
                x: '-50%',
                background: `radial-gradient(ellipse at bottom, #FFBF00 0%, #FF5722 50%, transparent 70%)`,
                filter: 'blur(3px)',
              }}
              animate={{
                y: [0, -100 - Math.random() * 50],
                scale: [1, 0.1],
                opacity: [0.8, 0],
                x: ['-50%', `calc(-50% + ${(Math.random() - 0.5) * 40}px)`]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeIn"
              }}
            />
          );
        })}
        
        {/* Core bright flames (White/Yellow) */}
        {[...Array(8)].map((_, i) => {
          const size = 25 + Math.random() * 25;
          const left = 50 + (Math.random() - 0.5) * 15;
          const delay = Math.random() * -2;
          const duration = 0.5 + Math.random() * 0.5;
          
          return (
            <motion.div
              key={`core-${i}`}
              className="absolute bottom-4 rounded-full mix-blend-screen"
              style={{
                width: size,
                height: size * 1.5,
                left: `${left}%`,
                x: '-50%',
                background: `radial-gradient(ellipse at bottom, #FFFFFF 0%, #FFBF00 60%, transparent 80%)`,
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -60 - Math.random() * 30],
                scale: [1, 0],
                opacity: [1, 0],
                x: ['-50%', `calc(-50% + ${(Math.random() - 0.5) * 20}px)`]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeIn"
              }}
            />
          );
        })}
      </div>

      {/* Logs and Embers */}
      <div className="absolute bottom-0 w-48 h-20 flex justify-center items-center">
        {/* Base Ash / Ground Shadow */}
        <div className="absolute bottom-0 w-56 h-12 bg-black blur-[10px] rounded-[100%] scale-y-50" />
        
        {/* Embers glow underneath */}
        <div className="absolute bottom-2 w-32 h-8 bg-[#FF5722] blur-[12px] opacity-90 rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-2 w-20 h-6 bg-[#FFBF00] blur-[8px] opacity-80 rounded-full mix-blend-screen" />
        
        {/* Back Log (Left to Right) */}
        <div className="absolute w-36 h-7 rounded-full rotate-[18deg] -translate-x-4 -translate-y-2 overflow-hidden border-b border-orange-900/30"
             style={{
               background: 'linear-gradient(to bottom, #2a1f1a, #0a0806)',
               boxShadow: 'inset 0 -4px 12px rgba(255, 87, 34, 0.4), 0 10px 20px rgba(0,0,0,0.8)'
             }}>
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />
          <motion.div className="absolute top-1 left-4 w-8 h-3 bg-[#FF5722] blur-[4px] rounded-full mix-blend-screen" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>

        {/* Middle Log (Right to Left) */}
        <div className="absolute w-40 h-8 rounded-full -rotate-[15deg] translate-x-2 overflow-hidden border-b border-orange-900/40"
             style={{
               background: 'linear-gradient(to bottom, #33251e, #050403)',
               boxShadow: 'inset 0 -5px 15px rgba(255, 87, 34, 0.6), 0 12px 24px rgba(0,0,0,0.9)'
             }}>
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(2deg, transparent, transparent 3px, #000 3px, #000 5px)' }} />
          <motion.div className="absolute top-2 left-10 w-12 h-4 bg-[#FF5722] blur-[5px] rounded-full mix-blend-screen" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity }} />
          <motion.div className="absolute bottom-1 right-6 w-8 h-2 bg-[#FFBF00] blur-[3px] rounded-full mix-blend-screen" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </div>

        {/* Front Log (Horizontal-ish) */}
        <div className="absolute w-32 h-7 rounded-full rotate-[4deg] translate-y-3 -translate-x-2 overflow-hidden border-b border-orange-900/50"
             style={{
               background: 'linear-gradient(to bottom, #241a15, #000000)',
               boxShadow: 'inset 0 -3px 12px rgba(255, 87, 34, 0.8), 0 15px 25px rgba(0,0,0,0.95)'
             }}>
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(-2deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />
          <motion.div className="absolute top-1 left-1/2 w-16 h-3 bg-[#FFBF00] blur-[4px] rounded-full mix-blend-screen -translate-x-1/2" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.2, repeat: Infinity }} />
          {/* Charred texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
        </div>
        
        {/* Front tiny embers scattered */}
        <motion.div className="absolute bottom-0 left-4 w-2 h-1 bg-[#FFBF00] blur-[1px] rounded-full" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.div className="absolute bottom-1 right-8 w-3 h-1.5 bg-[#FF5722] blur-[1px] rounded-full" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.1, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-2 w-1.5 h-1 bg-[#FFFFFF] blur-[1px] rounded-full" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 1.2, repeat: Infinity }} />
      </div>
    </div>
  );
}
