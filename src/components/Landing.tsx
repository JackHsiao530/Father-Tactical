import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Flame } from 'lucide-react';
import { Mode } from '../App';

interface LandingProps {
  onSelectMode: (mode: Mode) => void;
}

export default function Landing({ onSelectMode }: LandingProps) {
  const [selected, setSelected] = useState<Mode | null>(null);

  const handleSelect = (mode: Mode) => {
    if (selected) return;
    setSelected(mode);
    // Let the deep breath animation play for 1.5s before unmounting
    setTimeout(() => {
      onSelectMode(mode);
    }, 1500);
  };

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden font-sans bg-black relative">
      
      {/* App Title & Onboarding Description */}
      <motion.div 
        className="absolute top-12 md:top-16 left-0 w-full flex flex-col items-center z-20 pointer-events-none px-4"
        animate={{ opacity: selected ? 0 : 1, y: selected ? -20 : 0 }}
        transition={{ duration: 1 }}
      >
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
      </motion.div>

      {/* Left Side: Frontline Mode */}
      <motion.div
        className={`flex flex-col items-center justify-center relative overflow-hidden ${selected && selected !== 'frontline' ? 'pointer-events-none' : 'cursor-pointer group'}`}
        initial={{ flex: 1, opacity: 1 }}
        animate={{ 
          flex: selected === 'frontline' ? 100 : (selected === 'campfire' ? 0.0001 : 1),
          opacity: selected === 'campfire' ? 0 : 1
        }}
        whileHover={!selected ? { flex: 1.1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => handleSelect('frontline')}
      >
        {/* Realistic Tactical Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 mix-blend-luminosity"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1507499036636-f716246c2c23?q=80&w=2069&auto=format&fit=crop")',
            opacity: selected === 'frontline' ? 0.8 : 0.4 
          }}
        />
        <div className={`absolute inset-0 transition-colors duration-1000 ${selected === 'frontline' ? 'bg-[#FF5722]/20' : 'bg-zinc-950/80 group-hover:bg-zinc-950/60'}`} />
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
        
        <motion.div 
          className="relative z-10 flex flex-col items-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: selected === 'frontline' ? 0.2 : 1, 
            y: 0,
            scale: selected === 'frontline' ? 1.5 : 1
          }}
          transition={{ duration: selected === 'frontline' ? 1.5 : 0.8, delay: selected ? 0 : 0.2 }}
        >
          <div className="relative mb-8">
            <Shield size={80} className="text-[#FF5722] stroke-1 drop-shadow-[0_0_15px_rgba(255,87,34,0.8)]" />
            <motion.div 
              className={`absolute inset-0 border border-[#FF5722] rounded-full shadow-[0_0_20px_rgba(255,87,34,0.5)] transition-all duration-1000 ${selected === 'frontline' ? 'opacity-100 scale-[3]' : 'opacity-0 group-hover:opacity-50 group-hover:scale-150'}`}
            />
          </div>
          <motion.h2 animate={{ opacity: selected === 'frontline' ? 0 : 1 }} transition={{ duration: 1 }} className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-widest uppercase mb-4 font-mono drop-shadow-lg whitespace-nowrap">
            Frontline
          </motion.h2>
          <motion.p animate={{ opacity: selected === 'frontline' ? 0 : 1 }} transition={{ duration: 1 }} className="text-zinc-400 tracking-widest text-xs md:text-sm uppercase font-mono whitespace-nowrap">
            我還能戰鬥
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Side: Campfire Mode */}
      <motion.div
        className={`flex flex-col items-center justify-center relative overflow-hidden ${selected && selected !== 'campfire' ? 'pointer-events-none' : 'cursor-pointer group'}`}
        initial={{ flex: 1, opacity: 1 }}
        animate={{ 
          flex: selected === 'campfire' ? 100 : (selected === 'frontline' ? 0.0001 : 1),
          opacity: selected === 'frontline' ? 0 : 1
        }}
        whileHover={!selected ? { flex: 1.1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => handleSelect('campfire')}
      >
        {/* Realistic Forest/Night Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=2000&auto=format&fit=crop")',
            opacity: selected === 'campfire' ? 0.8 : 0.3 
          }}
        />
        <div className={`absolute inset-0 transition-colors duration-1000 ${selected === 'campfire' ? 'bg-[#FFBF00]/20' : 'bg-stone-950/80 group-hover:bg-stone-950/60'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
        
        <motion.div 
          className="relative z-10 flex flex-col items-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: selected === 'campfire' ? 0.2 : 1, 
            y: 0,
            scale: selected === 'campfire' ? 1.5 : 1
          }}
          transition={{ duration: selected === 'campfire' ? 1.5 : 0.8, delay: selected ? 0 : 0.4 }}
        >
          <div className="relative mb-8">
            <Flame size={80} className="text-[#FFBF00] stroke-1 drop-shadow-[0_0_15px_rgba(255,191,0,0.6)]" />
            <motion.div 
              className={`absolute inset-0 bg-[#FFBF00] rounded-full blur-2xl transition-all duration-1000 ${selected === 'campfire' ? 'opacity-80 scale-[3]' : 'opacity-0 group-hover:opacity-30'}`}
            />
          </div>
          <motion.h2 animate={{ opacity: selected === 'campfire' ? 0 : 1 }} transition={{ duration: 1 }} className="text-2xl md:text-3xl font-light text-stone-200 tracking-widest uppercase mb-4 drop-shadow-lg whitespace-nowrap">
            Campfire
          </motion.h2>
          <motion.p animate={{ opacity: selected === 'campfire' ? 0 : 1 }} transition={{ duration: 1 }} className="text-stone-400 tracking-widest text-xs md:text-sm uppercase whitespace-nowrap">
            我累了，想躲一下
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 0 : 1 }}
        transition={{ delay: selected ? 0 : 1, duration: 1 }}
        className="absolute bottom-6 left-0 w-full flex justify-center z-20 pointer-events-none px-4"
      >
        <p className="text-zinc-500 text-[10px] md:text-xs tracking-wider text-center max-w-lg bg-black/40 backdrop-blur-sm py-2 px-4 rounded-full">
          溫暖提醒：這裡是一個讓心靈喘息的空間。若您感到無法承受的壓力或情緒困擾，請務必尋求專業醫療協助。
        </p>
      </motion.div>
    </div>
  );
}
