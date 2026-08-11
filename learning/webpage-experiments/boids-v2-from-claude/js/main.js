// ---------------------------------------------------------------
// main.js
//
// Entry point. Sets up the canvas, wires together config/engine/
// viewport, and defines the demo boids scene.
// ---------------------------------------------------------------

import { CONFIG } from './config.js';
import { GameEngine } from './engine.js';
import { initViewport } from './viewport.js';
import { SpatialGrid } from './spatialGrid.js';
import { FPSMonitor } from './fpsMonitor.js';

// --- Canvas setup -----------------------------------------------------
const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

/** Resizes the canvas's actual pixel buffer to match the window size,
 *  accounting for devicePixelRatio so drawing stays crisp on high-DPI
 *  screens. CSS (width/height: 100%) handles the on-screen display size
 *  separately — this only controls the backing resolution. */
function resizeCanvasToWindow() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
}
resizeCanvasToWindow();
window.addEventListener('resize', resizeCanvasToWindow);

// --- Viewport (zoom / pan) ---------------------------------------------
const viewport = initViewport(canvas, CONFIG);

// Center the camera on the boundary's center at startup. Since
// BOUNDARY_RADIUS (700) gives a diameter larger than a typical window's
// height but smaller than its width, this means the circle's left/right
// edges are visible immediately, while the top/bottom require dragging
// to reach — by design.
viewport.setState({
  scale: 1,
  translateX: window.innerWidth / 2 - CONFIG.BOUNDARY_CENTER_X,
  translateY: window.innerHeight / 2 - CONFIG.BOUNDARY_CENTER_Y,
});

// ===========================================================================
// DEMO SCENE: many boids flocking inside a circular boundary.
// ===========================================================================

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

/** Creates one boid's state at a random point inside the boundary circle
 *  with a random initial heading. No DOM element to create anymore —
 *  boids are pure data, drawn fresh each frame in render(). */
function spawnBoid() {
  const angle = randomRange(0, Math.PI * 2);
  const radius = Math.sqrt(Math.random()) * (CONFIG.BOUNDARY_RADIUS - CONFIG.BOUNDARY_MARGIN);
  const x = CONFIG.BOUNDARY_CENTER_X + Math.cos(angle) * radius;
  const y = CONFIG.BOUNDARY_CENTER_Y + Math.sin(angle) * radius;
  const heading = randomRange(0, Math.PI * 2);

  return {
    x,
    y,
    vx: Math.cos(heading) * CONFIG.BOID_SPEED,
    vy: Math.sin(heading) * CONFIG.BOID_SPEED,
  };
}

const boids = Array.from({ length: CONFIG.BOID_COUNT }, spawnBoid);
const grid = new SpatialGrid(CONFIG.GRID_CELL_SIZE);

const SEPARATION_RADIUS_SQ = CONFIG.SEPARATION_RADIUS ** 2;
const ALIGNMENT_RADIUS_SQ = CONFIG.ALIGNMENT_RADIUS ** 2;
const COHESION_RADIUS_SQ = CONFIG.COHESION_RADIUS ** 2;

function applySeparation(b, candidates) {
  let pushX = 0;
  let pushY = 0;
  let neighborCount = 0;

  for (const other of candidates) {
    if (other === b) continue;

    const dx = b.x - other.x;
    const dy = b.y - other.y;
    const distSq = dx * dx + dy * dy;

    if (distSq > 0 && distSq < SEPARATION_RADIUS_SQ) {
      const dist = Math.sqrt(distSq);
      pushX += dx / dist / dist;
      pushY += dy / dist / dist;
      neighborCount++;
    }
  }

  if (neighborCount > 0) {
    b.vx += pushX * CONFIG.SEPARATION_WEIGHT;
    b.vy += pushY * CONFIG.SEPARATION_WEIGHT;
  }
}

function applyAlignment(b, candidates) {
  let avgVx = 0;
  let avgVy = 0;
  let neighborCount = 0;

  for (const other of candidates) {
    if (other === b) continue;

    const dx = b.x - other.x;
    const dy = b.y - other.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < ALIGNMENT_RADIUS_SQ) {
      avgVx += other.vx;
      avgVy += other.vy;
      neighborCount++;
    }
  }

  if (neighborCount > 0) {
    avgVx /= neighborCount;
    avgVy /= neighborCount;
    b.vx += (avgVx - b.vx) * CONFIG.ALIGNMENT_WEIGHT;
    b.vy += (avgVy - b.vy) * CONFIG.ALIGNMENT_WEIGHT;
  }
}

