import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { GameState, INITIAL_GAME_STATE } from '@game/gameState';
import { STORY_NODES } from '@game/story';
import {
  applyChoice,
  autoAdvance,
  finishTyping,
  navigateToMapNode,
  returnFromMap,
  resetGame,
} from '@game/engine';
import { ThemeProvider, useTheme } from '@theme';
import TextWindow from './components/TextWindow';
import ActionPanel from './components/ActionPanel';
import MapPanel from './components/MapPanel';

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

function GameScreen() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const [showReplay, setShowReplay] = useState(false);
  const [replayVisible, setReplayVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { colors, themeKey, setThemeKey } = useTheme();

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

  useEffect(() => {
    if (state.isTyping) return;
    if (!currentNode?.autoAdvanceTo) return;
    const delay = currentNode.choiceDelay ?? 800;
    const timer = setTimeout(() => {
      dispatch({ type: 'AUTO_ADVANCE' });
    }, delay);
    return () => clearTimeout(timer);
  }, [state.isTyping, state.currentNodeId]);

  useEffect(() => {
    if (!state.isComplete) return;
    const timer = setTimeout(() => {
      setShowReplay(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setReplayVisible(true));
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.isComplete]);

  const handleReplay = () => {
    setShowReplay(false);
    setReplayVisible(false);
    setShowPanel(false);
    dispatch({ type: 'RESET' });
  };

  const showMenuButton = SHOW_MENU_PHASES.includes(state.phase);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: colors.background,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <TextWindow
        key={state.currentNodeId}
        historicalLines={state.textLog}
        currentLines={currentNode?.lines ?? []}
        onComplete={handleTypingComplete}
        colors={colors}
      />

      <ActionPanel
        choices={currentNode?.choices ?? []}
        flags={state.flags}
        isTyping={state.isTyping}
        onChoiceSelected={handleChoiceSelected}
        colors={colors}
      />

      {showMenuButton && !showPanel && (
        <button
          onClick={() => setShowPanel(true)}
          style={{
            position: 'absolute',
            top: 50,
            right: 24,
            background: 'none',
            border: 'none',
            color: colors.textSecondary,
            fontSize: 18,
            letterSpacing: 3,
            cursor: 'pointer',
            padding: 8,
            fontFamily: 'Georgia, serif',
            zIndex: 10,
          }}
        >
          ···
        </button>
      )}

      {showPanel && (
        <MapPanel
          flags={state.flags}
          phase={state.phase}
          onNavigate={handleMapNavigate}
          onClose={() => setShowPanel(false)}
          colors={colors}
          themeKey={themeKey}
          setThemeKey={setThemeKey}
        />
      )}

      {showReplay && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 40,
          opacity: replayVisible ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}>
          <button
            onClick={handleReplay}
            style={{
              background: 'none',
              border: 'none',
              color: colors.textSecondary,
              fontFamily: 'Georgia, serif',
              fontSize: 16,
              letterSpacing: 1,
              cursor: 'pointer',
            }}
          >
            return to the bench
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GameScreen />
    </ThemeProvider>
  );
}
