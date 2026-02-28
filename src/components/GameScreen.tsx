import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { GameState, INITIAL_GAME_STATE } from '../game/gameState';
import { STORY_NODES } from '../game/story';
import { applyChoice, autoAdvance, finishTyping, resetGame } from '../game/engine';
import TextWindow from './TextWindow';
import ActionPanel from './ActionPanel';
import { THEME } from '../theme';

type GameAction =
  | { type: 'CHOICE_SELECTED'; choiceId: string }
  | { type: 'TYPING_COMPLETE' }
  | { type: 'AUTO_ADVANCE' }
  | { type: 'RESET' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CHOICE_SELECTED':
      return applyChoice(state, action.choiceId);
    case 'TYPING_COMPLETE':
      return finishTyping(state);
    case 'AUTO_ADVANCE':
      return autoAdvance(state);
    case 'RESET':
      return resetGame();
    default:
      return state;
  }
}

export default function GameScreen() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const [showReplay, setShowReplay] = useState(false);
  const replayOpacity = React.useRef(new Animated.Value(0)).current;

  const currentNode = STORY_NODES[state.currentNodeId];

  const handleTypingComplete = useCallback(() => {
    dispatch({ type: 'TYPING_COMPLETE' });
  }, []);

  const handleChoiceSelected = useCallback((choiceId: string) => {
    dispatch({ type: 'CHOICE_SELECTED', choiceId });
  }, []);

  // Schedule auto-advance after typing completes
  useEffect(() => {
    if (state.isTyping) return;
    if (!currentNode?.autoAdvanceTo) return;

    const delay = currentNode.choiceDelay ?? 800;
    const timer = setTimeout(() => {
      dispatch({ type: 'AUTO_ADVANCE' });
    }, delay);
    return () => clearTimeout(timer);
  }, [state.isTyping, state.currentNodeId]);

  // Show replay button 3 seconds after game completes
  useEffect(() => {
    if (!state.isComplete) return;
    const timer = setTimeout(() => {
      setShowReplay(true);
      Animated.timing(replayOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.isComplete]);

  const handleReplay = () => {
    setShowReplay(false);
    replayOpacity.setValue(0);
    dispatch({ type: 'RESET' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextWindow
        key={state.currentNodeId}
        historicalLines={state.textLog}
        currentLines={currentNode?.lines ?? []}
        onComplete={handleTypingComplete}
      />

      <ActionPanel
        choices={currentNode?.choices ?? []}
        isTyping={state.isTyping}
        onChoiceSelected={handleChoiceSelected}
      />

      {showReplay && (
        <Animated.View style={[styles.replayContainer, { opacity: replayOpacity }]}>
          <Pressable onPress={handleReplay}>
            <Text style={styles.replayText}>again?</Text>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  replayContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  replayText: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: THEME.typography.fontSize.choice,
    color: THEME.colors.textSecondary,
    letterSpacing: 1,
  },
});
