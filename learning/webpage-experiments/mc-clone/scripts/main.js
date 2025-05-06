import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { World } from './world';
import { setupUI } from './ui';

const stats = new Stats();
document.body.append(stats.dom);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32, 16, -32); // wide angle for big terrain
// camera.position.set(0, 5, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
// controls.target.set(0, 0, 0);
controls.update();

// Lights setup
const ambient = new THREE.AmbientLight();
ambient.intensity = 0.1;

const light1 = new THREE.DirectionalLight();
light1.position.set(1, 1, 1);

const light2 = new THREE.DirectionalLight();
light2.position.set(-1, 1, -0.5);

// Scene setup
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

// scene.add(cube);
scene.add(ambient);
scene.add(light1);
scene.add(light2);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

// On window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// initialize
setupUI(world);
animate();