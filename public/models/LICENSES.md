# 3D models — licences

All 3D models in this folder are by **Kenney** (https://www.kenney.nl) and are released under
**Creative Commons Zero (CC0 1.0)** — https://creativecommons.org/publicdomain/zero/1.0/.
Crediting is not required; we credit Kenney anyway. The original licence files are kept next to
the models (`characters/Kenney-License.txt`, `nature/Kenney-License.txt`).

| Folder | Pack | Version | Source | Licence |
|---|---|---|---|---|
| `characters/` | Mini Characters | 1.0 (2024-07-17) | https://kenney.nl/assets/mini-characters | CC0 1.0 |
| `nature/` | Nature Kit | 2.1 (2020-04-29) | https://kenney.nl/assets/nature-kit | CC0 1.0 |

## Files used

- `characters/character-female-f.glb` — the player (the apprentice chronicler, a fictional character).
- `characters/character-male-b.glb` — the storyteller (a fictional character).
- `characters/character-female-c.glb`, `characters/character-male-f.glb` — spares, not loaded yet.
- `characters/Textures/colormap.png` — shared texture atlas of the characters.
- `nature/*.glb` — terrain props: rocks, trees, reeds (`crops_bambooStageB`), grass, flowers,
  lilies, logs, campfire stones, tent, pot, stone columns and blocks, path stones, mushrooms.

## Changes

- Materials of the nature models are replaced at runtime with flat-shaded copies in the site
  palette (see `src/game/scene/materials.js`). The model files themselves are unmodified.
- The water, sky, terrain, mountains, fire and song-fragment stones are generated in code and
  are not third-party assets.

The game world built from these models (the shore, the hearth, the ruins) is fictional and does
not reconstruct a real historical place.
