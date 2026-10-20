import { describe, expect, it } from 'vitest';
import { clampToCircle, constrainPosition, resolveCircleCollisions } from '../src/game/physics/collision.js';
import { angleDelta, approachVelocity, dampAngle, inputToWorldDirection } from '../src/game/physics/movement.js';
import { findNearestInteractable } from '../src/game/interaction/nearest.js';

describe('collision', () => {
  it('pushes a circle out of an obstacle', () => {
    const result = resolveCircleCollisions({ x: 0.5, z: 0 }, 0.5, [{ x: 0, z: 0, r: 1 }]);
    expect(Math.hypot(result.x, result.z)).toBeCloseTo(1.5, 5);
  });

  it('leaves non-overlapping positions alone', () => {
    expect(resolveCircleCollisions({ x: 5, z: 5 }, 0.5, [{ x: 0, z: 0, r: 1 }])).toEqual({ x: 5, z: 5 });
  });

  it('handles a position exactly at the obstacle centre', () => {
    const result = resolveCircleCollisions({ x: 0, z: 0 }, 0.5, [{ x: 0, z: 0, r: 1 }]);
    expect(Math.hypot(result.x, result.z)).toBeGreaterThanOrEqual(1.5 - 1e-9);
  });

  it('clamps to the play area circle', () => {
    const p = clampToCircle({ x: 30, z: 40 }, { x: 0, z: 0 }, 10);
    expect(Math.hypot(p.x, p.z)).toBeCloseTo(10);
  });

  it('keeps the player on the land side of the shoreline', () => {
    const bounds = { center: { x: 0, z: 0 }, radius: 50, shoreZ: () => -10 };
    expect(constrainPosition({ x: 0, z: -20 }, 0.5, bounds, []).z).toBeCloseTo(-9.5);
  });
});

describe('movement', () => {
  it('maps forward input to -Z when the camera yaw is 0', () => {
    const d = inputToWorldDirection(1, 0, 0);
    expect(d.x).toBeCloseTo(0);
    expect(d.z).toBeCloseTo(-1);
  });

  it('maps right input to +X when the camera yaw is 0', () => {
    const d = inputToWorldDirection(0, 1, 0);
    expect(d.x).toBeCloseTo(1);
    expect(d.z).toBeCloseTo(0);
  });

  it('rotates with the camera', () => {
    const d = inputToWorldDirection(1, 0, Math.PI / 2);
    expect(d.x).toBeCloseTo(-1);
    expect(d.z).toBeCloseTo(0);
  });

  it('ignores tiny joystick noise and caps magnitude', () => {
    expect(inputToWorldDirection(0.01, 0.01, 0).magnitude).toBe(0);
    expect(inputToWorldDirection(1, 1, 0).magnitude).toBe(1);
  });

  it('approaches the target velocity smoothly', () => {
    const v = approachVelocity({ x: 0, z: 0 }, { x: 4, z: 0 }, 1 / 60);
    expect(v.x).toBeGreaterThan(0);
    expect(v.x).toBeLessThan(4);
  });

  it('takes the shortest way around when turning', () => {
    expect(angleDelta(Math.PI - 0.1, -Math.PI + 0.1)).toBeCloseTo(0.2);
    const a = dampAngle(Math.PI - 0.1, -Math.PI + 0.1, 10, 1);
    expect(Math.abs(angleDelta(a, -Math.PI + 0.1))).toBeLessThan(0.01);
  });
});

describe('interaction', () => {
  const items = [
    { id: 'a', position: { x: 0, z: 0 }, radius: 2 },
    { id: 'b', position: { x: 1, z: 0 }, radius: 2 },
    { id: 'c', position: { x: 10, z: 0 }, radius: 2 },
  ];

  it('picks the closest item within range', () => {
    expect(findNearestInteractable({ x: 1.2, z: 0 }, items).id).toBe('b');
  });

  it('returns null when nothing is in range', () => {
    expect(findNearestInteractable({ x: 5, z: 5 }, items)).toBeNull();
  });

  it('skips inactive items', () => {
    expect(findNearestInteractable({ x: 1.2, z: 0 }, items, (i) => i.id !== 'b').id).toBe('a');
  });
});
