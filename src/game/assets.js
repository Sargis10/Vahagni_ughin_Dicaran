import { useGLTF } from '@react-three/drei';

const BASE = import.meta.env.BASE_URL;

export const natureUrl = (name) => `${BASE}models/nature/${name}.glb`;
export const characterUrl = (name) => `${BASE}models/characters/${name}.glb`;

export const CHARACTERS = {
  player: 'character-female-f',
  storyteller: 'character-male-b',
};

export const NATURE_MODELS = [
  'campfire_stones',
  'cliff_block_rock',
  'cliff_large_rock',
  'crops_bambooStageB',
  'flower_redA',
  'flower_yellowA',
  'grass',
  'grass_large',
  'lily_large',
  'lily_small',
  'log',
  'log_large',
  'mushroom_tanGroup',
  'path_stone',
  'pot_large',
  'rock_largeB',
  'rock_largeC',
  'rock_largeD',
  'rock_smallA',
  'rock_smallFlatA',
  'rock_tallA',
  'rock_tallB',
  'rock_tallC',
  'statue_block',
  'statue_column',
  'statue_columnDamaged',
  'stone_largeA',
  'stone_tallB',
  'stump_old',
  'tent_detailedOpen',
  'tree_pineDefaultA',
  'tree_pineRoundC',
  'tree_pineTallA',
];

export function preloadGameAssets() {
  for (const name of NATURE_MODELS) useGLTF.preload(natureUrl(name));
  for (const name of Object.values(CHARACTERS)) useGLTF.preload(characterUrl(name));
}
