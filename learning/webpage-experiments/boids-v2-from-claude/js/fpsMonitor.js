// ---------------------------------------------------------------
// fpsMonitor.js
//
// Tracks actual rendered frames per second and displays it in a small
// fixed overlay. Call recordFrame() once per animation frame (we do
// this from render(), since render() already runs exactly once per
// requestAnimationFrame callback in engine.js — not once per tick,
// which can differ from the frame rate).
// ---------------------------------------------------------------

export class FPSMonitor {
  /** @param {number} updateIntervalMs - how often the displayed number
   *  refreshes; averaging over ~500ms avoids a jumpy, hard-to-read display. */
  constructor(updateIntervalMs = 500) {
    this.updateIntervalMs = updateIntervalMs;
    this.frameCount = 0;
    this.windowStart = performance.now();
    this.currentFPS = 0;

    this.el = document.createElement('div');
    this.el.id = 'fps-counter';
    this.el.className = 'fps-counter';
    this.el.textContent = 'FPS: --';
  }

  /** Attaches the overlay to the page. Call once, only if enabled. */
  mount() {
    document.body.appendChild(this.el);
  }

  /** Removes the overlay entirely. */
  unmount() {
    this.el.remove();
  }

  /** Call once per rendered frame. */
  recordFrame() {
    this.frameCount++;
    const now = performance.now();
    const elapsed = now - this.windowStart;

    if (elapsed >= this.updateIntervalMs) {
      this.currentFPS = Math.round((this.frameCount / elapsed) * 1000);
      this.el.textContent = `FPS: ${this.currentFPS}`;
      this.frameCount = 0;
      this.windowStart = now;
    }
  }
}