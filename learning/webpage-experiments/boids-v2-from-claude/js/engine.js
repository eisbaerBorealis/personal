// ---------------------------------------------------------------
// engine.js
//
// A small, reusable fixed-timestep game loop.
//
// Runs a provided `doTick(tickCount)` callback at a fixed rate
// (ticks per second), decoupled from the browser's paint rate.
// Uses requestAnimationFrame + an accumulator so the tick rate stays
// accurate even if frames are dropped, and so multiple ticks fire
// in a single frame if the browser lags behind.
// ---------------------------------------------------------------

export class GameEngine {
  /**
   * @param {number} tickRate - ticks per second
   * @param {(tickCount: number) => void} doTick - called once per tick
   */
  constructor(tickRate, doTick) {
    if (typeof doTick !== 'function') {
      throw new TypeError('GameEngine requires a doTick(tickCount) callback');
    }

    this.tickRate = tickRate;
    this.tickIntervalMs = 1000 / tickRate;
    this.doTick = doTick;

    this.tickCount = 0;
    this._running = false;
    this._rafId = null;
    this._lastTimestamp = 0;
    this._accumulatorMs = 0;

    // Bound once so we can add/remove the same reference if needed
    this._loop = this._loop.bind(this);
  }

  /** Start the loop. Safe to call if already running (no-op). */
  start() {
    if (this._running) return;
    this._running = true;
    this._lastTimestamp = performance.now();
    this._accumulatorMs = 0;
    this._rafId = requestAnimationFrame(this._loop);
  }

  /** Stop the loop. Safe to call if already stopped (no-op). */
  stop() {
    this._running = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  /** @returns {boolean} whether the loop is currently running */
  isRunning() {
    return this._running;
  }

  _loop(timestamp) {
    if (!this._running) return;

    const elapsedMs = timestamp - this._lastTimestamp;
    this._lastTimestamp = timestamp;
    this._accumulatorMs += elapsedMs;

    // Guard against a huge gap (e.g. tab was backgrounded) causing
    // a "spiral of death" where we try to catch up forever.
    const maxCatchUpMs = this.tickIntervalMs * 10;
    if (this._accumulatorMs > maxCatchUpMs) {
      this._accumulatorMs = maxCatchUpMs;
    }

    while (this._accumulatorMs >= this.tickIntervalMs) {
      this.tickCount += 1;
      this.doTick(this.tickCount);
      this._accumulatorMs -= this.tickIntervalMs;
    }

    this._rafId = requestAnimationFrame(this._loop);
  }
}
