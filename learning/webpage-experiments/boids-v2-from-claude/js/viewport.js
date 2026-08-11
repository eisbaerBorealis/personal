// ---------------------------------------------------------------
// viewport.js
//
// Tracks zoom/pan camera state (scale + translation) for a canvas-based
// scene. Unlike the SVG version, this module does NOT touch the DOM
// directly — it has no persistent element to transform. Instead, it
// exposes getState(), which main.js's render loop reads every frame to
// build the canvas context's transform itself.
// ---------------------------------------------------------------

/**
 * @param {HTMLCanvasElement} canvasEl - receives mouse/wheel events
 * @param {object} config - CONFIG object (see config.js)
 */
export function initViewport(canvasEl, config) {
  const state = {
    scale: 1,
    translateX: 0,
    translateY: 0,
  };

  // Converts a mouse event's client coordinates into world coordinates,
  // given the CURRENT camera state. Used so zoom stays centered under
  // the cursor and so pan math is unaffected by canvas size/position.
  function screenToWorld(clientX, clientY) {
    const rect = canvasEl.getBoundingClientRect();
    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;
    return {
      x: (screenX - state.translateX) / state.scale,
      y: (screenY - state.translateY) / state.scale,
    };
  }

  if (config.ZOOM_ENABLED) {
    canvasEl.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();

        const worldPointUnderCursor = screenToWorld(event.clientX, event.clientY);
        const zoomFactor = 1 - event.deltaY * config.ZOOM_SENSITIVITY;
        const newScale = clamp(state.scale * zoomFactor, config.ZOOM_MIN, config.ZOOM_MAX);

        // Recompute translation so the same world point stays fixed
        // under the cursor after the scale changes.
        const rect = canvasEl.getBoundingClientRect();
        const screenX = event.clientX - rect.left;
        const screenY = event.clientY - rect.top;
        state.translateX = screenX - worldPointUnderCursor.x * newScale;
        state.translateY = screenY - worldPointUnderCursor.y * newScale;
        state.scale = newScale;
      },
      { passive: false }
    );
  }

  if (config.PAN_ENABLED) {
    canvasEl.classList.add('pan-enabled');

    let isPanning = false;
    let lastClientX = 0;
    let lastClientY = 0;

    canvasEl.addEventListener('mousedown', (event) => {
      isPanning = true;
      lastClientX = event.clientX;
      lastClientY = event.clientY;
      canvasEl.classList.add('panning');
    });

    window.addEventListener('mousemove', (event) => {
      if (!isPanning) return;
      state.translateX += event.clientX - lastClientX;
      state.translateY += event.clientY - lastClientY;
      lastClientX = event.clientX;
      lastClientY = event.clientY;
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      canvasEl.classList.remove('panning');
    });
  }

  return {
    /** Read the current camera state — call this every frame in render(). */
    getState: () => ({ ...state }),
    /** Directly set part of the camera state (used once at startup to
     *  center the initial view — see main.js). */
    setState: (partial) => Object.assign(state, partial),
    reset: () => {
      state.scale = 1;
      state.translateX = 0;
      state.translateY = 0;
    },
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}