import { GameState, INITIAL_GAME_STATE } from './gameState';
import { STORY_NODES } from './story';

export function applyChoice(state: GameState, choiceId: string): GameState {
  const currentNode = STORY_NODES[state.currentNodeId];
  if (!currentNode) return state;

  const choice = currentNode.choices.find((c) => c.id === choiceId);
  if (!choice) return state;

  const nextNodeId =
    typeof choice.leadsTo === 'function' ? choice.leadsTo(state.flags) : choice.leadsTo;

  const nextNode = STORY_NODES[nextNodeId];
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

  const raw = currentNode.autoAdvanceTo;
  const nextNodeId = typeof raw === 'function' ? raw(state.flags) : raw;

  const nextNode = STORY_NODES[nextNodeId];
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

export function navigateToMapNode(state: GameState, nodeId: string): GameState {
  const nextNode = STORY_NODES[nodeId];
  if (!nextNode) return state;

  return {
    ...state,
    returnToNodeId: state.currentNodeId,
    currentNodeId: nodeId,
    isTyping: true,
    isComplete: false,
  };
}

export function returnFromMap(state: GameState): GameState {
  if (!state.returnToNodeId) return state;
  const returnNode = STORY_NODES[state.returnToNodeId];
  if (!returnNode) return state;

  return {
    ...state,
    currentNodeId: state.returnToNodeId,
    returnToNodeId: null,
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
