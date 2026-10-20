import { Suspense } from 'react';
import { FollowCamera } from '../camera/FollowCamera.jsx';
import { Player } from '../characters/Player.jsx';
import { Storyteller } from '../characters/Storyteller.jsx';
import { hearth, redReed } from '../world/layout.js';
import { terrainHeight } from '../world/terrain.js';
import { Campfire } from './Campfire.jsx';
import { Environment } from './Environment.jsx';
import { FragmentStone, ObjectiveMarker, RedReed } from './Markers.jsx';
import { Mountains } from './Mountains.jsx';
import { SkyDome } from './SkyDome.jsx';
import { Terrain } from './Terrain.jsx';
import { Water } from './Water.jsx';
import { FOG, SUN_DIRECTION } from './config.js';

const SUN = SUN_DIRECTION;
const sunPosition = SUN.map((v) => v * 40);

export function GameScene({
  runtime,
  interactables,
  onNearestChange,
  markers = [],
  fragments = [],
  reedActive = false,
  talkingTo,
  reducedMotion,
  quality,
}) {
  return (
    <>
      <fog attach="fog" args={[FOG.color, FOG.near, FOG.far]} />
      <SkyDome sunDirection={SUN} horizon={FOG.color} />
      <hemisphereLight args={['#f6d7b8', '#4a3b3a', 1.1]} />
      <ambientLight intensity={0.15} />
      <directionalLight
        position={sunPosition}
        intensity={2.4}
        color="#ffd2a1"
        castShadow={quality.shadows}
        shadow-mapSize={[quality.shadowMap, quality.shadowMap]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-far={90}
        shadow-bias={-0.0006}
        shadow-normalBias={0.04}
      />
      <Terrain />
      <Water fog={FOG} />
      <Mountains />
      <Campfire position={[hearth.x, terrainHeight(hearth.x, hearth.z), hearth.z]} reducedMotion={reducedMotion} />
      <Suspense fallback={null}>
        <Environment reducedMotion={reducedMotion} />
        <Storyteller runtime={runtime} talking={talkingTo === 'storyteller'} />
        <Player runtime={runtime} interactables={interactables} onNearestChange={onNearestChange} />
      </Suspense>
      {fragments.map((fragment) => (
        <FragmentStone
          key={fragment.id}
          position={fragment.position}
          collected={fragment.collected}
          reducedMotion={reducedMotion}
        />
      ))}
      <RedReed position={redReed} active={reedActive} reducedMotion={reducedMotion} />
      {markers.map((marker) => (
        <ObjectiveMarker key={marker.id} position={marker.position} height={marker.markerHeight} reducedMotion={reducedMotion} />
      ))}
      <FollowCamera runtime={runtime} />
    </>
  );
}
