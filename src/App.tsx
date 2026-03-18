import { useState } from 'react';
import Landing from './components/Landing';
import MainInterface from './components/MainInterface';

export type Mode = 'frontline' | 'campfire';

export default function App() {
  const [currentMode, setCurrentMode] = useState<Mode | null>(null);

  if (!currentMode) {
    return <Landing onSelectMode={setCurrentMode} />;
  }

  return <MainInterface initialMode={currentMode} />;
}
