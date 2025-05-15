export const blocks = {
  air: {
    id: 0,
    name: 'air'
  },
  stone: {
    id: 1,
    name: 'stone',
    color: 0x8c95a3
  },
  grass: {
    id: 2,
    name: 'grass',
    color: 0x1f691c
  },
  dirt: {
    id: 3,
    name: 'dirt',
    color: 0x755219,
    scale: {x: 30,/* y: 30,*/ z: 30},
    depth: 0.2,
    scarcity: 0.05
  },
  coal_ore: {
    id: 4,
    name: 'coal_ore',
    color: 0x2E2E2E,
    scale: {x: 20, y: 20, z: 20},
    scarcity: 0.8,
    range: {min: 0.2, max: 1.0}
  },
  iron_ore: {
    id: 5,
    name: 'iron_ore',
    color: 0xC09F86,
    scale: {x: 15, y: 15, z: 15},
    scarcity: 0.9,
    range: {min: 0.1, max: 0.5}
  },
  diamond_ore: {
    id: 6,
    name: 'diamond_ore',
    color: 0x65CCFF,
    scale: {x: 12, y: 5, z: 12},
    scarcity: 0.95,
    range: {min: 0.0, max: 0.25}
  },
}

export const resources = [
  blocks.coal_ore,
  blocks.iron_ore,
  blocks.diamond_ore
]