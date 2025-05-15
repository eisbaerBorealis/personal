import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { blocks, resources } from './blocks';

export function setupUI(world/*, sunLight*/) {
  const gui = new GUI();

  gui.add(world.size, 'radius', 3, 64, 1).name('Radius');
  gui.add(world.size, 'height', 1, 64, 1).name('Height');

  const terrainFolder = gui.addFolder('Terrain');
  terrainFolder.add(world.params.terrain, 'active')
  terrainFolder.add(world.params, 'seed', 0, 10000).name('Seed');
  terrainFolder.add(world.params.terrain, 'scale', 10, 100).name('Scale');
  terrainFolder.add(world.params.terrain, 'magnitude', 0, 1).name('Magnitude');
  terrainFolder.add(world.params.terrain, 'offset', 0, 1).name('Offset');

  const resourcesFolder = gui.addFolder('Resources');

  const dirtFolder = resourcesFolder.addFolder('Dirt');
  dirtFolder.add(blocks.dirt, 'scarcity', 0, 1).name('Scarcity');
  dirtFolder.add(blocks.dirt, 'depth', 0, 1).name('Depth');
  dirtFolder.add(blocks.dirt.scale, 'x', 10, 100).name('X Scale');
  // dirtFolder.add(blocks.dirt.scale, 'y', 10, 100).name('Y Scale');
  dirtFolder.add(blocks.dirt.scale, 'z', 10, 100).name('Z Scale');

  resources.forEach(resource => {
    const resourceFolder = resourcesFolder.addFolder(resource.name);
    resourceFolder.add(resource, 'scarcity', 0, 1).name('Scarcity');
    resourceFolder.add(resource.scale, 'x', 10, 100).name('X Scale');
    resourceFolder.add(resource.scale, 'y', 10, 100).name('Y Scale');
    resourceFolder.add(resource.scale, 'z', 10, 100).name('Z Scale');
  });
/*
  const sunFolder = gui.addFolder('Sun');
  sunFolder.add(sunLight.position, 'x', -200, 200).name('X');
  sunFolder.add(sunLight.position, 'y', -200, 200).name('Y');
  sunFolder.add(sunLight.position, 'z', -200, 200).name('Z');
  sunFolder.add(sunLight.shadow.camera, 'left', -200, 200).name('Left');
  sunFolder.add(sunLight.shadow.camera, 'right', -200, 200).name('Right');
  sunFolder.add(sunLight.shadow.camera, 'bottom', -200, 200).name('Bottom');
  // sunFolder.add(sunLight.shadow.camera, 'near', -200, 200).name('Near');
  sunFolder.add(sunLight.shadow.camera, 'far', -200, 200).name('Far'); //*/

  // gui.add(world, 'generate');
  gui.onChange(() => {
    world.generate();
  })
}