function applyCohesion(b, candidates) {
  let avgX = 0;
  let avgY = 0;
  let neighborCount = 0;

  for (const other of candidates) {
    if (other === b) continue;

    const dx = b.x - other.x;
    const dy = b.y - other.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < COHESION_RADIUS_SQ) {
      avgX += other.x;
      avgY += other.y;
      neighborCount++;
    }
  }

  if (neighborCount > 0) {
    avgX /= neighborCount;
    avgY /= neighborCount;
    b.vx += (avgX - b.x) * CONFIG.COHESION_WEIGHT;
    b.vy += (avgY - b.y) * CONFIG.COHESION_WEIGHT;
  }
}

function applyGlobalCentering(b) {
  const distFromCenter = distance(
    b.x, b.y,
    CONFIG.BOUNDARY_CENTER_X, CONFIG.BOUNDARY_CENTER_Y
  );
  const innerRadius = CONFIG.BOUNDARY_RADIUS * CONFIG.CENTERING_INNER_RADIUS;

  if (distFromCenter <= innerRadius) return;

  const towardCenterX = CONFIG.BOUNDARY_CENTER_X - b.x;
  const towardCenterY = CONFIG.BOUNDARY_CENTER_Y - b.y;
  const excess = (distFromCenter - innerRadius) / (CONFIG.BOUNDARY_RADIUS - innerRadius);

  b.vx += towardCenterX / distFromCenter * excess * CONFIG.CENTERING_WEIGHT;
  b.vy += towardCenterY / distFromCenter * excess * CONFIG.CENTERING_WEIGHT;
}

function steerTowardCenterIfNearEdge(b) {
  const distFromCenter = distance(
    b.x, b.y,
    CONFIG.BOUNDARY_CENTER_X, CONFIG.BOUNDARY_CENTER_Y
  );
  const distFromEdge = CONFIG.BOUNDARY_RADIUS - distFromCenter;

  if (distFromEdge >= CONFIG.BOUNDARY_MARGIN) return;

  const urgency = 1 - Math.max(distFromEdge, 0) / CONFIG.BOUNDARY_MARGIN;

  const towardCenterX = CONFIG.BOUNDARY_CENTER_X - b.x;
  const towardCenterY = CONFIG.BOUNDARY_CENTER_Y - b.y;
  const towardCenterDist = Math.hypot(towardCenterX, towardCenterY) || 1;
  const currentSpeed = Math.hypot(b.vx, b.vy) || CONFIG.BOID_SPEED;

  const desiredVx = (towardCenterX / towardCenterDist) * currentSpeed;
  const desiredVy = (towardCenterY / towardCenterDist) * currentSpeed;

  const blendAmount = urgency * CONFIG.BOUNDARY_TURN_FACTOR;

  b.vx = b.vx * (1 - blendAmount) + desiredVx * blendAmount;
  b.vy = b.vy * (1 - blendAmount) + desiredVy * blendAmount;
}

function applyTangentialDamping(b) {
  const toBoidX = b.x - CONFIG.BOUNDARY_CENTER_X;
  const toBoidY = b.y - CONFIG.BOUNDARY_CENTER_Y;
  const distFromCenter = Math.hypot(toBoidX, toBoidY);

  const innerRadius = CONFIG.BOUNDARY_RADIUS * CONFIG.CENTERING_INNER_RADIUS;
  if (distFromCenter <= innerRadius) return;

  const excess = (distFromCenter - innerRadius) / (CONFIG.BOUNDARY_RADIUS - innerRadius);
  const damping = CONFIG.TANGENTIAL_DAMPING * excess;

  const radialX = toBoidX / distFromCenter;
  const radialY = toBoidY / distFromCenter;

  const radialSpeed = b.vx * radialX + b.vy * radialY;
  const radialVx = radialSpeed * radialX;
  const radialVy = radialSpeed * radialY;

  const tangentialVx = b.vx - radialVx;
  const tangentialVy = b.vy - radialVy;

  b.vx = radialVx + tangentialVx * (1 - damping);
  b.vy = radialVy + tangentialVy * (1 - damping);
}

