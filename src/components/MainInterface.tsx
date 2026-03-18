import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { Mode } from '../App';
import FrontlineMode from './FrontlineMode';
import CampfireMode from './CampfireMode';
import frontlineBg from '../assets/frontline_bg.png';
import campfireBg from '../assets/campfire_bg.png';

interface MainInterfaceProps {
  initialMode: Mode;
  onReset: () => void;
}

export default function MainInterface({ initialMode, onReset }: MainInterfaceProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  
  // 動態綁定下拉距離
  const y = useMotionValue(0);
  const indicatorOpacity = useTransform(y, [0, 40, 120], [0, 0.4, 1]);
  const iconRotate = useTransform(y, [0, 150], [0, 180]);

  return (
    <div className="fixed inset-0 overflow-hidden flex flex-col bg-black">
      {/* Background Transition */}
      <AnimatePresence initial={false}>
        {mode === 'frontline' ? (
          <motion.div
            key="frontline-bg"
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity"
              style={{ backgroundImage: `url(${frontlineBg})` }}
            />
            <div className="absolute inset-0 bg-zinc-950/60" />
            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div
            key="campfire-bg"
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url(${campfireBg})` }}
            />
            <div className="absolute inset-0 bg-stone-950/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pull to refresh background indicator */}
      <motion.div 
        style={{ opacity: indicatorOpacity }}
        className="absolute top-16 w-full flex justify-center z-0"
      >
        <div className="text-stone-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          <motion.div style={{ rotate: iconRotate }}>
            <RefreshCw size={28} />
          </motion.div>
        </div>
      </motion.div>

      {/* Content Area Wrapper for Swipe */}
      <motion.div 
        className="relative z-10 flex-1 flex flex-col h-full overflow-hidden"
        style={{ y }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 150) {
            onReset();
          }
        }}
      >
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {mode === 'frontline' ? (
            <FrontlineMode key="frontline" />
          ) : (
            <CampfireMode key="campfire" />
          )}
        </AnimatePresence>
      </div>

      {/* Mode Toggle Switch */}
      <div className="relative z-20 h-24 flex items-center justify-center bg-transparent pb-6">
        <div className="flex items-center space-x-6 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <span 
            className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 drop-shadow-md ${mode === 'frontline' ? 'text-[#FF5722]' : 'text-zinc-500'}`}
          >
            Frontline
          </span>
          
          <button
            onClick={() => setMode(mode === 'frontline' ? 'campfire' : 'frontline')}
            className="relative w-16 h-8 rounded-full bg-zinc-900 border border-zinc-700 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <motion.div
              className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${mode === 'frontline' ? 'bg-[#FF5722]' : 'bg-[#FFBF00]'}`}
              animate={{ x: mode === 'frontline' ? 0 : 32 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </button>
          
          <span 
            className={`text-xs tracking-widest uppercase transition-colors duration-300 drop-shadow-md ${mode === 'campfire' ? 'text-[#FFBF00]' : 'text-stone-500'}`}
          >
            Campfire
          </span>
        </div>
      </div>
      </motion.div>
    </div>
  );
}
