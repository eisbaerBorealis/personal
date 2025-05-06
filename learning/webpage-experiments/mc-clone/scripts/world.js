import * as THREE from 'three';

const SQRT_3 = Math.sqrt(3);
const SQRT_4_3 = Math.sqrt(4/3);

const geometry = new THREE.CylinderGeometry(SQRT_4_3 / 2, SQRT_4_3 / 2, 1, 6);
const material = new THREE.MeshLambertMaterial({ color: 0x00d000});

export class World extends THREE.Group {
  /**
   * @type {{
   *    id: number,
   *    instanceId: number
   *  }[][][]}
   */
  data = [];

  constructor(size = { radius: 3, height: 2 }) {
    super();
    this.size = size;
  }

  generate() {
    this.generateTerrain();
    this.generateMeshes();
  }

  generateTerrain() {
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
          console.log(`    r: ${r}, diameter: ${diameter}, zDist: ${zDist}`);
          let newId = 1;
          if((x < (zDist / 2) - 0.5) || (x > diameter - (zDist / 2) - 1)) {
            row.push(null);
            console.log(`null at x: ${x}, y: ${y}, z: ${z}`);
          } else {
            row.push({
              id: newId,
              instanceId: null
            });
            console.log(`new block at x: ${x}, y: ${y}, z: ${z}`);
          }
        }
        slice.push(row);
      }
      this.data.push(slice);
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
    if (this.inBounds(x, y, z)) {
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
    const mesh = new THREE.InstancedMesh(geometry, material, maxCount);
    mesh.count = 0;
    const matrix = new THREE.Matrix4();

    for (let x = 0; x < diameter; x++) {
      for (let y = 0; y < this.size.height; y++) {
        for (let z = 0; z < diameter; z++) {
          const tempBlock = this.getBlock(x, y, z);
          if(tempBlock !== null) {
            const newBlockId = tempBlock.id;
            const newBlockInstanceId = mesh.count;

            if (newBlockId !== 0) {
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

              console.log(`x: ${x}, y: ${y}, z: ${z}`);
              console.log(`  x: ${voxelX}, y: ${voxelY}, z: ${voxelZ}`);
              console.log(`    Voxel ${mesh.count} set`);
            }
          }
        }
      }
    }

    this.add(mesh);
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
} // END class World