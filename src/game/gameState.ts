export type Phase =
  | 'arrival'
  | 'discovery'
  | 'memory'
  | 'realization'
  | 'connection';

export type FlagKey =
  | 'noticedFlowers'
  | 'heardBirds'
  | 'wateredPlant'
  | 'readFirstLetter'
  | 'readSecondLetter'
  | 'pickedUpPhoto'
  | 'heldStone'
  | 'rememberedMoment'
  | 'choseLove';

export type GameFlags = Record<FlagKey, boolean>;

export const DEFAULT_FLAGS: GameFlags = {
  noticedFlowers: false,
  heardBirds: false,
  wateredPlant: false,
  readFirstLetter: false,
  readSecondLetter: false,
  pickedUpPhoto: false,
  heldStone: false,
  rememberedMoment: false,
  choseLove: false,
};

export interface Choice {
  id: string;
  label: string;
  leadsTo: string;
  setsFlags?: Partial<GameFlags>;
  weight?: 'primary' | 'secondary';
}

export interface StoryNode {
  id: string;
  phase: Phase;
  lines: string[];
  choices: Choice[];
  choiceDelay?: number;
  autoAdvanceTo?: string;
}

export interface GameState {
  currentNodeId: string;
  phase: Phase;
  flags: GameFlags;
  textLog: string[];
  isTyping: boolean;
  isComplete: boolean;
}

export const INITIAL_GAME_STATE: GameState = {
  currentNodeId: 'arrival_01',
  phase: 'arrival',
  flags: DEFAULT_FLAGS,
  textLog: [],
  isTyping: true,
  isComplete: false,
};
