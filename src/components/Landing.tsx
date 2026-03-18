import { motion } from 'motion/react';
import { Shield, Flame } from 'lucide-react';
import { Mode } from '../App';

interface LandingProps {
  onSelectMode: (mode: Mode) => void;
}

export default function Landing({ onSelectMode }: LandingProps) {
  return (
    <div className="flex flex-row h-screen w-full overflow-hidden font-sans bg-black relative">
      
      {/* App Title & Onboarding Description */}
      <div className="absolute top-12 md:top-16 left-0 w-full flex flex-col items-center z-20 pointer-events-none px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-white tracking-[0.2em] uppercase font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-2 text-center"
        >
          Fatherhood Tactical
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl text-zinc-300 tracking-[0.3em] font-light mb-8 drop-shadow-md text-center"
        >
          父親戰術支援系統
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs md:text-sm text-zinc-300 tracking-widest max-w-lg text-center px-6 bg-black/60 backdrop-blur-md py-3 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          專為父親打造的心理支援介面。請選擇您目前的狀態：
        </motion.p>
      </div>

      {/* Left Side: Frontline Mode */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center cursor-pointer relative group overflow-hidden"
        whileHover={{ flex: 1.1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={() => onSelectMode('frontline')}
      >
        {/* Realistic Tactical Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507499036636-f716246c2c23?q=80&w=2069&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-zinc-950/80 group-hover:bg-zinc-950/60 transition-colors duration-700" />
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
        
        <motion.div 
          className="relative z-10 flex flex-col items-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative mb-8">
            <Shield size={80} className="text-[#FF5722] stroke-1 drop-shadow-[0_0_15px_rgba(255,87,34,0.8)]" />
            <motion.div 
              className="absolute inset-0 border border-[#FF5722] rounded-full opacity-0 group-hover:opacity-50 group-hover:scale-150 transition-all duration-700 shadow-[0_0_20px_rgba(255,87,34,0.5)]"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-widest uppercase mb-4 font-mono drop-shadow-lg whitespace-nowrap">
            Frontline
          </h2>
          <p className="text-zinc-400 tracking-widest text-xs md:text-sm uppercase font-mono whitespace-nowrap">
            我還能戰鬥
          </p>
        </motion.div>
      </motion.div>

      {/* Right Side: Campfire Mode */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center cursor-pointer relative group overflow-hidden"
        whileHover={{ flex: 1.1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={() => onSelectMode('campfire')}
      >
        {/* Realistic Forest/Night Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-700"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=2000&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-stone-950/80 group-hover:bg-stone-950/60 transition-colors duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
        
        <motion.div 
          className="relative z-10 flex flex-col items-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative mb-8">
            <Flame size={80} className="text-[#FFBF00] stroke-1 drop-shadow-[0_0_15px_rgba(255,191,0,0.6)]" />
            <motion.div 
              className="absolute inset-0 bg-[#FFBF00] rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-stone-200 tracking-widest uppercase mb-4 drop-shadow-lg whitespace-nowrap">
            Campfire
          </h2>
          <p className="text-stone-400 tracking-widest text-xs md:text-sm uppercase whitespace-nowrap">
            我累了，想躲一下
          </p>
        </motion.div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-0 w-full flex justify-center z-20 pointer-events-none px-4"
      >
        <p className="text-zinc-500 text-[10px] md:text-xs tracking-wider text-center max-w-lg bg-black/40 backdrop-blur-sm py-2 px-4 rounded-full">
          溫暖提醒：這裡是一個讓心靈喘息的空間。若您感到無法承受的壓力或情緒困擾，請務必尋求專業醫療協助。
        </p>
      </motion.div>
    </div>
  );
}
