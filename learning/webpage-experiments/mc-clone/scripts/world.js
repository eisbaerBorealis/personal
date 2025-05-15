import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';
import { RNG } from './rng';
import { blocks, resources } from './blocks';

const SQRT_3 = Math.sqrt(3);
const SQRT_4_3 = Math.sqrt(4/3);

const geometry = new THREE.CylinderGeometry(SQRT_4_3 / 2, SQRT_4_3 / 2, 1, 6);

export class World extends THREE.Group {
  /**
   * @type {{
   *    id: number,
   *    instanceId: number
   *  }[][][]}
   */
  data = [];

  // old: 0, 30, 0.5, 0.2
  // fav: 0, 40, 0.2, 0.8
  // v0.1.3: 
  params = {
    seed: 0,
    terrain: {
      active: true,
      scale: 50,
      magnitude: 0.35,
      offset: 0.50,
    }
  }

  // old: 16, 12
  // fav: 64, 64
  // v0.1.3: 
  constructor(size = { radius: 40, height: 32 }) {
    super();
    this.size = size;
  }

  generate() {
    const rng1 = new RNG(this.params.seed);
    const rng2 = new RNG(this.params.seed + 1);
    this.initializeTerrain();
    if(this.params.terrain.active) {
      this.generateTerrain(rng1);
    }
    this.generateResources(rng2);
    this.generateMeshes();
  }

  /**
   * Initializing the world terrain data as air
   */
  initializeTerrain() {
    this.data = [];

    let r = this.size.radius;
    let diameter = r * 2 - 1;
    let center = r - 1;
    
    for (let x = 0; x < diameter; x++) {
      const slice = [];
      for (let y = 0; y < this.size.height; y++) {
        const row = [];
        for (let z = 0; z < diameter; z++) {
          let zDist = Math.abs(center - z);
          if((x < (zDist / 2) - 0.5) || (x > diameter - (zDist / 2) - 1)) {
            row.push(null);
          } else {
            row.push({
              id: blocks.air.id,
              instanceId: null
            });
          }
        }
        slice.push(row);
      }
      this.data.push(slice);
    }
  }

  generateTerrain(rng) {
    const simplex = new SimplexNoise(rng);
    let d = this.size.radius * 2 - 1;
    for (let x = 0; x < d; x++) {
      for (let z = 0; z < d; z++) {
        // Compute the noise value at this x-z location
        const value = simplex.noise(
          x / this.params.terrain.scale,
          z / this.params.terrain.scale
        );
        // Scale the noise based on the magnitude/offset
        const scaledNoise = this.params.terrain.offset + this.params.terrain.magnitude * value;

        // Computing the height of the terrain at this x-z location
        let height = Math.round(this.size.height * scaledNoise);

        // Clamping height between 0 and max height
        height = Math.max(0, Math.min(height, this.size.height - 1));
        
        for (let y = 0; y <= this.size.height; y++) {
          if (y <= height) {
            this.setBlockId(x, y, z, blocks.stone.id);
          }
        }
      }
    }
  }

  generateResources(rng) {
    let d = this.size.radius * 2 - 1;
    let h = this.size.height;

    const simplex = new SimplexNoise(rng);
    for (let x = 0; x < d; x++) {
      for (let z = 0; z < d; z++) {
        let maxHeight = 0;
        if(this.params.terrain.active) {
          for (let y = 0; y < h; y++) {
            if(this.getBlock(x, y, z) !== null && this.getBlock(x, y, z).id === blocks.air.id) {
              maxHeight = y - 1;
              y = h;
            }
          }
        }
        if ( maxHeight === 0) { maxHeight = h - 1;}

        for (let y = 0; y < h; y++) {
          if(this.params.terrain.active) {
            const value = simplex.noise(
              x / blocks.dirt.scale.x,
              z / blocks.dirt.scale.z) / 2 + 0.5;
            if ((maxHeight * (1 - blocks.dirt.depth)) <= y && this.getBlock(x, y, z) != null && this.getBlock(x, y, z).id === blocks.stone.id && value < 1 - blocks.dirt.scarcity) {
              if (y === h - 1 || this.getBlock(x, y+1, z).id === blocks.air.id) {
                this.setBlockId(x, y, z, blocks.grass.id);
              } else {
                this.setBlockId(x, y, z, blocks.dirt.id);
              }
              
            }

            resources.forEach(resource => {
              const value = simplex.noise3d(
                x / resource.scale.x,
                y / resource.scale.y,
                z / resource.scale.z);
              if (this.data[x] != null && value > resource.scarcity && this.getBlock(x, y, z) != null && this.getBlock(x, y, z).id === blocks.stone.id &&
                  y >= resource.range.min * h &&  y <= resource.range.max * h) {
                this.setBlockId(x, y, z, resource.id);
              }
            });
          } else {
            resources.forEach(resource => {
              const value = simplex.noise3d(
                x / resource.scale.x,
                y / resource.scale.y,
                z / resource.scale.z);
              if (this.data[x] != null && value > resource.scarcity &&
                  y >= resource.range.min * h &&  y <= resource.range.max * h) {
                this.setBlockId(x, y, z, resource.id);
              }
            });
          }
        }
      }
    }
  }

