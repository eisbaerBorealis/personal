// original from https://medium.com/@necsoft/three-js-101-hello-world-part-1-443207b1ebe1
// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

const greenMetal = '#0e6947';
const orangeMetal = '#e65a09';

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
// var geometry = new THREE.BoxGeometry( .3, .3, 3 );
// var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
// var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
// scene.add( cube );
// cube.position.x = 1;

// Render Loop
var render = function () {
  requestAnimationFrame( render );
  // cube.position.z += 0.01;
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();

// console.log('camera position is ' + camera.position.x + ', ' + camera.position.y + ', ' + camera.position.z);
// console.log('cube position is ' + cube.position.x + ', ' + cube.position.y + ', ' + cube.position.z);