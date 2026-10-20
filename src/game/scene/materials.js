import * as THREE from 'three';

// Palette overrides for Kenney's named materials, tuned to the site's dusk palette.
const PALETTE = {
  grass: '#6f8f4a',
  leafsDark: '#3f5f3a',
  leafsGreen: '#5f8a45',
  dirt: '#8a6b4c',
  stone: '#b9ad98',
  stoneDark: '#8c8273',
  woodBark: '#6b4a32',
  woodBarkDark: '#4b3526',
  woodInner: '#c79a64',
  wood: '#8a5d3b',
  colorRed: '#a33a2e',
};

export const windUniforms = { uTime: { value: 0 } };

/**
 * Adds a gentle wind sway to a material: vertices move more the higher they are above the
 * model origin. Uses instance position so neighbouring plants are out of phase.
 */
export function addWindSway(material, strength = 0.12) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = windUniforms.uTime;
    shader.vertexShader = `uniform float uTime;\n${shader.vertexShader}`.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      #ifdef USE_INSTANCING
        vec2 seed = instanceMatrix[3].xz;
      #else
        vec2 seed = vec2(0.0);
      #endif
      float sway = sin(uTime * 1.6 + seed.x * 0.7 + seed.y * 0.4) * 0.6 + sin(uTime * 2.7 + seed.x) * 0.4;
      transformed.x += sway * ${strength.toFixed(3)} * position.y * position.y * 2.0;
      transformed.z += sway * ${(strength * 0.5).toFixed(3)} * position.y * position.y * 2.0;`,
    );
  };
  material.customProgramCacheKey = () => `wind-${strength}`;
  return material;
}

const cache = new Map();

/** Returns a shared, recoloured flat-shaded copy of a Kenney material. */
export function themedMaterial(source, { wind = 0, color } = {}) {
  const key = `${source.name}|${source.uuid}|${wind}|${color ?? ''}`;
  if (cache.has(key)) return cache.get(key);
  const material = new THREE.MeshStandardMaterial({
    color: color ?? PALETTE[source.name] ?? source.color,
    roughness: 0.92,
    metalness: 0,
    flatShading: true,
  });
  material.name = source.name;
  if (wind > 0) addWindSway(material, wind);
  cache.set(key, material);
  return material;
}
