import { useFrame } from '@react-three/fiber';
import {
  flowers,
  forest,
  grass,
  groupByModel,
  lilies,
  pathStones,
  props,
  reeds,
} from '../world/layout.js';
import { terrainHeight } from '../world/terrain.js';
import { InstancedModel } from './InstancedModel.jsx';
import { windUniforms } from './materials.js';

const TREE_MODELS = ['tree_pineDefaultA', 'tree_pineRoundC', 'tree_pineTallA'];
const forestByModel = TREE_MODELS.map((model, index) => [
  model,
  forest.filter((_, i) => i % TREE_MODELS.length === index).map((tree) => ({ ...tree, s: tree.s * 1.3 })),
]);
const stones = pathStones.map(([x, z, ry]) => ({ x, z, ry, s: 0.55 }));
const grassSplit = [grass.filter((_, i) => i % 2 === 0), grass.filter((_, i) => i % 2 === 1)];
const flowerSplit = [flowers.filter((_, i) => i % 2 === 0), flowers.filter((_, i) => i % 2 === 1)];
const lilyItems = lilies.map((lily) => ({ ...lily, y: -0.3 }));
const reedItems = reeds.map((reed) => ({ ...reed, s: reed.s * 0.95, sx: 0.45, sy: 1.15 }));
const propGroups = groupByModel(props);

function Wind({ reducedMotion }) {
  useFrame((_, delta) => {
    if (!reducedMotion) windUniforms.uTime.value += delta;
  });
  return null;
}

export function Environment({ reducedMotion }) {
  return (
    <>
      <Wind reducedMotion={reducedMotion} />
      {propGroups.map(([model, items]) => (
        <InstancedModel key={model} name={model} items={items} getY={terrainHeight} />
      ))}
      {forestByModel.map(([model, items]) => (
        <InstancedModel key={`forest-${model}`} name={model} items={items} getY={terrainHeight} receiveShadow={false} />
      ))}
      <InstancedModel name="path_stone" items={stones} getY={terrainHeight} castShadow={false} />
      <InstancedModel name="crops_bambooStageB" items={reedItems} getY={terrainHeight} wind={0.16} color="#a19a5c" />
      <InstancedModel name="grass" items={grassSplit[0]} getY={terrainHeight} wind={0.1} castShadow={false} />
      <InstancedModel name="grass_large" items={grassSplit[1]} getY={terrainHeight} wind={0.1} castShadow={false} />
      <InstancedModel name="flower_redA" items={flowerSplit[0]} getY={terrainHeight} wind={0.12} castShadow={false} />
      <InstancedModel name="flower_yellowA" items={flowerSplit[1]} getY={terrainHeight} wind={0.12} castShadow={false} />
      <InstancedModel name="lily_large" items={lilyItems} castShadow={false} />
    </>
  );
}
