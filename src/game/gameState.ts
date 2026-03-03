export type Phase =
  | 'arrival'
  | 'discovery'
  | 'memory'
  | 'realization'
  | 'return';

export type FlagKey =
  | 'noticedFlowers'
  | 'heardBirds'
  | 'wateredPlant'
  | 'readFirstLetter'
  | 'readSecondLetter'
  | 'pickedUpPhoto'
  | 'heldStone'
  | 'rememberedMoment'
  | 'choseLove'
  | 'satOnBench'
  | 'followedPath'
  | 'noticedSundial';

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
  satOnBench: false,
  followedPath: false,
  noticedSundial: false,
};

export interface Choice {
  id: string;
  label: string;
  leadsTo: string | ((flags: GameFlags) => string);
  setsFlags?: Partial<GameFlags>;
  weight?: 'primary' | 'secondary';
  requiresFlags?: Partial<GameFlags>;
  hideIfFlags?: Partial<GameFlags>;
  returnsFromMap?: boolean;
}

export interface StoryNode {
  id: string;
  phase: Phase;
  lines: string[];
  choices: Choice[];
  choiceDelay?: number;
  autoAdvanceTo?: string | ((flags: GameFlags) => string);
}

export interface GameState {
  currentNodeId: string;
  phase: Phase;
  flags: GameFlags;
  textLog: string[];
  isTyping: boolean;
  isComplete: boolean;
  returnToNodeId: string | null;
}

export const INITIAL_GAME_STATE: GameState = {
  currentNodeId: 'arrival_01',
  phase: 'arrival',
  flags: DEFAULT_FLAGS,
  textLog: [],
  isTyping: true,
  isComplete: false,
  returnToNodeId: null,
};
