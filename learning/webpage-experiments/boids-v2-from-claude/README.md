# Vanilla Canvas Game Engine Starter

A dependency-free starting point for browser-based visual apps/games:
a full-window, resizable Canvas stage with zoom/pan, a fixed-timestep
tick loop decoupled from rendering, spatial-grid-accelerated neighbor
queries, and an FPS monitor — demonstrated with a boids flocking sim.

## Structure

index.html Single #stage div containing the <canvas>
css/style.css Full-window responsive layout, cursor states, FPS overlay
js/config.js All tunable values (tick rate, zoom/pan, boundary, flocking, etc.)
js/engine.js GameEngine: reusable fixed-timestep simulation loop
js/viewport.js Zoom/pan camera state (tracks scale + translation)
js/spatialGrid.js Generic spatial hash grid for fast neighbor queries
js/fpsMonitor.js Rendered-frames-per-second overlay
js/main.js Wires everything together + the boids demo scene

## Running it

No build step required for development. Because `main.js` is loaded as
an ES module (`<script type="module">`), open it via a local server
rather than double-clicking the HTML file — browsers block module
loading over the `file://` protocol.

If you scaffolded this with Vite:

```bash
npm install
npm run dev
```

Or, with no tooling at all, any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` (or whatever port your server prints).

Finally, this program is hosted on Github at https://eisbaerborealis.github.io/zBeta/boids-v2-from-claude/

## Architecture

### Simulation vs. rendering are decoupled

`GameEngine` runs `doTick()` at a fixed rate (`CONFIG.TICK_RATE`), independent
of the browser's actual frame rate — this keeps simulation speed consistent
regardless of display refresh rate or dropped frames. Rendering runs in its
own `requestAnimationFrame` loop in `main.js`, reading current state and
drawing it, rather than being triggered from inside `doTick()`. This matters
if the engine ever needs to run multiple catch-up ticks in a single frame
(e.g. after the tab was backgrounded) — you still only want to draw once per
actual displayed frame, not once per tick.

### World coordinates vs. screen coordinates

All simulation logic (boid positions, the boundary circle, etc.) works in
plain **world coordinates** — arbitrary numbers with no inherent relationship
to pixels or window size. The camera (`viewport.js`) tracks a `scale` and
`translateX`/`translateY`, and `render()` applies that transform to the
canvas context once per frame before drawing anything, so everything drawn
afterward is automatically positioned and scaled correctly on screen. Mouse
coordinates are converted back into world coordinates (via the inverse of
that same transform) for zoom-centered-on-cursor and pan math.

### Resizing

Canvas has no equivalent to SVG's auto-scaling `viewBox`, so resizing is
handled explicitly: `resizeCanvasToWindow()` sets the canvas's actual pixel
buffer size (`canvas.width`/`height`) to match the window, scaled by
`devicePixelRatio` for sharpness on high-DPI screens, while CSS keeps its
on-screen display size at 100% of its container. This runs once at startup
and again on every `resize` event.

## Configuration (`js/config.js`)

| Key | Purpose |
|---|---|
| `TICK_RATE` | How many times per second `doTick()` runs |
| `ZOOM_ENABLED` / `PAN_ENABLED` | Turn mouse-wheel zoom / click-and-drag pan on/off |
| `ZOOM_MIN` / `ZOOM_MAX` / `ZOOM_SENSITIVITY` | Zoom limits and responsiveness |
| `BOUNDARY_CENTER_X/Y`, `BOUNDARY_RADIUS` | The circular arena boids fly within |
| `BOUNDARY_MARGIN`, `BOUNDARY_TURN_FACTOR` | How boids steer away from the wall |
| `BOID_COUNT`, `BOID_COLOR`, `BOID_SHAPE` | Boid appearance; shape is an array of `[x, y]` points |
| `BOID_SPEED`, `BOID_MIN_SPEED`, `BOID_MAX_SPEED`, `FRICTION` | Movement — speed varies within a range and decays via friction rather than being held constant |
| `SEPARATION_*`, `ALIGNMENT_*`, `COHESION_*` | The three classic flocking rules — radius + weight per rule |
| `CENTERING_INNER_RADIUS`, `CENTERING_WEIGHT` | Gentle pull toward the arena's center, active only in the outer zone |
| `TANGENTIAL_DAMPING` | Extra drag on rotational motion near the boundary, to prevent flocks orbiting the wall |
| `WANDER_STRENGTH` | Small per-tick random nudge, for organic movement |
| `GRID_CELL_SIZE` | Spatial grid cell size, used to accelerate neighbor lookups |
| `SHOW_FPS` | Toggles the on-screen FPS counter |

## Why flocks don't orbit the boundary

Worth documenting, since it took real trial and error to get right: a
constant-speed boid under a steady inward force naturally settles into a
stable circular orbit (same reason satellites don't fall into planets).
Fixing this required several things working together, not any single
setting:

1. **Variable speed + friction** (instead of hard-normalizing to a fixed
   speed every tick) — lets steering forces actually dissipate momentum.
2. **Heading-blend boundary correction** (rather than an additive nudge) —
   an additive force barely affects boids grazing the wall tangentially;
   blending the heading directly corrects head-on and grazing approaches
   equally.
3. **Tangential damping**, active only in the outer zone — directly
   suppresses rotational motion around the center without affecting normal
   movement in the interior (applying it everywhere caused an unrelated bug:
   flocks pendulum-ing in a straight line through the center, since a
   straight path has almost no tangential component to begin with).
4. **Correct ordering in `doTick`** — the boundary correction must run
   *after* separation/alignment/cohesion are summed, or a large flock's
   average heading dilutes and overrides the correction in the same tick.

## Performance: spatial grid

`SpatialGrid` (in `spatialGrid.js`) buckets boids into cells by position each
tick, so neighbor queries only check nearby cells instead of every boid
against every other boid (O(n²) → roughly O(n) in practice). It's implemented
as a `Map` keyed by cell coordinates rather than a fixed 2D array, so empty
regions cost nothing — this scales to large, sparsely-populated maps as well
as small dense ones. `doTick` queries the grid once per boid (at the largest
of the three flocking radii) and shares that candidate list across
separation/alignment/cohesion, rather than querying three times per boid.

Flocking functions also compare **squared distances** where possible,
avoiding `Math.sqrt` for simple in-range checks (only separation needs the
actual distance, for its push-direction math).

## FPS monitor

Set `CONFIG.SHOW_FPS` to `true`/`false` to show/hide a small overlay in the
top-left showing rendered frames per second, averaged over a rolling window.
When disabled, no monitor is created at all — zero overhead.

## Deploying (e.g. GitHub Pages)

If deploying to a subfolder (rather than a domain root), add a
`vite.config.js` at the project root:

```js
export default {
  base: './',
};
```

This makes built asset paths relative, so the site works correctly no
matter what subfolder it's served from. Then:

```bash
npm run build
```

Copy the **contents** of the resulting `dist/` folder into your target
folder/repo. If serving from GitHub Pages, make sure a `.nojekyll` (empty)
file exists at the root of whatever GitHub Pages is configured to serve
from, to prevent Jekyll from interfering with the build output.

## Building your own project from this template

1. Tune `config.js`.
2. Replace the "DEMO SCENE" section in `main.js` (spawn logic, per-boid
   behavior functions, `doTick`) with your own state and simulation logic.
3. Update the drawing code inside `render()` for your own visuals.
4. Reuse `engine.js`, `viewport.js`, `spatialGrid.js`, and `fpsMonitor.js`
   as-is — none of them are specific to boids or to any particular visual
   style.

## Demo scene

The included demo is a boids flocking simulation: several hundred
triangular boids move within a circular boundary, following the three
classic rules (separation, alignment, cohesion) plus wander, edge-avoidance,
and the anti-orbiting measures described above.