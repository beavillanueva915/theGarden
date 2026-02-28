import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Choice } from '../game/gameState';
import ActionButton from './ActionButton';
import { THEME } from '../theme';

interface ActionPanelProps {
  choices: Choice[];
  isTyping: boolean;
  onChoiceSelected: (choiceId: string) => void;
}

export default function ActionPanel({ choices, isTyping, onChoiceSelected }: ActionPanelProps) {
  if (isTyping || choices.length === 0) return null;

  return (
    <View style={styles.panel}>
      {choices.map((choice, i) => (
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
