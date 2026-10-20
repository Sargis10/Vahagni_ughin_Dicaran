import { useMemo } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = pos.xyww;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uMiddle;
  uniform vec3 uHorizon;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  varying vec3 vDir;
  void main() {
    float h = vDir.y;
    vec3 color = mix(uHorizon, uMiddle, smoothstep(0.0, 0.25, h));
    color = mix(color, uTop, smoothstep(0.2, 0.75, h));
    float sun = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
    color += uSunColor * (pow(sun, 600.0) * 1.6 + pow(sun, 12.0) * 0.35);
    color = mix(color, uHorizon, 1.0 - smoothstep(-0.25, 0.02, h));
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

export function SkyDome({ sunDirection, horizon }) {
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color('#2a2440') },
      uMiddle: { value: new THREE.Color('#9a5a6a') },
      uHorizon: { value: new THREE.Color(horizon) },
      uSunDir: { value: new THREE.Vector3(...sunDirection) },
      uSunColor: { value: new THREE.Color('#ffd9a0') },
    }),
    [sunDirection, horizon],
  );
  return (
    <mesh scale={400} renderOrder={-1} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}