function applyWander(b) {
  const angle = Math.random() * Math.PI * 2;
  b.vx += Math.cos(angle) * CONFIG.WANDER_STRENGTH;
  b.vy += Math.sin(angle) * CONFIG.WANDER_STRENGTH;
}

function applyFriction(b) {
  b.vx *= 1 - CONFIG.FRICTION;
  b.vy *= 1 - CONFIG.FRICTION;
}

function clampSpeed(b, minSpeed, maxSpeed) {
  const currentSpeed = Math.hypot(b.vx, b.vy);
  if (currentSpeed === 0) return;

  if (currentSpeed < minSpeed) {
    const scale = minSpeed / currentSpeed;
    b.vx *= scale;
    b.vy *= scale;
  } else if (currentSpeed > maxSpeed) {
    const scale = maxSpeed / currentSpeed;
    b.vx *= scale;
    b.vy *= scale;
  }
}

/** Velocity vector -> rotation in radians, for a shape that points "up"
 *  (-y) at rotation 0. Canvas rotation is radians, not degrees. */
function headingRadians(b) {
  return Math.atan2(b.vy, b.vx) + Math.PI / 2;
}

function doTick(tickCount) {
  grid.build(boids);

  const maxNeighborRadius = Math.max(
    CONFIG.SEPARATION_RADIUS,
    CONFIG.ALIGNMENT_RADIUS,
    CONFIG.COHESION_RADIUS
  );

  for (const b of boids) {
    const neighbors = grid.queryRadius(b.x, b.y, maxNeighborRadius);

    applyGlobalCentering(b);
    applySeparation(b, neighbors);
    applyAlignment(b, neighbors);
    applyCohesion(b, neighbors);
    applyWander(b);
    steerTowardCenterIfNearEdge(b);
    applyTangentialDamping(b);
    applyFriction(b);
    clampSpeed(b, CONFIG.BOID_MIN_SPEED, CONFIG.BOID_MAX_SPEED);

    b.x += b.vx;
    b.y += b.vy;
  }
}

// ===========================================================================
// Rendering
// ===========================================================================

let fpsMonitor = null;
if (CONFIG.SHOW_FPS) {
  fpsMonitor = new FPSMonitor();
  fpsMonitor.mount();
}

function render() {
  const dpr = window.devicePixelRatio || 1;

  // Background: always fully black regardless of camera position, drawn
  // in raw screen space BEFORE the camera transform is applied — this is
  // what makes the void outside the boundary circle black too, not just
  // the circle's interior.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

  // Apply the camera (pan/zoom). setTransform is absolute (not
  // cumulative), so resetting to the dpr matrix and layering the camera
  // on top is safe to do fresh every frame.
  const camera = viewport.getState();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.translate(camera.translateX, camera.translateY);
  ctx.scale(camera.scale, camera.scale);

  // Boundary circle
  ctx.beginPath();
  ctx.arc(CONFIG.BOUNDARY_CENTER_X, CONFIG.BOUNDARY_CENTER_Y, CONFIG.BOUNDARY_RADIUS, 0, Math.PI * 2);
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = CONFIG.BOUNDARY_STROKE_WIDTH;
  ctx.stroke();

  // Boids
  ctx.fillStyle = CONFIG.BOID_COLOR;
  for (const b of boids) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(headingRadians(b));

    ctx.beginPath();
    const [first, ...rest] = CONFIG.BOID_SHAPE;
    ctx.moveTo(first[0], first[1]);
    for (const point of rest) ctx.lineTo(point[0], point[1]);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  if (fpsMonitor) fpsMonitor.recordFrame();
}

// ===========================================================================
// Startup
// ===========================================================================

const engine = new GameEngine(CONFIG.TICK_RATE, doTick);
engine.start();

// Rendering now runs in its OWN requestAnimationFrame loop, decoupled from
// doTick(). This is more correct than the SVG version's approach (which
// called render() from inside doTick()): if the engine ever needs to run
// multiple catch-up ticks in one frame, we still only want to redraw once
// per actual displayed frame, not once per tick.
function renderLoop() {
  render();
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

window.__engine = engine;