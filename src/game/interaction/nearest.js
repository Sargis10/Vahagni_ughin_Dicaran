/** Returns the closest active interactable within its interaction radius, or null. */
export function findNearestInteractable(position, interactables, isActive = () => true) {
  let best = null;
  let bestDistance = Infinity;
  for (const item of interactables) {
    if (!isActive(item)) continue;
    const distance = Math.hypot(position.x - item.position.x, position.z - item.position.z);
    if (distance <= item.radius && distance < bestDistance) {
      best = item;
      bestDistance = distance;
    }
  }
  return best;
}
