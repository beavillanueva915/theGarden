import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Choice, GameFlags, FlagKey } from '../game/gameState';
import ActionButton from './ActionButton';
import { THEME } from '../theme';

interface ActionPanelProps {
  choices: Choice[];
  flags: GameFlags;
  isTyping: boolean;
  onChoiceSelected: (choiceId: string) => void;
}

function isChoiceVisible(choice: Choice, flags: GameFlags): boolean {
  if (choice.hideIfFlags) {
    const hidden = Object.entries(choice.hideIfFlags).some(
      ([key, val]) => flags[key as FlagKey] === val,
    );
    if (hidden) return false;
  }
  if (choice.requiresFlags) {
    const satisfied = Object.entries(choice.requiresFlags).every(
      ([key, val]) => flags[key as FlagKey] === val,
    );
    if (!satisfied) return false;
  }
  return true;
}

export default function ActionPanel({ choices, flags, isTyping, onChoiceSelected }: ActionPanelProps) {
  const visible = choices.filter((c) => isChoiceVisible(c, flags));
  if (isTyping || visible.length === 0) return null;

  return (
    <View style={styles.panel}>
      {visible.map((choice, i) => (
        <ActionButton
          key={choice.id}
          choice={choice}
          index={i}
          onPress={onChoiceSelected}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingHorizontal: THEME.spacing.screenPadding,
    paddingTop: THEME.spacing.actionPanelTop,
    paddingBottom: THEME.spacing.actionPanelBottom,
  },
});
