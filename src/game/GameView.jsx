import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress as useLoadingProgress } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router';
import hy from '../i18n/hy.js';
import { paths } from '../app/navigation.js';
import { useProgress } from '../progress/ProgressContext.jsx';
import { preloadGameAssets } from './assets.js';
import { getChapterState } from './chapters/chapterState.js';
import { useKeyboardInput } from './input/useKeyboardInput.js';
import { GameScene } from './scene/GameScene.jsx';
import { DialoguePanel } from './hud/DialoguePanel.jsx';
import { IntroOverlay } from './hud/IntroOverlay.jsx';
import { PauseMenu } from './hud/PauseMenu.jsx';
import { TouchControls } from './hud/TouchControls.jsx';
import { ObjectiveTracker } from './hud/ObjectiveTracker.jsx';
import { spawn } from './world/layout.js';

preloadGameAssets();

function createRuntime() {
  return {
    input: {
      keys: { forward: false, back: false, left: false, right: false, run: false },
      joystick: { x: 0, y: 0, run: false },
    },
    player: { x: spawn.x, z: spawn.z, rotation: spawn.rotation },
    camera: { yaw: 0, pitch: 0.38, distance: window.innerWidth < window.innerHeight ? 10 : 7.5 },
    locked: false,
    faceTarget: null,
    focus: null,
    focusYaw: null,
  };
}

/** Camera yaw that frames two characters side by side, picking the side nearest the current view. */
function sideViewYaw(a, b, currentYaw) {
  const line = Math.atan2(b.x - a.x, b.z - a.z);
  const options = [line + Math.PI / 2 + 0.35, line - Math.PI / 2 - 0.35];
  const distance = (yaw) => Math.abs(Math.atan2(Math.sin(yaw - currentYaw), Math.cos(yaw - currentYaw)));
  return distance(options[0]) <= distance(options[1]) ? options[0] : options[1];
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

function defaultQuality() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  return coarse || cores <= 4 ? 'low' : 'high';
}

const QUALITY = {
  high: { dpr: [1, 1.75], shadows: true, shadowMap: 2048 },
  low: { dpr: [1, 1.25], shadows: true, shadowMap: 1024 },
};

function LoadingBar() {
  const { active, progress } = useLoadingProgress();
  if (!active && progress >= 100) return null;
  return (
    <div className="hud-loading" role="status">
      <span>{hy.play.loadingWorld}</span>
      <span className="hud-loading__bar">
        <span style={{ width: `${Math.round(progress)}%` }} />
      </span>
    </div>
  );
}

