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
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-40, 60, -40); // was -32, 16, -32, then -80, 120, -80

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.update();

// Lights setup
const ambient = new THREE.AmbientLight();
ambient.intensity = 0.1;

const sunLight = new THREE.DirectionalLight();
sunLight.castShadow = true;
sunLight.position.set(40, 80, 40);
sunLight.target.position.set(0, 30, 0);
sunLight.shadow.camera.left = -64;
sunLight.shadow.camera.right = 64;
sunLight.shadow.camera.bottom = -64;
sunLight.shadow.camera.top = 64;
sunLight.shadow.camera.near = 0.1;
sunLight.shadow.camera.far = 150;
sunLight.shadow.bias = -0.0005;

// Scene setup
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

// scene.add(cube);
scene.add(ambient);
scene.add(sunLight);
scene.add(sunLight.target);

// const shadowHelper = new THREE.CameraHelper(sunLight.shadow.camera);
// scene.add(shadowHelper);

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