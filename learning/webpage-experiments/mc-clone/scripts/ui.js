import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export function setupUI(world) {
  const gui = new GUI();

  gui.add(world.size, 'radius', 3, 64, 1).name('Width');
  gui.add(world.size, 'height', 1, 64, 1).name('Height');

  // gui.add(world, 'generate');
  gui.onChange(() => {
    world.generate();
  })
}