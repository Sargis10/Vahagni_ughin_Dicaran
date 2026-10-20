import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import hy from '../src/i18n/hy.js';
import { navItems, paths } from '../src/app/navigation.js';
import { forest, props } from '../src/game/world/layout.js';
import { badges } from '../src/content/badges.js';
import { chapter1 } from '../src/game/chapters/chapter1.js';
import { createInitialProgress, reduceProgress } from '../src/progress/rules.js';

const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function collectStrings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (typeof value === 'function') {
    const result = value(1, 2, 3);
    if (typeof result === 'string') out.push(result);
  } else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, out));
  return out;
}

describe('UI copy', () => {
  const strings = collectStrings(hy);

  it('has no empty strings', () => {
    expect(strings.length).toBeGreaterThan(100);
    for (const text of strings) expect(text.trim().length, JSON.stringify(text)).toBeGreaterThan(0);
  });

  it('does not expose internal development phases to visitors', () => {
    for (const text of strings) {
      expect(text, text).not.toMatch(/Փուլ\s*\d|մշակման փուլ|phase\s*\d/i);
    }
  });

  it('links every navigation item to a route path', () => {
    const routes = new Set(Object.values(paths));
    for (const item of navItems) {
      expect(routes.has(item.to), item.to).toBe(true);
      expect(item.label).toBeTruthy();
    }
    const router = read('src/app/router.jsx');
    for (const key of Object.keys(paths)) {
      if (key === 'home') continue;
      expect(router, `route for paths.${key}`).toContain(`paths.${key}`);
    }
  });
});

describe('3D assets', () => {
  const assets = read('src/game/assets.js');
  const listed = [...assets.matchAll(/^\s+'([\w-]+)',$/gm)].map((m) => m[1]);
  const characters = [...assets.matchAll(/(?:player|storyteller): '([\w-]+)'/g)].map((m) => m[1]);
  const licenses = read('public/models/LICENSES.md');

  it('preloads every model the world layout uses', () => {
    const sceneDir = path.join(root, 'src/game/scene');
    const inScene = fs
      .readdirSync(sceneDir)
      .filter((file) => file.endsWith('.jsx'))
      .flatMap((file) => [...fs.readFileSync(path.join(sceneDir, file), 'utf8').matchAll(/name="([\w-]+)"/g)].map((m) => m[1]));
    const used = new Set([...props.map((p) => p.model), ...forest.map((t) => t.model), ...inScene].filter(Boolean));
    expect(used.size).toBeGreaterThan(10);
    for (const model of used) expect(listed, model).toContain(model);
  });

  it('ships every model file with a CC0 license next to it', () => {
    expect(listed.length).toBeGreaterThan(10);
    for (const name of listed) expect(fs.existsSync(path.join(root, 'public/models/nature', `${name}.glb`)), name).toBe(true);
    for (const name of characters) {
      expect(fs.existsSync(path.join(root, 'public/models/characters', `${name}.glb`)), name).toBe(true);
    }
    for (const dir of ['nature', 'characters']) {
      expect(read(`public/models/${dir}/Kenney-License.txt`)).toMatch(/CC0/);
    }
    expect(licenses).toMatch(/CC0 1\.0/);
  });
});

describe('progress page coupling', () => {
  it('reads quiz results from the reward ledger key format', () => {
    const question = chapter1.quiz.questionIds[0];
    const progress = reduceProgress(createInitialProgress(), {
      type: 'answer-question',
      questionKey: `${chapter1.id}:${question}`,
      optionId: 'correct',
      isCorrect: true,
      reward: { xp: 5 },
    });
    expect(progress.rewardsGranted).toContain(`quiz:${chapter1.id}:${question}`);
  });

  it('keeps badges unique and labelled as game rewards', () => {
    const ids = badges.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const badge of badges) {
      expect(badge.name).toBeTruthy();
      expect(badge.description).toBeTruthy();
      expect(['rosette', 'eye', 'quill', 'flame']).toContain(badge.icon);
    }
  });
});
