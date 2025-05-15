import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

function loadTexture(path) {
  const texture = textureLoader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
}

const textures = {
  coal_ore: loadTexture('textures/coal_ore.png'),
  coal_ore_side: loadTexture('textures/coal_ore_side.png'),
  diamond_ore: loadTexture('textures/diamond_ore.png'),
  diamond_ore_side: loadTexture('textures/diamond_ore_side.png'),
  dirt: loadTexture('textures/dirt.png'),
  dirt_side: loadTexture('textures/dirt_side.png'),
  grass_side: loadTexture('textures/grass_side.png'),
  grass_top: loadTexture('textures/grass_top.png'),
  iron_ore: loadTexture('textures/iron_ore.png'),
  iron_ore_side: loadTexture('textures/iron_ore_side.png'),
  stone: loadTexture('textures/stone.png'),
  stone_side: loadTexture('textures/stone_side.png'),
}

export const blocks = {
  air: {
    id: 0,
    name: 'air'
  },
  stone: {
    id: 1,
    name: 'stone',
    // color: 0x8c95a3,
    material: [
      new THREE.MeshLambertMaterial({ map: textures.stone_side}), // side
      new THREE.MeshLambertMaterial({ map: textures.stone}),      // top
      new THREE.MeshLambertMaterial({ map: textures.stone}),      // bottom
    ]
  },
  grass: {
    id: 2,
    name: 'grass',
    // color: 0x1f691c,
    material: [
      new THREE.MeshLambertMaterial({ map: textures.grass_side}), // side
      new THREE.MeshLambertMaterial({ map: textures.grass_top}),  // top
      new THREE.MeshLambertMaterial({ map: textures.dirt}),       // bottom
    ]
  },
  dirt: {
    id: 3,
    name: 'dirt',
    // color: 0x755219,
    scale: {x: 30,/* y: 30,*/ z: 30},
    depth: 0.2,
    scarcity: 0.05,
    material: [
      new THREE.MeshLambertMaterial({ map: textures.dirt_side}), // side
      new THREE.MeshLambertMaterial({ map: textures.dirt}),      // top
      new THREE.MeshLambertMaterial({ map: textures.dirt}),      // bottom
    ]
  },
  coal_ore: {
    id: 4,
    name: 'coal_ore',
    // color: 0x2E2E2E,
    scale: {x: 20, y: 20, z: 20},
    scarcity: 0.8,
    range: {min: 0.2, max: 1.0},
    material: [
      new THREE.MeshLambertMaterial({ map: textures.coal_ore_side}), // side
      new THREE.MeshLambertMaterial({ map: textures.coal_ore}),      // top
      new THREE.MeshLambertMaterial({ map: textures.coal_ore}),      // bottom
    ]
  },
  iron_ore: {
    id: 5,
    name: 'iron_ore',
    // color: 0xC09F86,
    scale: {x: 15, y: 15, z: 15},
    scarcity: 0.9,
    range: {min: 0.1, max: 0.5},
    material: [
      new THREE.MeshLambertMaterial({ map: textures.iron_ore_side}), // side
      new THREE.MeshLambertMaterial({ map: textures.iron_ore}),      // top
      new THREE.MeshLambertMaterial({ map: textures.iron_ore}),      // bottom
    ]
  },
  diamond_ore: {
    id: 6,
    name: 'diamond_ore',
    // color: 0x65CCFF,
    scale: {x: 12, y: 5, z: 12},
    scarcity: 0.95,
    range: {min: 0.0, max: 0.25},
    material: [
      new THREE.MeshLambertMaterial({ map: textures.diamond_ore_side}), // side
      new THREE.MeshLambertMaterial({ map: textures.diamond_ore}),      // top
      new THREE.MeshLambertMaterial({ map: textures.diamond_ore}),      // bottom
    ]
  },
}

export const resources = [
  blocks.coal_ore,
  blocks.iron_ore,
  blocks.diamond_ore
]