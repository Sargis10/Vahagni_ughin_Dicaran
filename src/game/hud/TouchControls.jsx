import { useRef } from 'react';
import hy from '../../i18n/hy.js';

const RADIUS = 52;

/** Virtual joystick (left) and interact button (right) for touch screens. */
export function TouchControls({ input, prompt, onInteract }) {
  const t = hy.play;
  const knob = useRef(null);
  const active = useRef(null);

  const update = (event) => {
    const base = event.currentTarget.getBoundingClientRect();
    const cx = base.left + base.width / 2;
    const cy = base.top + base.height / 2;
    let dx = event.clientX - cx;
    let dy = event.clientY - cy;
    const distance = Math.hypot(dx, dy);
    if (distance > RADIUS) {
      dx = (dx / distance) * RADIUS;
      dy = (dy / distance) * RADIUS;
    }
    input.joystick.x = dx / RADIUS;
    input.joystick.y = -dy / RADIUS;
    input.joystick.run = distance > RADIUS * 0.92;
    if (knob.current) knob.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const reset = () => {
    active.current = null;
    input.joystick.x = 0;
    input.joystick.y = 0;
    input.joystick.run = false;
    if (knob.current) knob.current.style.transform = '';
  };

  return (
    <div className="touch-controls">
      <div
        className="touch-joystick"
        role="presentation"
        onPointerDown={(event) => {
          active.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          update(event);
        }}
        onPointerMove={(event) => {
          if (active.current === event.pointerId) update(event);
        }}
        onPointerUp={reset}
        onPointerCancel={reset}
      >
        <span ref={knob} className="touch-joystick__knob" />
      </div>
      <button
        type="button"
        className={`touch-interact${prompt ? ' is-ready' : ''}`}
        onClick={onInteract}
        disabled={!prompt}
        aria-label={prompt ?? t.nothingNearby}
      >
        <span aria-hidden="true">{prompt ? '✦' : '·'}</span>
      </button>
    </div>
  );
}
