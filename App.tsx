import React from 'react';
import { ThemeProvider } from './src/theme';
import GameScreen from './src/components/GameScreen';

export default function App() {
  return (
    <ThemeProvider>
      <GameScreen />
    </ThemeProvider>
  );
}
