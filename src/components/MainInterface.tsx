import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mode } from '../App';
import FrontlineMode from './FrontlineMode';
import CampfireMode from './CampfireMode';

interface MainInterfaceProps {
  initialMode: Mode;
}

export default function MainInterface({ initialMode }: MainInterfaceProps) {
  const [mode, setMode] = useState<Mode>(initialMode);

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col bg-black">
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
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507499036636-f716246c2c23?q=80&w=2069&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-zinc-950/80" />
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
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=2000&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-stone-950/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="relative z-10 flex-1 overflow-hidden">
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
    </div>
  );
}
