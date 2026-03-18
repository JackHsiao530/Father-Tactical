import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, History, Flame, Trash2 } from 'lucide-react';
import RealisticFire from './RealisticFire';

const STAR_TEXT_POOL = [
  "今天又對大兒子發脾氣了，明明知道他只是想引起注意，但我真的好累。",
  "老婆抱怨我不夠體貼，但我每天加班到九點，真的不知道還能怎麼做。",
  "看著房貸帳單，有時候真想逃跑。但我不能。",
  "好懷念以前單身時，可以週末睡到自然醒的日子。",
  "工作出包被主管念了一頓，回家還要裝作若無其事。",
  "覺得自己好像只是個提款機，沒有人真正在乎我累不累。",
  "看著父母變老，小孩還小，夾在中間的壓力快把我壓垮了。",
  "很久沒有跟朋友出去喝一杯了，大家都忙，我也忙。",
  "好想買那台新相機，但想想小孩的補習費，還是默默關掉網頁。",
  "今天偷偷在車上哭了一下才進家門，不想讓老婆擔心。",
  "看著年輕同事升職，自己好像卡在瓶頸期，有點焦慮。",
  "假日帶小孩去遊樂園，其實我只想在家躺一整天。",
  "有時候覺得自己像個透明人，只有要繳費時才會被想起。",
  "好久沒有跟老婆好好說話了，每天都在為生活瑣事吵架。",
  "真希望有人能拍拍我的肩膀說：你已經做得很好了。",
  "看著肚子越來越大，體力越來越差，有點懷念以前打球的日子。"
];

const GREETINGS = [
  "指揮官，這裡沒有敵人。卸下裝備，靠近火光吧。",
  "防線外的事，明天再說。現在，允許自己安靜。",
  "掃描不到任何威脅。你的疲憊，這裡可以接收。",
  "系統已切換至靜默模式。沒有人會在這裡要求你堅強。",
  "營火已點燃。把那些說不出口的重量，交給火焰吧。"
];

const ENCOURAGEMENT_POOL = [
  "辛苦了，這份重擔營火已經為你燃盡。",
  "你已經做得很好了，現在請好好休息。",
  "沒有人是完美的父親，你的努力我們都看見了。",
  "深呼吸，把明天的煩惱留給明天。",
  "這份壓力已經化為灰燼，隨風而逝了。",
  "允許自己脆弱，這是勇敢的第一步。"
];

type Tab = 'burn' | 'stars' | 'breathe';

interface Encouragement {
  type: string;
  count: number;
}

interface BurnRecord {
  id: number;
  text: string;
  createdAt: number;
  encouragements: Encouragement[];
}

function EncouragementTag({ enc }: { enc: Encouragement }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [emoji, ...textParts] = enc.type.split(' ');
  const text = textParts.join(' ');

  let intensityClass = "bg-stone-800/50 text-stone-400 border-transparent";
  if (enc.count >= 5) {
    intensityClass = "bg-orange-900/20 text-orange-300 border-orange-500/20 shadow-[0_0_8px_rgba(255,87,34,0.15)]";
  } else if (enc.count >= 2) {
    intensityClass = "bg-stone-800 text-stone-300 border-stone-700";
  }

  return (
    <button 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`text-xs px-2.5 py-1.5 rounded-md leading-relaxed flex items-center border transition-all duration-300 ${intensityClass}`}
      title="點擊顯示/隱藏文字"
    >
      <span className="text-base leading-none">{emoji}</span>
      <span className={`overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap ${isExpanded ? 'max-w-[100px] opacity-100 ml-1.5' : 'max-w-0 opacity-0 ml-0'}`}>
        {text}
      </span>
    </button>
  );
}

