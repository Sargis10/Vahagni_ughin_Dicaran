import { useEffect, useRef } from 'react';

const BINDINGS = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'back',
  ArrowDown: 'back',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
  ShiftLeft: 'run',
  ShiftRight: 'run',
};

function isFormControl(target) {
  return target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]');
}

/**
 * Writes movement keys into `input.keys` and calls `onInteract` / `onPause`. Movement is
 * ignored while focus is in a form control so typing never moves the character.
 */
export function useKeyboardInput(input, { onInteract, onPause }) {
  const handlers = useRef({ onInteract, onPause });
  useEffect(() => {
    handlers.current = { onInteract, onPause };
  }, [onInteract, onPause]);

  useEffect(() => {
    const clear = () => {
      for (const key of Object.keys(input.keys)) input.keys[key] = false;
    };
    const onKeyDown = (event) => {
      if (isFormControl(event.target)) return;
      const action = BINDINGS[event.code];
      if (action) {
        input.keys[action] = true;
        if (event.code.startsWith('Arrow')) event.preventDefault();
        return;
      }
      if (event.repeat) return;
      if (event.code === 'KeyE') {
        handlers.current.onInteract?.();
      } else if (event.code === 'Escape') {
        handlers.current.onPause?.();
      }
    };
    const onKeyUp = (event) => {
      const action = BINDINGS[event.code];
      if (action) input.keys[action] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', clear);
    };
  }, [input]);
}
