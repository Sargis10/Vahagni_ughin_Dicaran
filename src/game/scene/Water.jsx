import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// «ծով ծիրանի»: the sea is tinted crimson-purple, the colour the song gives it.
const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  varying float vWave;
  void main() {
    vec3 p = position;
    vec4 world = modelMatrix * vec4(p, 1.0);
    float wave = sin(world.x * 0.35 + uTime * 0.9) * 0.05 + sin(world.z * 0.5 - uTime * 1.2) * 0.04;
    world.y += wave;
    vWave = wave;
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uFoam;
  uniform vec3 uSky;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  varying vec3 vWorld;
  varying float vWave;

  float shoreZ(float x) {
    return -9.5 + 1.6 * sin(x * 0.22) + 0.8 * sin(x * 0.53 + 1.0);
  }

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    float fromShore = shoreZ(vWorld.x) - vWorld.z;
    float depth = smoothstep(0.0, 14.0, fromShore);
    vec3 color = mix(uShallow, uDeep, depth);

    vec2 flow = vWorld.xz * 0.45 + vec2(uTime * 0.05, -uTime * 0.08);
    float ripples = noise(flow) * 0.6 + noise(flow * 2.3 + 4.0) * 0.4;
    color += (ripples - 0.5) * 0.07;

    float sparkle = smoothstep(0.82, 0.98, noise(vWorld.xz * 1.6 + uTime * 0.6)) * (0.25 + vWave * 3.0);
    color += vec3(1.0, 0.82, 0.55) * max(sparkle, 0.0) * 0.5;

    float foamLine = 1.0 - smoothstep(0.0, 0.9 + ripples * 0.6, fromShore - 0.15 * sin(uTime * 1.3 + vWorld.x));
    color = mix(color, uFoam, foamLine * 0.75);

    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fresnel = pow(1.0 - max(viewDir.y, 0.0), 3.0);
    color = mix(color, uSky, fresnel * 0.32);

    float dist = length(cameraPosition - vWorld);
    float fog = smoothstep(uFogNear, uFogFar, dist);
    gl_FragColor = vec4(mix(color, uFogColor, fog), 0.94);
    #include <colorspace_fragment>
  }
`;

export function Water({ fog }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#2e0d30') },
      uShallow: { value: new THREE.Color('#7a2a52') },
      uFoam: { value: new THREE.Color('#f3dcc4') },
      uSky: { value: new THREE.Color('#c98a86') },
      uFogColor: { value: new THREE.Color(fog.color) },
      uFogNear: { value: fog.near },
      uFogFar: { value: fog.far },
    }),
    [fog.color, fog.near, fog.far],
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, -0.32, -60]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[260, 110, 130, 55]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
