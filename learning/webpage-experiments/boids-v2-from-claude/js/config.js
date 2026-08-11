// ---------------------------------------------------------------
// config.js
//
// Single source of truth for tunable behavior.
// ---------------------------------------------------------------

export const CONFIG = {

  // --- Game loop -------------------------------------------------
  TICK_RATE: 60,

  // --- Viewport interaction ---------------------------------------
  ZOOM_ENABLED: true,
  PAN_ENABLED: true,
  ZOOM_MIN: 0.25,
  ZOOM_MAX: 4,
  ZOOM_SENSITIVITY: 0.0015,

  // --- Demo scene: circular boundary ----------------------------------
  BOUNDARY_CENTER_X: 500,
  BOUNDARY_CENTER_Y: 500,
  BOUNDARY_RADIUS: 700, // doubled from 350 — a diameter of 1400 exceeds a
                         // typical window's height, so the top/bottom
                         // require dragging to reach, while the width
                         // usually shows both left and right edges at once.
  BOUNDARY_STROKE_WIDTH: 10,
  BOUNDARY_MARGIN: 100,
  BOUNDARY_TURN_FACTOR: 1.0,

  // --- Boids ------------------------------------------------------------
  BOID_SPEED: 4,
  BOID_MIN_SPEED: 2,
  BOID_MAX_SPEED: 6,
  FRICTION: 0.04,
  BOID_COUNT: 300,
  BOID_COLOR: '#2277ff',
  // Triangle points "up" (toward -y) at rotation 0. Array of [x, y] pairs
  // relative to the boid's own center, drawn via ctx.lineTo in render().
  BOID_SHAPE: [
    [0, -10],
    [6, 7],
    [-6, 7],
  ],

  // --- Flocking: separation -------------------------------------------
  SEPARATION_RADIUS: 40,
  SEPARATION_WEIGHT: 0.6,

  // --- Flocking: alignment ----------------------------------------------
  ALIGNMENT_RADIUS: 80,
  ALIGNMENT_WEIGHT: 0.08,

  // --- Flocking: cohesion -------------------------------------------
  COHESION_RADIUS: 80,
  COHESION_WEIGHT: 0.01,

  // --- Global centering (keeps the flock roaming the interior, not
  //     orbiting the boundary) -----------------------------------------
  CENTERING_INNER_RADIUS: 0.55, // fraction of BOUNDARY_RADIUS with zero pull
  CENTERING_WEIGHT: 0.01,

  // --- Tangential damping (suppresses orbiting near the boundary) -------
  TANGENTIAL_DAMPING: 0.05,

  // --- Wander -----------------------------------------------------------
  WANDER_STRENGTH: 0.15,

  // --- Spatial grid -------------------------------------------------
  GRID_CELL_SIZE: 80,

  // --- Debug -----------------------------------------------------------
  SHOW_FPS: true,
};