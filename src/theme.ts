import React, { createContext, useContext, useState } from 'react';

export type ThemeKey = 'evening-blue' | 'clean-dark' | 'soft-slate';

export type SpeedKey = 'slow' | 'normal' | 'fast';
export const SPEEDS: Record<SpeedKey, { charDelay: number; pauseDelay: number }> = {
  slow:   { charDelay: 60,  pauseDelay: 600 },
  normal: { charDelay: 35,  pauseDelay: 420 },
  fast:   { charDelay: 15,  pauseDelay: 250 },
};

type ColorScheme = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentDim: string;
  choiceBorder: string;
  historical: string;
};

const COLORS: Record<ThemeKey, ColorScheme> = {
  'evening-blue': {
    background: '#131820',
    surface: '#1A2130',
    textPrimary: '#E4EAF0',
    textSecondary: '#8899AA',
    accent: '#6688AA',
    accentDim: '#334466',
    choiceBorder: '#2A3A50',
    historical: '#445566',
  },
  'clean-dark': {
    background: '#141414',
    surface: '#1E1E1E',
    textPrimary: '#EBEBEB',
    textSecondary: '#888888',
    accent: '#888888',
    accentDim: '#444444',
    choiceBorder: '#2A2A2A',
    historical: '#555555',
  },
  'soft-slate': {
    background: '#181A1B',
    surface: '#202325',
    textPrimary: '#E8E4DC',
    textSecondary: '#8A8680',
    accent: '#7A9080',
    accentDim: '#3D4840',
    choiceBorder: '#2E3332',
    historical: '#5A6560',
  },
};

export const THEME = {
  typography: {
    fontFamily: 'Georgia',
    fontSize: {
      narrative: 18,
      choice: 16,
    },
    lineHeight: {
      narrative: 28,
    },
  },

  spacing: {
    screenPadding: 24,
    paragraphGap: 8,
    choiceGap: 10,
    choiceVerticalPad: 14,
    choiceHorizontalPad: 20,
    actionPanelTop: 24,
    actionPanelBottom: 32,
  },

  animation: {
    typewriterSpeedMs: 35,
    paragraphPauseMs: 420,
    buttonFadeInMs: 600,
    buttonStaggerMs: 150,
  },
} as const;

export type AppColors = ColorScheme;

type ThemeContextValue = {
  colors: ColorScheme;
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
  speedKey: SpeedKey;
  setSpeedKey: (k: SpeedKey) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  colors: COLORS['evening-blue'],
  themeKey: 'evening-blue',
  setThemeKey: () => {},
  speedKey: 'normal',
  setSpeedKey: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKey] = useState<ThemeKey>('evening-blue');
  const [speedKey, setSpeedKey] = useState<SpeedKey>('normal');
  return React.createElement(
    ThemeContext.Provider,
    { value: { colors: COLORS[themeKey], themeKey, setThemeKey, speedKey, setSpeedKey } },
    children,
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