export default function GameView({ chapter, script }) {
  const t = hy.play;
  const { progress, dispatch } = useProgress();
  const runtime = useRef(null);
  if (runtime.current === null) runtime.current = createRuntime();
  if (import.meta.env.DEV) window.__vahagnGame = runtime.current;

  const state = useMemo(() => getChapterState(script, progress), [script, progress]);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const coarsePointer = useMediaQuery('(pointer: coarse)');
  const portrait = useMediaQuery('(orientation: portrait)');
  const [quality, setQuality] = useState(defaultQuality);
  const { active: loadingActive, progress: loadingProgress } = useLoadingProgress();
  const ready = !loadingActive && loadingProgress >= 100;

  const [mode, setMode] = useState(() => (state.isDone(script.objectives[0].id) ? 'play' : 'intro'));
  const [dialogue, setDialogue] = useState(null);
  const [nearestId, setNearestId] = useState(null);

  const interactables = useMemo(
    () => script.interactables.map((item) => ({ ...item, active: script.isInteractableActive(item.id, state) })),
    [script, state],
  );
  const nearest = interactables.find((item) => item.id === nearestId) ?? null;
  const markerTarget = state.current ? interactables.find((item) => item.id === state.current.target) : null;

  const playing = mode === 'play' && !dialogue;
  useEffect(() => {
    runtime.current.locked = !playing;
  }, [playing]);

  const runEffects = useCallback(
    (effects = []) => {
      for (const effect of effects) {
        if (effect.type === 'complete-objective') {
          const objective = script.objectives.find((o) => o.id === effect.objectiveId);
          dispatch({
            type: 'complete-objective',
            chapterId: script.id,
            objectiveId: effect.objectiveId,
            reward: objective?.reward,
          });
        }
      }
    },
    [dispatch, script],
  );

  const closeDialogue = useCallback(() => {
    setDialogue(null);
    runtime.current.faceTarget = null;
    runtime.current.focus = null;
    runtime.current.focusYaw = null;
  }, []);

  const interact = useCallback(() => {
    if (!playing || !nearest) return;
    const action = script.resolveInteraction(nearest.id, state);
    if (action?.type === 'dialogue') {
      setDialogue({ id: action.id, index: 0, with: nearest.id });
      runtime.current.faceTarget = nearest.position;
      const { player } = runtime.current;
      runtime.current.focus = {
        x: (player.x + nearest.position.x) / 2,
        z: (player.z + nearest.position.z) / 2,
      };
      runtime.current.focusYaw = sideViewYaw(player, nearest.position, runtime.current.camera.yaw);
    }
  }, [playing, nearest, script, state]);

  const advanceDialogue = useCallback(() => {
    if (!dialogue) return;
    const definition = script.dialogues[dialogue.id];
    if (dialogue.index < definition.lines.length - 1) {
      setDialogue({ ...dialogue, index: dialogue.index + 1 });
      return;
    }
    closeDialogue();
    runEffects(definition.onComplete);
  }, [dialogue, script, closeDialogue, runEffects]);

  const togglePause = useCallback(() => {
    if (dialogue) {
      closeDialogue();
      return;
    }
    setMode((current) => (current === 'paused' ? 'play' : current === 'play' ? 'paused' : current));
  }, [dialogue, closeDialogue]);

  useKeyboardInput(runtime.current.input, { onInteract: interact, onPause: togglePause });

  const restart = () => {
    dispatch({ type: 'reset-chapter', chapterId: script.id });
    runtime.current = createRuntime();
    setNearestId(null);
    setMode('intro');
  };

  const dialogueDefinition = dialogue ? script.dialogues[dialogue.id] : null;
  const settings = QUALITY[quality];

  return (
    <div className={`game-view${coarsePointer ? ' game-view--touch' : ''}`}>
      <Canvas
        className="game-canvas"
        shadows={settings.shadows ? 'soft' : false}
        dpr={settings.dpr}
        camera={{ fov: portrait ? 60 : 50, near: 0.1, far: 700, position: [0, 6, 20] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
        aria-label={t.canvasLabel}
      >
        <Suspense fallback={null}>
          <GameScene
            runtime={runtime.current}
            interactables={interactables}
            onNearestChange={setNearestId}
            markerTarget={playing ? markerTarget : null}
            talkingTo={dialogue?.with}
            reducedMotion={reducedMotion}
            quality={settings}
          />
        </Suspense>
      </Canvas>

      <div className="hud" data-mode={mode}>
        <div className="hud-top">
          <ObjectiveTracker chapter={chapter} state={state} />
          <div className="hud-top__buttons">
            <button type="button" className="hud-icon-button" onClick={togglePause} aria-label={t.menu}>
              <span aria-hidden="true">☰</span>
            </button>
            <Link to={paths.map} className="hud-icon-button" aria-label={t.exitToMap}>
              <span aria-hidden="true">✕</span>
            </Link>
          </div>
        </div>

        <div className="hud-bottom">
          {playing && nearest && (
            <button type="button" className="hud-prompt" onClick={interact}>
              {!coarsePointer && <kbd>E</kbd>} {nearest.prompt}
            </button>
          )}
          {playing && !nearest && !coarsePointer && <p className="hud-hint">{t.moveHint}</p>}
        </div>

        {dialogueDefinition && (
          <DialoguePanel
            speaker={script.speakers[dialogueDefinition.speaker]}
            line={dialogueDefinition.lines[dialogue.index]}
            index={dialogue.index}
            total={dialogueDefinition.lines.length}
            onNext={advanceDialogue}
            onClose={closeDialogue}
          />
        )}

        {coarsePointer && playing && (
          <TouchControls input={runtime.current.input} prompt={nearest?.prompt ?? null} onInteract={interact} />
        )}
      </div>

      {mode === 'intro' && (
        <IntroOverlay
          chapterTitle={chapter.title}
          chapterSubtitle={chapter.subtitle}
          slides={script.intro}
          ready={ready}
          onDone={() => setMode('play')}
        />
      )}
      {mode === 'paused' && (
        <PauseMenu
          onResume={() => setMode('play')}
          onRestart={restart}
          canRestart={progress.completedObjectives.some((key) => key.startsWith(`${script.id}:`))}
          quality={quality}
          onToggleQuality={() => setQuality(quality === 'high' ? 'low' : 'high')}
        />
      )}
      {mode !== 'intro' && <LoadingBar />}
    </div>
  );
}
