import { StoryNode } from './gameState';

export const STORY_NODES: Record<string, StoryNode> = {

  // ================================================
  // PHASE 1: ARRIVAL
  // Player wakes in an unfamiliar garden, holding tea.
  // The light is amber — a sun on its way out.
  // ================================================

  arrival_01: {
    id: 'arrival_01',
    phase: 'arrival',
    lines: [
      'you open your eyes.',
      '',
      'your hands are warm.',
      'you are holding a cup of tea.',
      '',
      'the light is low. amber.',
      'the color of a sun on its way out.',
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
      'stone paths. soft hedges. a bench weathered warm by years.',
      '',
      'everything here has been tended to.',
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
      "but it's peaceful.",
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'rest', label: 'rest', leadsTo: 'arrival_rest', weight: 'secondary', setsFlags: { satOnBench: true } },
      { id: 'explore', label: 'explore', leadsTo: 'arrival_explore', weight: 'primary' },
    ],
  },

  arrival_03b: {
    id: 'arrival_03b',
    phase: 'arrival',
    lines: [
      'birds, somewhere in the hedge.',
      'chirping softly, like a melody.',
      '',
      'you sit with this for a moment.',
      '',
      'you cannot remember how you got here.',
      "but it's peaceful.",
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'rest_b', label: 'rest', leadsTo: 'arrival_rest', weight: 'secondary', setsFlags: { satOnBench: true } },
      { id: 'explore_b', label: 'explore', leadsTo: 'arrival_explore', weight: 'primary' },
    ],
  },

  arrival_rest: {
    id: 'arrival_rest',
    phase: 'arrival',
    lines: [
      'you bring the cup to your lips.',
      'the tea is still warm.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'explore_after_rest', label: 'explore', leadsTo: 'arrival_explore', weight: 'primary' },
    ],
  },

  arrival_explore: {
    id: 'arrival_explore',
    phase: 'arrival',
    lines: [
      'you set the cup on the bench.',
      'you stand.',
    ],
    choiceDelay: 800,
    choices: [
      { id: 'walk', label: 'walk', leadsTo: 'discovery_01', weight: 'primary' },
    ],
  },

  // ================================================
  // PHASE 2: DISCOVERY
  // A hub. Four directions. The player explores.
  // The greenhouse is the way forward.
  // ================================================

  discovery_01: {
    id: 'discovery_01',
    phase: 'discovery',
    lines: [
      'you walk along the stone path.',
      '',
      'a stone sundial stands near the center of the garden.',
      'to your left: a cluster of wildflowers, purple and yellow.',
      'to your right: a small greenhouse, its glass fogged with warmth.',
      'further along: the path curves toward a low stone wall.',
    ],
    choiceDelay: 800,
    choices: [
      {
        id: 'sundial',
        label: 'look at the sundial',
        leadsTo: 'discovery_sundial',
        weight: 'secondary',
        setsFlags: { noticedSundial: true },
        hideIfFlags: { noticedSundial: true },
      },
      {
        id: 'flowers',
        label: 'look at the flowers',
        leadsTo: 'discovery_flowers',
        weight: 'secondary',
        setsFlags: { noticedFlowers: true },
        hideIfFlags: { noticedFlowers: true },
      },
      {
        id: 'path',
        label: 'follow the path',
        leadsTo: 'discovery_path',
        weight: 'secondary',
        setsFlags: { followedPath: true },
        hideIfFlags: { followedPath: true },
      },
      {
        id: 'greenhouse',
        label: 'go to the greenhouse',
        leadsTo: 'discovery_greenhouse',
        weight: 'primary',
      },
    ],
  },

  discovery_sundial: {
    id: 'discovery_sundial',
    phase: 'discovery',
    lines: [
      'a stone sundial stands in a small clearing.',
      '',
      'the shadow falls just past the hour.',
      'you are not sure which one.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'back_from_sundial', label: 'head back', leadsTo: 'discovery_01', weight: 'secondary' },
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
      { id: 'back_from_flowers', label: 'head back', leadsTo: 'discovery_01', weight: 'secondary' },
    ],
  },

  discovery_path: {
    id: 'discovery_path',
    phase: 'discovery',
    lines: [
      'the path curves toward a low stone wall.',
      '',
      'beyond it: more garden.',
      'or the suggestion of more garden.',
      'it is hard to tell where it ends.',
      '',
      'you decide not to find out.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'back_from_path', label: 'head back', leadsTo: 'discovery_01', weight: 'secondary' },
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
  // The details carry the story. Nothing is explained.
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
      'you and someone vaguely familiar.',
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
      'it is small. smooth. the color of sea glass in shade.',
      'a faint line runs through the middle.',
      '',
      'you found this on a beach.',
      '',
      'you remember giving it to someone.',
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
      '"do you remember the day you found the grey stone?',
      'you found it along the beach.',
      '',
      'i\'m excited to go back."',
      '',
      'the paper is soft with age.',
      'you set it carefully back in the box.',
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
      '"do you remember the garden in march?',
      '',
      'you planted something.',
      'said it was for me.',
      '',
      'i still have not figured out what kind of flower it will be.',
      'i am looking forward to finding out."',
      '',
      'you fold it gently and set it back.',
    ],
    choiceDelay: 1500,
    choices: [
      { id: 'sit_with_it', label: 'sit with this', leadsTo: 'realization_01', weight: 'primary' },
    ],
  },

  // ================================================
  // PHASE 4: REALIZATION
  // Something is coming back. Slowly.
  // Auto-advancing — witnessing.
  // ================================================

  realization_01: {
    id: 'realization_01',
    phase: 'realization',
    lines: [
      'you sit on the bench.',
      '',
      'the light is lower now than when you arrived.',
      'still warm. but changing.',
      '',
      'something is coming back to you.',
      'slowly.',
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
      'it lands on the plant.',
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
      'the photograph is still in your hand.',
      '',
      'they were looking at you.',
      '',
      'you sit for a while longer.',
      '',
      'somewhere, the path is still there.',
    ],
    choiceDelay: 1200,
    choices: [],
    autoAdvanceTo: 'garden_return',
  },

  // ================================================
  // GARDEN RETURN
  // The sun is nearly gone. Two choices.
  // ================================================

  garden_return: {
    id: 'garden_return',
    phase: 'realization',
    lines: [
      'the garden is quiet.',
      '',
      'the cup is on the bench where you left it.',
      'the sun has nearly finished.',
    ],
    choiceDelay: 1500,
    choices: [
      {
        id: 'go_back_to_path',
        label: 'go back to the path',
        leadsTo: 'ocean_01',
        weight: 'primary',
        requiresFlags: { followedPath: true },
      },
      {
        id: 'return_to_bench',
        label: 'return to the bench',
        leadsTo: 'bench_final',
        weight: 'secondary',
      },
    ],
  },

  // ================================================
  // PHASE 5: RETURN — THE OCEAN ENDING
  // The true ending. Finding someone waiting.
  // ================================================

  ocean_01: {
    id: 'ocean_01',
    phase: 'return',
    lines: [
      'the path looks the same.',
      '',
      'but this time you notice something.',
      '',
      'a crack in the stone wall.',
      'narrow. just wide enough.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'go_through', label: 'go through', leadsTo: 'ocean_02', weight: 'primary' },
    ],
  },

  ocean_02: {
    id: 'ocean_02',
    phase: 'return',
    lines: [
      'the air changes.',
      '',
      'salt. wind.',
      '',
      'you are standing near the edge of a cliff.',
      '',
      'below: the ocean.',
      'quiet. flat. the color of the sky just after the sun has gone.',
    ],
    choiceDelay: 1500,
    choices: [],
    autoAdvanceTo: 'ocean_03',
  },

  ocean_03: {
    id: 'ocean_03',
    phase: 'return',
    lines: [
      'there is someone sitting in a chair by an old tree.',
      '',
      'facing the water.',
      'a familiar shape.',
      '',
      'you have been here before, you think.',
      'or somewhere very much like here.',
    ],
    choiceDelay: 1200,
    choices: [],
    autoAdvanceTo: 'ocean_04',
  },

  ocean_04: {
    id: 'ocean_04',
    phase: 'return',
    lines: [
      'you walk toward them.',
      '',
      'the grass is soft underfoot.',
      'the sun is almost gone.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'say_hello', label: 'say hello', leadsTo: 'ocean_05', weight: 'primary' },
    ],
  },

  ocean_05: {
    id: 'ocean_05',
    phase: 'return',
    lines: [
      'they turn.',
      '',
      '"there you are, love."',
      '',
      'they say it like they have been waiting.',
      'not impatiently.',
      '',
      'just',
      'waiting.',
    ],
    choiceDelay: 2000,
    choices: [],
    autoAdvanceTo: 'ocean_06',
  },

  ocean_06: {
    id: 'ocean_06',
    phase: 'return',
    lines: [
      'you sit beside them.',
      '',
      'and remember.',
      '',
      '',
      '— end —',
    ],
    choiceDelay: 0,
    choices: [],
  },

  // ================================================
  // ALTERNATIVE ENDING — THE BENCH
  // ================================================

  bench_final: {
    id: 'bench_final',
    phase: 'return',
    lines: [
      '',
      '— end —',
    ],
    choiceDelay: 0,
    choices: [],
  },

  // ================================================
  // REVISIT NODES (accessed via map during memory+)
  // ================================================

  revisit_sundial: {
    id: 'revisit_sundial',
    phase: 'discovery',
    lines: [
      "the sundial hasn't moved.",
      '',
      'the shadow is longer now.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'back_from_revisit_sundial', label: 'go back', leadsTo: '', weight: 'secondary', returnsFromMap: true },
    ],
  },

  revisit_path: {
    id: 'revisit_path',
    phase: 'discovery',
    lines: [
      'the path curves toward the wall.',
      '',
      "you notice a crack you didn't see before.",
      'narrow. just wide enough.',
    ],
    choiceDelay: 1200,
    choices: [
      { id: 'go_through_crack', label: 'go through', leadsTo: 'ocean_01', weight: 'primary', setsFlags: { followedPath: true } },
      { id: 'leave_it', label: 'leave it', leadsTo: '', weight: 'secondary', returnsFromMap: true },
    ],
  },

  revisit_flowers: {
    id: 'revisit_flowers',
    phase: 'discovery',
    lines: [
      'the bee is gone.',
      '',
      'the flowers have not noticed.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'back_from_revisit_flowers', label: 'go back', leadsTo: '', weight: 'secondary', returnsFromMap: true },
    ],
  },

  revisit_greenhouse: {
    id: 'revisit_greenhouse',
    phase: 'discovery',
    lines: [
      'the watering can is where you left it.',
      '',
      'the plant has shifted slightly toward the window.',
      'or you imagined it.',
    ],
    choiceDelay: 1000,
    choices: [
      { id: 'back_from_revisit_greenhouse', label: 'go back', leadsTo: '', weight: 'secondary', returnsFromMap: true },
    ],
  },
};