export default function CampfireMode() {
  const [activeTab, setActiveTab] = useState<Tab>('burn');
  const [inputText, setInputText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [sparks, setSparks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [starExitMode, setStarExitMode] = useState<'default' | 'flyUp'>('default');
  const [greeting, setGreeting] = useState('');
  const [breathingPhase, setBreathingPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [isBreathing, setIsBreathing] = useState(false);
  
  const [stars, setStars] = useState<{id: number, text: string, x: number, y: number}[]>([]);
  const [myBurns, setMyBurns] = useState<BurnRecord[]>([
    {
      id: 1,
      text: "上個月的業績沒達標，不知道年終會不會受影響，不敢跟老婆說。",
      createdAt: Date.now() - (2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // 2 days 5 hours ago
      encouragements: [
        { type: '🤝 我也是', count: 1 },
        { type: '🔥 你行的', count: 6 },
        { type: '🫂 辛苦了', count: 3 },
        { type: '✨ 懂你', count: 1 }
      ]
    },
    {
      id: 2,
      text: "今天又對大兒子發脾氣了，明明知道他只是想引起注意，但我真的好累。",
      createdAt: Date.now() - (5 * 60 * 60 * 1000), // 5 hours ago
      encouragements: [
        { type: '🫂 辛苦了', count: 12 }
      ]
    }
  ]);
  const [showMyBurns, setShowMyBurns] = useState(false);
  const [encouragementMessage, setEncouragementMessage] = useState<string | null>(null);
  const [hasUnreadEcho, setHasUnreadEcho] = useState(false);
  const [echoToast, setEchoToast] = useState<string | null>(null);

  const handleDeleteBurn = (id: string) => {
    setMyBurns(prev => prev.filter(burn => burn.id !== id));
  };

  useEffect(() => {
    setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
    const interval = setInterval(() => {
      setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
    }, 15000);
    refreshStars();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab !== 'breathe') {
      setIsBreathing(false);
      setBreathingPhase('idle');
    }
  }, [activeTab]);

  useEffect(() => {
    if (encouragementMessage) {
      const timer = setTimeout(() => {
        setEncouragementMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [encouragementMessage]);

  // Simulate receiving an echo from someone else
  useEffect(() => {
    const timer = setTimeout(() => {
      setEchoToast("✨ 遠方的營火，對你的心事產生了共鳴");
      setHasUnreadEcho(true);
      // Auto hide the toast after 6 seconds
      setTimeout(() => setEchoToast(null), 6000);
    }, 15000 + Math.random() * 10000); // Trigger after 15-25 seconds for demo
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isBreathing) {
      setBreathingPhase('idle');
      return;
    }

    let timeoutId: NodeJS.Timeout;

    if (breathingPhase === 'idle') {
      setBreathingPhase('inhale');
      if (navigator.vibrate) navigator.vibrate(50);
    } else if (breathingPhase === 'inhale') {
      timeoutId = setTimeout(() => {
        setBreathingPhase('hold');
        if (navigator.vibrate) navigator.vibrate(50);
      }, 4000);
    } else if (breathingPhase === 'hold') {
      timeoutId = setTimeout(() => {
        setBreathingPhase('exhale');
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      }, 7000);
    } else if (breathingPhase === 'exhale') {
      timeoutId = setTimeout(() => {
        setBreathingPhase('inhale');
        if (navigator.vibrate) navigator.vibrate(50);
      }, 8000);
    }

    return () => clearTimeout(timeoutId);
  }, [isBreathing, breathingPhase]);

  const refreshStars = () => {
    const isMobile = window.innerWidth < 768;
    const maxStars = isMobile ? 6 : 12;

    const shuffled = [...STAR_TEXT_POOL].sort(() => 0.5 - Math.random());
    const newStars = shuffled.slice(0, maxStars).map((text, index) => {
      // Avoid top text (y < 20%) and bottom buttons (y > 75%)
      // Stars can be near the campfire (center)
      const x = 5 + Math.random() * 90; // 5% to 95%
      const y = 20 + Math.random() * 55; // 20% to 75%

      return {
        id: Date.now() + index,
        text,
        x,
        y
      };
    });
    setStars(newStars);
    setActiveStar(null);
  };

  const getRemainingTime = (createdAt: number) => {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    const age = Date.now() - createdAt;
    const remaining = maxAge - age;
    if (remaining <= 0) return "已消散";
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `剩餘 ${days} 天 ${hours} 小時`;
  };

  const handleBurn = () => {
    if (!inputText.trim() || isBurning) return;
    
    setIsBurning(true);
    
    const newBurn: BurnRecord = {
      id: Date.now(),
      text: inputText,
      createdAt: Date.now(),
      encouragements: []
    };
    
    // Generate sparks
    const newSparks = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 250, // Random spread
      y: -Math.random() * 400 - 100 // Upward movement
    }));
    
    setSparks(newSparks);
    
    // Reset after animation
    setTimeout(() => {
      setSparks([]);
      setMyBurns(prev => [newBurn, ...prev]);
      setInputText('');
      setIsBurning(false);
      
      const randomMsg = ENCOURAGEMENT_POOL[Math.floor(Math.random() * ENCOURAGEMENT_POOL.length)];
      setEncouragementMessage(randomMsg);
    }, 3500);
  };

  const toggleBreathing = () => {
    if (activeTab !== 'breathe') return;
    setIsBreathing(prev => !prev);
  };

  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center p-6 text-stone-300 font-sans relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Greeting */}
      <div className="absolute top-6 w-full flex justify-center z-20 h-6">
        <AnimatePresence mode="wait">
          <motion.p 
            key={greeting}
            className="text-center text-stone-500 tracking-widest text-xs max-w-md drop-shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1 }}
          >
            {greeting}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Tabs & Description */}
      <div className="absolute top-16 z-30 flex flex-col items-center w-full px-6">
        <div className="flex space-x-6 md:space-x-12 border-b border-stone-800/80 pb-3 mb-4">
          <button 
            onClick={() => setActiveTab('burn')} 
            className={`tracking-widest text-sm transition-all duration-300 relative ${activeTab === 'burn' ? 'text-[#FFBF00] drop-shadow-[0_0_8px_rgba(255,191,0,0.8)]' : 'text-stone-500 hover:text-stone-300'}`}
          >
            焚毀壓力
            {activeTab === 'burn' && <motion.div layoutId="activeTab" className="absolute -bottom-[13px] left-0 w-full h-0.5 bg-[#FFBF00] shadow-[0_0_8px_rgba(255,191,0,0.8)]" />}
          </button>
          <button 
            onClick={() => setActiveTab('stars')} 
            className={`tracking-widest text-sm transition-all duration-300 relative ${activeTab === 'stars' ? 'text-[#FFBF00] drop-shadow-[0_0_8px_rgba(255,191,0,0.8)]' : 'text-stone-500 hover:text-stone-300'}`}
          >
            星辰密語
            {activeTab === 'stars' && <motion.div layoutId="activeTab" className="absolute -bottom-[13px] left-0 w-full h-0.5 bg-[#FFBF00] shadow-[0_0_8px_rgba(255,191,0,0.8)]" />}
          </button>
          <button 
            onClick={() => setActiveTab('breathe')} 
            className={`tracking-widest text-sm transition-all duration-300 relative ${activeTab === 'breathe' ? 'text-[#FFBF00] drop-shadow-[0_0_8px_rgba(255,191,0,0.8)]' : 'text-stone-500 hover:text-stone-300'}`}
          >
            靜默校準
            {activeTab === 'breathe' && <motion.div layoutId="activeTab" className="absolute -bottom-[13px] left-0 w-full h-0.5 bg-[#FFBF00] shadow-[0_0_8px_rgba(255,191,0,0.8)]" />}
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.p 
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-stone-400 text-xs md:text-sm text-center max-w-md leading-relaxed h-12"
          >
            {activeTab === 'burn' && "寫下那些無法對家人說的疲憊與壓力，將它們丟入營火中焚毀。這裡沒有批判，只有接納。"}
            {activeTab === 'stars' && "點擊星辰，看見其他父親留下的匿名壓力。給予他們無聲的支持，讓彼此知道我們並不孤單。"}
            {activeTab === 'breathe' && "點擊營火，跟隨光暈的縮放進行 4-7-8 呼吸法 (吸氣4秒、憋氣7秒、吐氣8秒)，重新找回內心的平靜。"}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Starfield */}
      <AnimatePresence>
        {activeTab === 'stars' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 z-40 pointer-events-none"
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center cursor-pointer pointer-events-auto"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                onClick={() => {
                  setStarExitMode('default');
                  setActiveStar(star.id);
                }}
              >
                <motion.div
                  className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] relative"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-[#FFBF00] blur-sm opacity-60 rounded-full" />
                </motion.div>
              </motion.div>
            ))}
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Star Modal */}
      <AnimatePresence custom={starExitMode}>
        {activeStar && activeTab === 'stars' && (
          <motion.div
            key="active-star-modal"
            custom={starExitMode}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
              exit: (mode) => (
                mode === 'flyUp' 
                  ? { opacity: 0, scale: 0, y: -200, transition: { duration: 0.6, ease: "easeIn" } }
                  : { opacity: 0, scale: 0.9 }
              )
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-50 bg-gradient-to-b from-stone-900/90 to-black/95 backdrop-blur-xl p-8 rounded-3xl max-w-sm w-full border border-white/10 shadow-[0_0_40px_rgba(255,191,0,0.15)]"
          >
            <button 
              onClick={() => {
                setStarExitMode('default');
                setActiveStar(null);
              }}
              className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <p className="text-lg leading-relaxed mb-8 text-stone-200 drop-shadow-sm mt-2">
              {stars.find(s => s.id === activeStar)?.text}
            </p>
            <div className="flex justify-between">
              {['🔥 你行的', '✨ 懂你', '🫂 辛苦了', '🤝 我也是'].map((btn, i) => (
                <button 
                  key={i}
                  className="text-xs flex flex-col items-center space-y-2 text-stone-400 hover:text-[#FFBF00] transition-colors hover:drop-shadow-[0_0_8px_rgba(255,191,0,0.8)]"
                  onClick={() => {
                    setStarExitMode('flyUp');
                    setActiveStar(null);
                  }}
                >
                  <span className="text-xl">{btn.split(' ')[0]}</span>
                  <span>{btn.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Burns Modal */}
      <AnimatePresence>
        {showMyBurns && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md h-[70vh] bg-stone-950/95 backdrop-blur-xl rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-stone-800">
                <h3 className="text-lg font-light tracking-widest text-[#FFBF00] flex items-center">
                  <Flame size={20} className="mr-2" />
                  我的餘燼
                </h3>
                <button onClick={() => setShowMyBurns(false)} className="text-stone-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {myBurns.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-500">
                    <Flame size={48} className="mb-4 opacity-20" />
                    <p className="tracking-widest text-sm">尚未焚毀任何壓力</p>
                  </div>
                ) : (
                  myBurns.map(burn => (
                    <div key={burn.id} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-5 group relative">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <p className="text-stone-300 text-sm leading-relaxed">{burn.text}</p>
                        <button
                          onClick={() => handleDeleteBurn(burn.id)}
                          className="text-stone-600 hover:text-red-400 transition-colors p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 shrink-0"
                          title="刪除這則餘燼"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-stone-800/50">
                        <div className="flex flex-wrap gap-2">
                          {burn.encouragements.length > 0 ? (
                            burn.encouragements.map((enc, i) => (
                              <EncouragementTag key={i} enc={enc} />
                            ))
                          ) : (
                            <span className="text-xs text-stone-500 italic flex items-center gap-1.5">
                              <Flame size={12} className="text-stone-600 shrink-0" />
                              營火正靜靜陪伴著這份心事
                            </span>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <span className="text-[10px] text-stone-500 font-mono tracking-wider shrink-0">
                            {getRemainingTime(burn.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Encouragement Modal */}
      <AnimatePresence>
        {encouragementMessage && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-stone-900/95 backdrop-blur-xl border border-[#FFBF00]/30 p-6 rounded-3xl shadow-[0_0_40px_rgba(255,191,0,0.2)] flex flex-col items-center text-center max-w-sm w-full pointer-events-auto"
            >
              <Flame size={28} className="text-[#FFBF00] mb-4 opacity-80" />
              <p className="text-stone-200 text-sm md:text-base leading-relaxed mb-6 tracking-wide">
                {encouragementMessage}
              </p>
              <button
                onClick={() => setEncouragementMessage(null)}
                className="text-xs text-stone-400 hover:text-[#FFBF00] transition-colors px-6 py-2 border border-stone-700/50 rounded-full hover:border-[#FFBF00]/50 tracking-widest"
              >
                我知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Programmatic Realistic Campfire & Breathing Circle */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none mt-10">
        <div className={`relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center pointer-events-auto group ${activeTab === 'breathe' ? 'cursor-pointer' : 'cursor-default'}`} onClick={toggleBreathing}>
          
          {/* Programmatic Fire Component */}
          <div className="absolute z-10 scale-125 md:scale-150 mb-10">
            <RealisticFire />
          </div>
          
          {/* Breathing Halo Overlay */}
          <motion.div
            className="absolute inset-0 bg-[#FFBF00] rounded-full blur-[80px] md:blur-[100px] mix-blend-screen pointer-events-none z-20"
            animate={{
              scale: breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'hold' ? 1.5 : 1,
              opacity: breathingPhase === 'inhale' ? 0.4 : breathingPhase === 'hold' ? 0.4 : 0.1,
            }}
            transition={{
              duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'hold' ? 7 : breathingPhase === 'exhale' ? 8 : 2,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Breathing Text */}
        <div className="h-8 relative flex justify-center items-center -mt-16 md:-mt-20 z-30">
          <AnimatePresence>
            {activeTab === 'breathe' && !isBreathing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="absolute whitespace-nowrap text-[#FFBF00] tracking-widest text-sm animate-pulse"
              >
                點擊營火開始
              </motion.div>
            )}
            {breathingPhase !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute whitespace-nowrap text-[#FFBF00] tracking-widest text-sm font-mono drop-shadow-[0_0_8px_rgba(255,191,0,0.8)] flex flex-col items-center"
              >
                <span>
                  {breathingPhase === 'inhale' && 'INHALING (4s)'}
                  {breathingPhase === 'hold' && 'HOLDING (7s)'}
                  {breathingPhase === 'exhale' && 'EXHALING (8s)'}
                </span>
                <span className="text-[10px] text-stone-400 mt-2 font-sans tracking-widest opacity-80">再次點擊營火即可停止</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Echo Toast Notification */}
      <AnimatePresence>
        {echoToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-32 z-40 bg-stone-800/60 backdrop-blur-md px-6 py-3 rounded-full border border-[#FFBF00]/30 text-stone-300 text-sm tracking-widest shadow-[0_0_15px_rgba(255,191,0,0.1)] flex items-center space-x-3 pointer-events-none"
          >
            <Flame size={16} className="text-[#FFBF00]" />
            <span>{echoToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="relative z-30 w-full max-w-lg mt-auto mb-8 flex justify-center">
        <AnimatePresence mode="wait">
          {activeTab === 'stars' && (
            <motion.div
              key="star-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex space-x-6"
            >
              <button 
                onClick={() => {
                  setShowMyBurns(true);
                  setHasUnreadEcho(false);
                }}
                className={`relative flex items-center space-x-2 bg-stone-900/80 border ${hasUnreadEcho ? 'border-[#FFBF00]/50 text-[#FFBF00]' : 'border-stone-700/50 text-stone-300'} px-6 py-3 rounded-full hover:text-[#FFBF00] hover:border-[#FFBF00]/50 transition-all backdrop-blur-md shadow-lg`}
              >
                {hasUnreadEcho && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FFBF00]/10"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <History size={16} className="relative z-10" />
                <span className="text-sm tracking-widest relative z-10">我的餘燼</span>
              </button>
              <button 
                onClick={refreshStars}
                className="flex items-center space-x-2 bg-stone-900/80 border border-stone-700/50 text-stone-300 px-6 py-3 rounded-full hover:text-[#FFBF00] hover:border-[#FFBF00]/50 transition-all backdrop-blur-md shadow-lg"
              >
                <RefreshCw size={16} />
                <span className="text-sm tracking-widest">更新星空</span>
              </button>
            </motion.div>
          )}
          {activeTab === 'burn' && !isBurning && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px) brightness(1)' }}
              exit={{ 
                opacity: 0, 
                scale: 0.05, 
                y: -250, 
                filter: 'blur(8px) brightness(2)' 
              }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              className="relative w-full origin-center"
            >
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="寫下內心的壓力並化作餘燼..."
                className="w-full bg-stone-900/60 border border-stone-700/50 rounded-2xl p-6 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#FFBF00]/50 focus:ring-1 focus:ring-[#FFBF00]/50 resize-none h-32 backdrop-blur-md transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              />
              <button
                onClick={handleBurn}
                disabled={!inputText.trim()}
                className="absolute bottom-4 right-4 p-3 bg-stone-800/80 rounded-xl text-stone-400 hover:text-[#FFBF00] hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-[0_0_15px_rgba(255,191,0,0.4)]"
              >
                <Flame size={20} />
              </button>
            </motion.div>
          )}
          {activeTab === 'burn' && isBurning && (
            <motion.div key="sparks" className="h-32 w-full relative pointer-events-none">
              {/* Realistic Sparks Animation */}
              {sparks.map((spark) => (
                <motion.div
                  key={spark.id}
                  className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full blur-[1px]"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1, 
                    backgroundColor: '#FF5722',
                    scale: 1,
                    boxShadow: '0 0 10px #FF5722'
                  }}
                  animate={{ 
                    x: spark.x, 
                    y: spark.y, 
                    opacity: [1, 1, 0],
                    backgroundColor: ['#FF5722', '#FFBF00', '#FFFFFF'],
                    scale: [1, 0.5, 0],
                    boxShadow: ['0 0 10px #FF5722', '0 0 5px #FFBF00', '0 0 0px #FFFFFF']
                  }}
                  transition={{ 
                    duration: 2.5 + Math.random() * 1, 
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
