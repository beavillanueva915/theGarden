import { StoryNode } from './gameState';

export const STORY_NODES: Record<string, StoryNode> = {

  // ================================================
  // PHASE 1: ARRIVAL
  // Player wakes in an unfamiliar garden.
  // No stakes. Just atmosphere.
  // ================================================

  arrival_01: {
    id: 'arrival_01',
    phase: 'arrival',
    lines: [
      'you open your eyes.',
      '',
      'light. soft, warm, the color of late afternoon.',
      '',
      'you are sitting in a garden.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'look_around', label: 'look around', leadsTo: 'arrival_02', weight: 'primary' },
    ],
  },

  arrival_02: {
    id: 'arrival_02',
    phase: 'arrival',
    lines: [
      'the garden is small.',
      'stone paths. overgrown hedges. a bench weathered soft by years.',
      '',
      'everything here has been tended to by someone who loved it.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'breathe', label: 'breathe in', leadsTo: 'arrival_03', weight: 'primary' },
      { id: 'listen', label: 'listen', leadsTo: 'arrival_03b', weight: 'secondary', setsFlags: { heardBirds: true } },
    ],
  },

  arrival_03: {
    id: 'arrival_03',
    phase: 'arrival',
    lines: [
      'the air smells like earth and something sweet.',
      'lavender, maybe. or rosemary.',
      '',
      'you cannot remember how you got here.',
      'but you are not afraid.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'stand', label: 'stand up', leadsTo: 'discovery_01', weight: 'primary' },
    ],
  },

  arrival_03b: {
    id: 'arrival_03b',
    phase: 'arrival',
    lines: [
      'birds, somewhere in the hedge.',
      'not singing — just talking to each other.',
      '',
      'you sit with this for a moment.',
      '',
      'you cannot remember how you got here.',
      'but you are not afraid.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'stand_b', label: 'stand up', leadsTo: 'discovery_01', weight: 'primary' },
    ],
  },

  // ================================================
  // PHASE 2: DISCOVERY
  // Player explores. Small details emerge.
  // Theme: noticing the world. Being present.
  // ================================================

  discovery_01: {
    id: 'discovery_01',
    phase: 'discovery',
    lines: [
      'you walk along the stone path.',
      '',
      'to your left: a cluster of wildflowers, purple and yellow.',
      'to your right: a small greenhouse, its glass fogged.',
    ],
    choiceDelay: 800,
    choices: [
      { id: 'flowers', label: 'look at the flowers', leadsTo: 'discovery_flowers', weight: 'primary', setsFlags: { noticedFlowers: true } },
      { id: 'greenhouse', label: 'go to the greenhouse', leadsTo: 'discovery_greenhouse', weight: 'secondary' },
    ],
  },

  discovery_flowers: {
    id: 'discovery_flowers',
    phase: 'discovery',
    lines: [
      'you crouch down.',
      '',
      'they are ordinary wildflowers.',
      'the kind that grow where nobody planned.',
      '',
      'you notice a bee moving between them.',
      'it does not notice you.',
      '',
      'you watch it for longer than you expected to.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'greenhouse_after_flowers', label: 'go to the greenhouse', leadsTo: 'discovery_greenhouse', weight: 'primary' },
    ],
  },

  discovery_greenhouse: {
    id: 'discovery_greenhouse',
    phase: 'discovery',
    lines: [
      'the door is unlocked.',
      '',
      'inside: warmth. the smell of damp soil.',
      'rows of small plants in terracotta pots.',
      '',
      'some are thriving. some have been neglected.',
      '',
      'on a shelf, one pot sits separate from the others.',
      'its soil is dry. it is leaning toward the light.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'water', label: 'water it', leadsTo: 'discovery_water', weight: 'primary', setsFlags: { wateredPlant: true } },
      { id: 'read_tag', label: 'read the tag', leadsTo: 'discovery_tag', weight: 'secondary' },
    ],
  },

  discovery_water: {
    id: 'discovery_water',
    phase: 'discovery',
    lines: [
      'you find a small watering can.',
      '',
      'you water it.',
      '',
      'the soil darkens.',
      'the plant does not change — not yet.',
      'but it will.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'read_tag_after_water', label: 'read the tag', leadsTo: 'discovery_tag', weight: 'primary' },
    ],
  },

  discovery_tag: {
    id: 'discovery_tag',
    phase: 'discovery',
    lines: [
      'the tag is handwritten.',
      '',
      '"planted: march 3rd. yours."',
      '',
      'you recognize the handwriting.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'look_bench', label: 'look around more', leadsTo: 'discovery_bench', weight: 'primary' },
    ],
  },

  discovery_bench: {
    id: 'discovery_bench',
    phase: 'discovery',
    lines: [
      'near the back of the greenhouse, a wooden bench.',
      '',
      'on it: a cardboard box.',
      'simple. unsealed.',
      '',
      'your name is written on the side.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'open_box', label: 'open the box', leadsTo: 'memory_01', weight: 'primary' },
    ],
  },

  // ================================================
  // PHASE 3: MEMORY
  // A box with objects from a relationship.
  // Theme: the specific details of love.
  // ================================================

  memory_01: {
    id: 'memory_01',
    phase: 'memory',
    lines: [
      'inside the box:',
      '',
      'a photograph.',
      'two letters.',
      'a small, smooth stone.',
      '',
      'you know all of these things.',
    ],
    choiceDelay: 800,
    choices: [
      { id: 'photo', label: 'look at the photograph', leadsTo: 'memory_photo', weight: 'primary', setsFlags: { pickedUpPhoto: true } },
      { id: 'letters', label: 'read a letter', leadsTo: 'memory_letter_01', weight: 'secondary', setsFlags: { readFirstLetter: true } },
      { id: 'stone', label: 'hold the stone', leadsTo: 'memory_stone', weight: 'secondary', setsFlags: { heldStone: true } },
    ],
  },

  memory_photo: {
    id: 'memory_photo',
    phase: 'memory',
    lines: [
      'you and someone.',
      '',
      'neither of you are looking at the camera.',
      'you are laughing at something.',
      'they are looking at you.',
      '',
      'you cannot remember who took this picture.',
      'you can remember exactly how that day felt.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'read_letter_after_photo', label: 'read a letter', leadsTo: 'memory_letter_01', weight: 'primary', setsFlags: { readFirstLetter: true } },
    ],
  },

  memory_stone: {
    id: 'memory_stone',
    phase: 'memory',
    lines: [
      'it fits perfectly in your palm.',
      '',
      'you found this on a beach.',
      'you gave it to them.',
      'they gave it back.',
      '"so you remember," they said.',
      '',
      'you still do.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'read_letter_after_stone', label: 'read a letter', leadsTo: 'memory_letter_01', weight: 'primary', setsFlags: { readFirstLetter: true } },
    ],
  },

  memory_letter_01: {
    id: 'memory_letter_01',
    phase: 'memory',
    lines: [
      'the letter is short.',
      '',
      '"i keep meaning to tell you something.',
      'then the day happens and i forget.',
      'then the week happens.',
      '',
      'i am not sure what i am waiting for."',
      '',
      'the letter is unfinished.',
      'unsigned.',
    ],
    choiceDelay: 1500,
    choices: [
      { id: 'second_letter', label: 'read the second letter', leadsTo: 'memory_letter_02', weight: 'primary', setsFlags: { readSecondLetter: true } },
    ],
  },

  memory_letter_02: {
    id: 'memory_letter_02',
    phase: 'memory',
    lines: [
      'this one is older.',
      '',
      '"thank you for being there.',
      'you probably do not know how much it mattered.',
      'i should have said it then.',
      '',
      'maybe i will say it next time."',
      '',
      'there is no envelope.',
      'this letter was never sent.',
    ],
    choiceDelay: 1500,
    choices: [
      { id: 'sit_with_it', label: 'sit with this', leadsTo: 'realization_01', weight: 'primary' },
    ],
  },

  // ================================================
  // PHASE 4: REALIZATION
  // The player understands what this place is.
  // Auto-advancing — no choices, just witnessing.
  // Theme: the right moment is now.
  // ================================================

  realization_01: {
    id: 'realization_01',
    phase: 'realization',
    lines: [
      'you sit on the bench.',
      '',
      'the light has not changed since you arrived.',
      'it is still warm. still that color.',
      '',
      'you think about time.',
      'how much of it you spend waiting for the right moment.',
    ],
    choiceDelay: 1200,
    choices: [],
    autoAdvanceTo: 'realization_02',
  },

  realization_02: {
    id: 'realization_02',
    phase: 'realization',
    lines: [
      'the bee from the garden comes inside somehow.',
      'it lands on the plant you watered.',
      '',
      'it does not stay long.',
    ],
    choiceDelay: 700,
    choices: [],
    autoAdvanceTo: 'realization_03',
  },

  realization_03: {
    id: 'realization_03',
    phase: 'realization',
    lines: [
      'you look at the photograph again.',
      '',
      'they were looking at you.',
      'you did not notice, in that moment.',
      'you were too busy laughing.',
      '',
      'that is okay.',
      'that is what the moment was for.',
    ],
    choiceDelay: 1500,
    choices: [
      { id: 'understand', label: 'you understand now', leadsTo: 'realization_04', weight: 'primary' },
    ],
  },

  realization_04: {
    id: 'realization_04',
    phase: 'realization',
    lines: [
      'this garden is not real.',
      '',
      'or rather: it is real the way all important places are real.',
      'a space between.',
      '',
      'you came here because you needed to remember something.',
      '',
      'you remember it now.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'go_back', label: 'go back', leadsTo: 'connection_01', weight: 'primary' },
    ],
  },

  // ================================================
  // PHASE 5: CONNECTION
  // Player is given the choice to reach out.
  // The final action is saying "I love you."
  // Warm, earned, not saccharine.
  // ================================================

  connection_01: {
    id: 'connection_01',
    phase: 'connection',
    lines: [
      'you are back.',
      '',
      'wherever back is.',
      '',
      'your phone is in your pocket.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'pick_up_phone', label: 'pick it up', leadsTo: 'connection_02', weight: 'primary' },
    ],
  },

  connection_02: {
    id: 'connection_02',
    phase: 'connection',
    lines: [
      'there is someone you have been meaning to talk to.',
      '',
      'not for any reason.',
      'just — you think about them sometimes.',
      'you wonder if they know.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'message', label: 'send them a message', leadsTo: 'connection_03', weight: 'primary', setsFlags: { choseLove: true } },
      { id: 'wait', label: 'maybe later', leadsTo: 'connection_02b', weight: 'secondary' },
    ],
  },

  connection_02b: {
    id: 'connection_02b',
    phase: 'connection',
    lines: [
      'later.',
      '',
      'you think about the letters.',
      '"i am not sure what i am waiting for."',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'message_b', label: 'send the message', leadsTo: 'connection_03', weight: 'primary', setsFlags: { choseLove: true } },
    ],
  },

  connection_03: {
    id: 'connection_03',
    phase: 'connection',
    lines: [
      'you do not overthink it.',
      '',
      'you just say:',
      '',
      '"hey. i was thinking about you.',
      'just wanted you to know i love you."',
      '',
      'you press send.',
    ],
    choiceDelay: 2000,
    choices: [],
    autoAdvanceTo: 'connection_04',
  },

  connection_04: {
    id: 'connection_04',
    phase: 'connection',
    lines: [
      'they will read it.',
      '',
      'maybe they will read it on a hard day,',
      'and it will be exactly what they needed.',
      '',
      'maybe they will smile and put their phone down',
      'and not reply for hours.',
      '',
      'that is okay.',
      'it was not about the reply.',
    ],
    choiceDelay: 2000,
    choices: [],
    autoAdvanceTo: 'connection_05',
  },

  connection_05: {
    id: 'connection_05',
    phase: 'connection',
    lines: [
      'somewhere, in a small greenhouse,',
      'a plant is leaning toward the light.',
      '',
      'it will be fine.',
      '',
      'you will be fine.',
      '',
      '',
      '— end —',
    ],
    choiceDelay: 0,
    choices: [],
  },
};
