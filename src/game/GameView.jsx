import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, useProgress as useLoadingProgress } from '@react-three/drei';
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
import { FragmentCard } from './hud/FragmentCard.jsx';
import { QuizPanel } from './hud/QuizPanel.jsx';
import { ChoicePanel } from './hud/ChoicePanel.jsx';
import { CompletionOverlay } from './hud/CompletionOverlay.jsx';
import { useModalFocusTrap } from './hud/useModalFocusTrap.js';
import { getQuizQuestions } from './chapters/chapter1.js';
import { spawn } from './world/layout.js';
import { getEntryBySlug } from '../content/index.js';

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
  high: { dpr: [1, 1.75], shadows: true, shadowMap: 2048, detail: 'high' },
  low: { dpr: [1, 1.25], shadows: true, shadowMap: 1024, detail: 'low' },
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

export default function GameView({ chapter, script, restartOnMount = false, onRestarted }) {
  const t = hy.play;
  const { progress, dispatch } = useProgress();
  const runtime = useRef(null);
  const viewRef = useRef(null);
  useModalFocusTrap(viewRef);
  if (runtime.current === null) runtime.current = createRuntime();
  if (import.meta.env.DEV) window.__vahagnGame = runtime.current;

  const state = useMemo(() => getChapterState(script, progress), [script, progress]);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const coarsePointer = useMediaQuery('(pointer: coarse)');
  const portrait = useMediaQuery('(orientation: portrait)');
  const [quality, setQuality] = useState(defaultQuality);
  const qualityChosen = useRef(false);
  const lowerQuality = useCallback(() => {
    if (!qualityChosen.current) setQuality('low');
  }, []);
  const { active: loadingActive, progress: loadingProgress } = useLoadingProgress();
  const ready = !loadingActive && loadingProgress >= 100;

  const [mode, setMode] = useState(() =>
    restartOnMount || !state.isDone(script.objectives[0].id) ? 'intro' : 'play',
  );
  const [dialogue, setDialogue] = useState(null);
  const [panel, setPanel] = useState(null);
  const [nearestId, setNearestId] = useState(null);
  const questions = useMemo(() => getQuizQuestions(), []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('is-playing');
    window.scrollTo(0, 0);
    return () => root.classList.remove('is-playing');
  }, []);

  const restartHandled = useRef(false);
  useEffect(() => {
    if (!restartOnMount || restartHandled.current) return;
    restartHandled.current = true;
    dispatch({ type: 'reset-chapter', chapterId: script.id, silent: true });
    onRestarted?.();
  }, [restartOnMount, dispatch, script.id, onRestarted]);

  const interactables = useMemo(
    () => script.interactables.map((item) => ({ ...item, active: script.isInteractableActive(item.id, state) })),
    [script, state],
  );
  const nearest = interactables.find((item) => item.id === nearestId) ?? null;
  const fragmentStones = useMemo(
    () => script.fragments.map((f) => ({ id: f.id, position: f.position, collected: state.isDone(f.id) })),
    [script, state],
  );
  const reedActive = interactables.find((item) => item.id === 'red-reed')?.active ?? false;

  const playing = mode === 'play' && !dialogue && !panel;
  const markers = playing
    ? script.markerTargets(state).map((id) => interactables.find((item) => item.id === id)).filter(Boolean)
    : [];

  useEffect(() => {
    runtime.current.locked = !playing;
  }, [playing]);

  const completeObjective = useCallback(
    (objectiveId) => {
      const objective = script.objectives.find((o) => o.id === objectiveId);
      const parent = script.objectives.find((o) => o.parts?.includes(objectiveId));
      dispatch({
        type: 'complete-objective',
        chapterId: script.id,
        objectiveId,
        reward: objective?.reward ?? parent?.partReward,
      });
    },
    [dispatch, script],
  );

  const runEffects = useCallback(
    (effects = []) => {
      for (const effect of effects) {
        if (effect.type === 'complete-objective') completeObjective(effect.objectiveId);
        if (effect.type === 'open-choice') setPanel({ type: 'choice' });
        if (effect.type === 'complete-chapter') {
          dispatch({ type: 'complete-chapter', chapterId: script.id, reward: script.rewards.chapter });
          setPanel({ type: 'complete' });
        }
      }
    },
    [completeObjective, dispatch, script],
  );

  const releaseCamera = useCallback(() => {
    runtime.current.faceTarget = null;
    runtime.current.focus = null;
    runtime.current.focusYaw = null;
  }, []);

  const closeDialogue = useCallback(() => {
    setDialogue(null);
    releaseCamera();
  }, [releaseCamera]);

  const lookAt = useCallback((target) => {
    const { player } = runtime.current;
    runtime.current.faceTarget = target.position;
    runtime.current.focus = { x: (player.x + target.position.x) / 2, z: (player.z + target.position.z) / 2 };
    runtime.current.focusYaw = sideViewYaw(player, target.position, runtime.current.camera.yaw);
  }, []);

  const openDialogue = useCallback(
    (id, withId) => {
      setDialogue({ id, index: 0, with: withId });
    },
    [],
  );

  const interact = useCallback(() => {
    if (!playing || !nearest) return;
    const action = script.resolveInteraction(nearest.id, state);
    if (!action) return;
    lookAt(nearest);
    if (action.type === 'dialogue') openDialogue(action.id, nearest.id);
    if (action.type === 'fragment') setPanel({ type: 'fragment', id: action.id });
    if (action.type === 'quiz') setPanel({ type: 'quiz' });
  }, [playing, nearest, script, state, lookAt, openDialogue]);

  const advanceDialogue = useCallback(() => {
    if (!dialogue) return;
    const definition = script.dialogues[dialogue.id];
    if (dialogue.index < definition.lines.length - 1) {
      setDialogue({ ...dialogue, index: dialogue.index + 1 });
      return;
    }
    const keepFocus = definition.onComplete?.some((effect) => effect.type === 'open-choice');
    setDialogue(null);
    if (!keepFocus) releaseCamera();
    runEffects(definition.onComplete);
  }, [dialogue, script, releaseCamera, runEffects]);

  const closePanel = useCallback(() => {
    setPanel(null);
    releaseCamera();
  }, [releaseCamera]);

  const keepFragment = useCallback(() => {
    if (panel?.type !== 'fragment') return;
    const fragment = script.fragments.find((f) => f.id === panel.id);
    completeObjective(panel.id);
    const entry = fragment ? getEntryBySlug(fragment.entrySlug) : null;
    if (entry) dispatch({ type: 'discover-entry', entryId: entry.id });
    closePanel();
  }, [panel, script, completeObjective, dispatch, closePanel]);

  const togglePause = useCallback(() => {
    if (dialogue) {
      closeDialogue();
      return;
    }
    if (panel && panel.type !== 'complete' && panel.type !== 'choice') {
      if (panel.type === 'fragment') keepFragment();
      else closePanel();
      return;
    }
    setMode((current) => (current === 'paused' ? 'play' : current === 'play' && !panel ? 'paused' : current));
  }, [dialogue, panel, closeDialogue, closePanel, keepFragment]);

  useKeyboardInput(runtime.current.input, { onInteract: interact, onPause: togglePause });

  const restart = () => {
    dispatch({ type: 'reset-chapter', chapterId: script.id, silent: true });
    Object.assign(runtime.current.player, { x: spawn.x, z: spawn.z, rotation: spawn.rotation });
    runtime.current.camera.yaw = 0;
    releaseCamera();
    setNearestId(null);
    setDialogue(null);
    setPanel(null);
    setMode('intro');
  };

  const chooseOption = (option) => {
    dispatch({
      type: 'make-choice',
      choiceKey: `${script.id}:${script.choice.key}`,
      optionId: option.id,
      reward: { badge: option.badge },
    });
    setPanel(null);
    openDialogue(option.ending, 'storyteller');
  };

  const onQuizAnswer = (questionId, optionId, isCorrect) => {
    dispatch({
      type: 'answer-question',
      questionKey: `${script.id}:${questionId}`,
      optionId,
      isCorrect,
      reward: script.rewards.quizCorrect,
    });
  };

  const onQuizFinish = (result) => {
    if (!result.passed) return;
    completeObjective('reed-challenge');
    if (result.perfect) {
      dispatch({ type: 'grant-reward', rewardId: `${script.id}:perfect-quiz`, reward: script.rewards.perfectQuiz });
    }
  };

  const dialogueDefinition = dialogue ? script.dialogues[dialogue.id] : null;
  const fragmentIndex = panel?.type === 'fragment' ? script.fragments.findIndex((f) => f.id === panel.id) : -1;
  const settings = QUALITY[quality];

  return (
    <div ref={viewRef} className={`game-view${coarsePointer ? ' game-view--touch' : ''}`}>
      <Canvas
        className="game-canvas"
        shadows={settings.shadows ? 'soft' : false}
        dpr={settings.dpr}
        frameloop={mode === 'paused' ? 'demand' : 'always'}
        camera={{ fov: portrait ? 60 : 50, near: 0.1, far: 700, position: [0, 6, 20] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          if (import.meta.env.DEV) runtime.current.renderer = gl;
        }}
        role="img"
        aria-label={t.canvasLabel}
      >
        <PerformanceMonitor onDecline={lowerQuality} onFallback={lowerQuality} flipflops={3} />
        <Suspense fallback={null}>
          <GameScene
            runtime={runtime.current}
            interactables={interactables}
            onNearestChange={setNearestId}
            markers={markers}
            fragments={fragmentStones}
            reedActive={reedActive}
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

      {panel?.type === 'fragment' && (
        <FragmentCard
          fragment={script.fragments[fragmentIndex]}
          index={fragmentIndex}
          total={script.fragments.length}
          onClose={keepFragment}
        />
      )}
      {panel?.type === 'quiz' && (
        <QuizPanel
          questions={questions}
          passScore={script.quiz.passScore}
          onAnswer={onQuizAnswer}
          onFinish={onQuizFinish}
          onClose={closePanel}
        />
      )}
      {panel?.type === 'choice' && <ChoicePanel choice={script.choice} onChoose={chooseOption} />}
      {panel?.type === 'complete' && (
        <CompletionOverlay
          chapter={chapter}
          script={script}
          progress={progress}
          choiceId={progress.choices[`${script.id}:${script.choice.key}`]}
          onStay={closePanel}
          onReplay={restart}
        />
      )}

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
          onToggleQuality={() => {
            qualityChosen.current = true;
            setQuality(quality === 'high' ? 'low' : 'high');
          }}
        />
      )}
      {mode !== 'intro' && <LoadingBar />}
    </div>
  );
}
