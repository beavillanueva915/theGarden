import { GameState, INITIAL_GAME_STATE } from './gameState';
import { STORY_NODES } from './story';

export function applyChoice(state: GameState, choiceId: string): GameState {
  const currentNode = STORY_NODES[state.currentNodeId];
  if (!currentNode) return state;

  const choice = currentNode.choices.find((c) => c.id === choiceId);
  if (!choice) return state;

  const nextNode = STORY_NODES[choice.leadsTo];
  if (!nextNode) return state;

  return {
    ...state,
    currentNodeId: nextNode.id,
    phase: nextNode.phase,
    flags: { ...state.flags, ...(choice.setsFlags ?? {}) },
    textLog: [...state.textLog, ...currentNode.lines],
    isTyping: true,
    isComplete: false,
  };
}

export function autoAdvance(state: GameState): GameState {
  const currentNode = STORY_NODES[state.currentNodeId];
  if (!currentNode?.autoAdvanceTo) return state;

  const nextNode = STORY_NODES[currentNode.autoAdvanceTo];
  if (!nextNode) return state;

  return {
    ...state,
    currentNodeId: nextNode.id,
    phase: nextNode.phase,
    textLog: [...state.textLog, ...currentNode.lines],
    isTyping: true,
    isComplete: false,
  };
}

export function finishTyping(state: GameState): GameState {
  const currentNode = STORY_NODES[state.currentNodeId];
  const isComplete =
    currentNode !== undefined &&
    currentNode.choices.length === 0 &&
    !currentNode.autoAdvanceTo;

  return {
    ...state,
    isTyping: false,
    isComplete,
  };
}

export function resetGame(): GameState {
  return { ...INITIAL_GAME_STATE };
}