  /**
   * Gets the block data at (x, y, z)
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {{id: number, instanceId: number}}
   */
  getBlock(x, y, z) {
    if (this.inBounds(x, y, z) && this.data[x] !== undefined) { // I don't know why this was sometimes inbounds but data[x] was undefined...
      return this.data[x][y][z];
    } else {
      return null;
    }
  }

  /**
   * Sets the block id for the block at (x, y, z)
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} id
   */
  setBlockId(x, y, z, newId) {
    if (this.inBounds(x, y, z) && this.data[x][y][z] !== null) {
      this.data[x][y][z].id = newId;
    }
  }

  /**
   * Sets the block instance id for the block at (x, y, z)
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} instanceId
   */
  setBlockInstanceId(x, y, z, newInstanceId) {
    if (this.inBounds(x, y, z) && this.data[x][y][z] !== null) {
      this.data[x][y][z].instanceId = newInstanceId;
    }
  }

  generateMeshes() {
    this.clear();
    let r = this.size.radius;
    let diameter = r * 2 - 1;
    const maxCount = diameter * diameter * this.size.height;

    const meshes = {};
    Object.values(blocks)
      .filter(blockType => blockType.id !== blocks.air.id)
      .forEach(blockType => {
        const mesh = new THREE.InstancedMesh(geometry, blockType.material, maxCount);
        mesh.name = blockType.name;
        mesh.count = 0;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        meshes[blockType.id] = mesh;
      });

    const matrix = new THREE.Matrix4();

    for (let x = 0; x < diameter; x++) {
      for (let y = 0; y < this.size.height; y++) {
        for (let z = 0; z < diameter; z++) {
          const tempBlock = this.getBlock(x, y, z);

          if(tempBlock !== null && !this.isBlockObscured(x, y, z)) {
            const newBlockId = tempBlock.id;

            if (newBlockId !== 0) {
              const mesh = meshes[newBlockId];
              const newBlockInstanceId = mesh.count;

              let voxelX = x - r + 1;
              let voxelY = y + Math.random() * 0.0;
              let voxelZ = z - r + 1;

              if (Math.abs(voxelZ % 2) === 1) {
                voxelX += 0.5;
              }

              voxelZ *= SQRT_3 / 2;

              matrix.setPosition(voxelX, voxelY, voxelZ);

              mesh.setMatrixAt(newBlockInstanceId, matrix);
              this.setBlockInstanceId(x, y, z, newBlockInstanceId);
              mesh.count++;
            }
          }
        }
      }
    }

    // this.add(mesh);
    this.add(...Object.values(meshes));
  }

  /**
   * Checks if the (x, y, z) coordinates are within bounds
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {boolean}
   */
  inBounds(x, y, z) {
    let diameter = this.size.radius * 2 + 1;
    return (x >= 0 && x < diameter && y >= 0 && y < this.size.height && z >= 0 && z < diameter);
  }

  /**
   * Checks whether the block has neighboring blocks on all eight sides
   * @param {number} x 
   * @param {number} y 
   * @param {number} z
   * @returns {boolean}
   */
  isBlockObscured (x, y, z) {
    let r = this.size.radius;
    let diagOffset = 1;
    if(r % 2 !== z % 2) { // if r and z are both odd or both even, keep offset 1
      diagOffset = -1;
    }

    let isObscured = true;

    if(isObscured && (this.getBlock(x-1, y, z) == null ||
        this.getBlock(x-1, y, z).id === blocks.air.id )) {
      isObscured = false;
    }
    if(isObscured && (this.getBlock(x+1, y, z) == null ||
        this.getBlock(x+1, y, z).id === blocks.air.id)) {
      isObscured = false;
    }
    if(isObscured && (this.getBlock(x, y-1, z) == null ||
        this.getBlock(x, y-1, z).id === blocks.air.id)) {
      isObscured = false;
    }
    if(isObscured && (this.getBlock(x, y+1, z) == null ||
        this.getBlock(x, y+1, z).id === blocks.air.id)) {
      isObscured = false;
    }
    if(isObscured && (this.getBlock(x, y, z-1) == null ||
        this.getBlock(x, y, z-1).id === blocks.air.id)) {
      isObscured = false;
    }
    if(isObscured && (this.getBlock(x, y, z+1) == null ||
        this.getBlock(x, y, z+1).id === blocks.air.id)) {
      isObscured = false;
    }
    if(isObscured && (this.getBlock(x+diagOffset, y, z-1) == null ||
        this.getBlock(x+diagOffset, y, z-1).id === blocks.air.id)) {
      isObscured = false;
    }
    if(isObscured && (this.getBlock(x+diagOffset, y, z+1) == null ||
        this.getBlock(x+diagOffset, y, z+1).id === blocks.air.id)) {
      isObscured = false;
    }

    return isObscured;
  }

} // END class World