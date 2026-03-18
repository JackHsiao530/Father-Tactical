import { motion } from 'motion/react';
import { Hexagon, CheckCircle2, ShieldAlert } from 'lucide-react';

const TASKS = [
  { id: 'OP-01', text: '對隊友說辛苦了', status: 'pending' },
  { id: 'OP-02', text: '獨自幫孩子洗澡', status: 'completed' },
  { id: 'OP-03', text: '睡前不滑手機', status: 'pending' },
];

const INTELS = [
  "代號 042 匯報：已成功掩護隊友(老婆)撤退至臥室補眠，目前單獨防守客廳，目標(女兒)情緒穩定。Over.",
  "夜間巡邏完畢。確認所有門窗上鎖，孩子被子已蓋好。防線安全。",
  "今日耗損率 80%。但在門口聽到『把拔回來了』，護盾已重新充能。",
  "戰術失誤：試圖跟兩歲半的目標講道理。已重新校準策略，改用零食誘導。",
  "後勤補給完成：已清洗所有奶瓶並完成高溫消毒。準備進入休眠模式。",
  "遭遇突發狀況：長輩的教養指導。已採取『靜默點頭』戰術迴避衝突，未造成友軍傷害。",
  "匯報：今天沒有發脾氣。雖然忍得很辛苦，但防線守住了。",
  "單兵作戰第 12 小時。隊友出差中。目前陣地有些混亂，但士氣尚存。",
  "已完成『睡前故事』任務，目標已進入深度睡眠。請求解除武裝。",
  "致各位戰友：今天大家都辛苦了。保持呼吸，我們明天繼續堅守。"
];

export default function FrontlineMode() {
  return (
    <motion.div
      className="h-full w-full flex flex-col md:flex-row p-6 md:p-12 gap-8 text-zinc-300 font-mono relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Column: Tasks */}
      <div className="flex-1 flex flex-col space-y-6 relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <Hexagon className="text-[#FF5722] drop-shadow-[0_0_10px_rgba(255,87,34,0.8)]" size={32} />
          <h2 className="text-2xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Daily Mission</h2>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto pr-4 custom-scrollbar">
          {TASKS.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/60 backdrop-blur-md border border-[#FF5722]/30 rounded-sm p-5 relative overflow-hidden group shadow-[inset_0_0_20px_rgba(255,87,34,0.05)]"
            >
              {/* HUD Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF5722]/60" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FF5722]/60" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FF5722]/60" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF5722]/60" />

              <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5722]/20 group-hover:bg-[#FF5722] transition-colors shadow-[0_0_10px_rgba(255,87,34,0.5)]" />
              
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs text-[#FF5722] tracking-widest drop-shadow-[0_0_5px_rgba(255,87,34,0.8)]">{task.id}</span>
                <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${task.status === 'completed' ? 'bg-emerald-500 text-emerald-500' : 'bg-[#FF5722] text-[#FF5722] animate-pulse'}`} />
              </div>
              
              <p className="text-lg mb-6 text-zinc-100 drop-shadow-md">{task.text}</p>
              
              <button className="w-full py-2 border border-zinc-600 text-xs tracking-widest uppercase hover:bg-[#FF5722] hover:text-black hover:border-[#FF5722] transition-all duration-300 flex justify-center items-center space-x-2 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,87,34,0.6)]">
                {task.status === 'completed' ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span className="font-bold">Mission Accomplished</span>
                  </>
                ) : (
                  <span className="font-bold">Execute</span>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column: Intel Feed */}
      <div className="flex-1 flex flex-col space-y-6 relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <ShieldAlert className="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" size={32} />
          <h2 className="text-2xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Intel Feed</h2>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto pr-4 custom-scrollbar">
          {INTELS.map((intel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              className="bg-black/50 backdrop-blur-sm border-l-2 border-cyan-500/60 p-4 text-sm text-zinc-300 leading-relaxed shadow-[inset_0_0_15px_rgba(6,182,212,0.05)] relative"
            >
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/30" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30" />
              
              <span className="text-cyan-400/90 text-xs block mb-2 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">{`> LOG_${String(i + 1).padStart(3, '0')}`}</span>
              <span className="drop-shadow-sm">{intel}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
