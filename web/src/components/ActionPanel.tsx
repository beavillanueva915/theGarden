import React, { useEffect, useState } from 'react';
import { Choice, GameFlags, FlagKey } from '@game/gameState';
import { AppColors } from '@theme';

interface Props {
  choices: Choice[];
  flags: GameFlags;
  isTyping: boolean;
  onChoiceSelected: (id: string) => void;
  colors: AppColors;
}

function isVisible(choice: Choice, flags: GameFlags): boolean {
  if (choice.hideIfFlags) {
    if (Object.entries(choice.hideIfFlags).some(([k, v]) => flags[k as FlagKey] === v)) return false;
  }
  if (choice.requiresFlags) {
    if (!Object.entries(choice.requiresFlags).every(([k, v]) => flags[k as FlagKey] === v)) return false;
  }
  return true;
}

function ActionButton({ choice, index, onPress, colors }: {
  choice: Choice;
  index: number;
  onPress: (id: string) => void;
  colors: AppColors;
}) {
  const [opacity, setOpacity] = useState(0);
  const isPrimary = choice.weight !== 'secondary';

  useEffect(() => {
    const t = setTimeout(() => setOpacity(1), index * 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <button
      onClick={() => onPress(choice.id)}
      style={{
        opacity,
        transition: 'opacity 0.6s ease',
        display: 'block',
        width: '100%',
        padding: '14px 20px',
        marginBottom: 10,
        background: 'transparent',
        border: `1px solid ${isPrimary ? colors.accent : colors.choiceBorder}`,
        borderRadius: 4,
        color: isPrimary ? colors.accent : colors.textSecondary,
        fontFamily: 'Georgia, serif',
        fontSize: 16,
        textAlign: 'left',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {choice.label}
    </button>
  );
}

export default function ActionPanel({ choices, flags, isTyping, onChoiceSelected, colors }: Props) {
  const visible = choices.filter(c => isVisible(c, flags));
  if (isTyping || visible.length === 0) return null;

  return (
    <div style={{ padding: '24px 24px 32px' }}>
      {visible.map((choice, i) => (
        <ActionButton key={choice.id} choice={choice} index={i} onPress={onChoiceSelected} colors={colors} />
      ))}
    </div>
  );
}
