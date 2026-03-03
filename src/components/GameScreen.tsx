import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';

const nativeDriver = Platform.OS !== 'web';
import { GameState, INITIAL_GAME_STATE } from '../game/gameState';
import { STORY_NODES } from '../game/story';
import {
  applyChoice,
  autoAdvance,
  finishTyping,
  navigateToMapNode,
  returnFromMap,
  resetGame,
} from '../game/engine';
import TextWindow from './TextWindow';
import ActionPanel from './ActionPanel';
import MapPanel from './MapPanel';
import { THEME, useTheme } from '../theme';

type GameAction =
  | { type: 'CHOICE_SELECTED'; choiceId: string }
  | { type: 'TYPING_COMPLETE' }
  | { type: 'AUTO_ADVANCE' }
  | { type: 'MAP_NAVIGATE'; nodeId: string }
  | { type: 'RETURN_FROM_MAP' }
  | { type: 'RESET' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CHOICE_SELECTED':
      return applyChoice(state, action.choiceId);
    case 'TYPING_COMPLETE':
      return finishTyping(state);
    case 'AUTO_ADVANCE':
      return autoAdvance(state);
    case 'MAP_NAVIGATE':
      return navigateToMapNode(state, action.nodeId);
    case 'RETURN_FROM_MAP':
      return returnFromMap(state);
    case 'RESET':
      return resetGame();
    default:
      return state;
  }
}

const SHOW_MENU_PHASES = ['discovery', 'memory', 'realization', 'return'];

export default function GameScreen() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const [showReplay, setShowReplay] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const replayOpacity = React.useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const currentNode = STORY_NODES[state.currentNodeId];

  const handleTypingComplete = useCallback(() => {
    dispatch({ type: 'TYPING_COMPLETE' });
  }, []);

  const handleChoiceSelected = useCallback(
    (choiceId: string) => {
      const node = STORY_NODES[state.currentNodeId];
      const choice = node?.choices.find((c) => c.id === choiceId);
      if (choice?.returnsFromMap) {
        dispatch({ type: 'RETURN_FROM_MAP' });
      } else {
        dispatch({ type: 'CHOICE_SELECTED', choiceId });
      }
    },
    [state.currentNodeId],
  );

  const handleMapNavigate = useCallback((nodeId: string) => {
    dispatch({ type: 'MAP_NAVIGATE', nodeId });
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
        useNativeDriver: nativeDriver,
      }).start();
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.isComplete]);

  const handleReplay = () => {
    setShowReplay(false);
    setShowPanel(false);
    replayOpacity.setValue(0);
    dispatch({ type: 'RESET' });
  };

  const showMenuButton = SHOW_MENU_PHASES.includes(state.phase);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TextWindow
        key={state.currentNodeId}
        historicalLines={state.textLog}
        currentLines={currentNode?.lines ?? []}
        onComplete={handleTypingComplete}
      />

      <ActionPanel
        choices={currentNode?.choices ?? []}
        flags={state.flags}
        isTyping={state.isTyping}
        onChoiceSelected={handleChoiceSelected}
      />

      {showMenuButton && !showPanel && (
        <Pressable
          style={styles.menuButton}
          onPress={() => setShowPanel(true)}
        >
          <Text style={[styles.menuText, { color: colors.textSecondary }]}>···</Text>
        </Pressable>
      )}

      {showPanel && (
        <MapPanel
          flags={state.flags}
          phase={state.phase}
          onNavigate={handleMapNavigate}
          onClose={() => setShowPanel(false)}
        />
      )}

      {showReplay && (
        <Animated.View style={[styles.replayContainer, { opacity: replayOpacity }]}>
          <Pressable onPress={handleReplay}>
            <Text style={[styles.replayText, { color: colors.textSecondary }]}>
              return to the bench
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    right: THEME.spacing.screenPadding,
    padding: 8,
    zIndex: 10,
  },
  menuText: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 18,
    letterSpacing: 3,
  },
  replayContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  replayText: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: THEME.typography.fontSize.choice,
    letterSpacing: 1,
  },
});
