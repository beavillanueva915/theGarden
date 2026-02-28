export const THEME = {
  colors: {
    background: '#1C1712',
    surface: '#252118',
    textPrimary: '#E8DFC8',
    textSecondary: '#A09070',
    accent: '#C8943C',
    accentDim: '#7A5A22',
    choiceBorder: '#3D3020',
    historical: '#6B5F4A',
  },

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
