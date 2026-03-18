import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Landing from './components/Landing';
import MainInterface from './components/MainInterface';

export type Mode = 'frontline' | 'campfire';

export default function App() {
  const [currentMode, setCurrentMode] = useState<Mode | null>(null);

  return (
    <AnimatePresence mode="wait">
      {!currentMode ? (
        <motion.div
          key="landing"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="h-screen w-full absolute inset-0 z-50"
        >
          <Landing onSelectMode={setCurrentMode} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-screen w-full absolute inset-0 z-0"
        >
          <MainInterface initialMode={currentMode} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
