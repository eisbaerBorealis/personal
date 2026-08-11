// ---------------------------------------------------------------
// spatialGrid.js
//
// A generic spatial hash grid for fast "who's near this point?"
// queries, used to avoid checking every object against every other
// object (O(n²)) each tick.
//
// Cells are stored in a Map keyed by "cellX,cellY" rather than a fixed
// 2D array, so empty regions cost nothing — this scales fine to large,
// sparsely-populated worlds, not just small dense ones.
//
// Usage each tick:
//   grid.build(items);                       // items must have .x, .y
//   const nearby = grid.queryRadius(x, y, r); // candidates within r
//                                             // (caller should still
//                                             //  check exact distance —
//                                             //  this returns everything
//                                             //  in the covering cells,
//                                             //  which is a superset)
// ---------------------------------------------------------------

export class SpatialGrid {
  /** @param {number} cellSize - should be roughly the size of your
   *  typical query radius; too small = many cells to scan, too large =
   *  many irrelevant candidates per cell. */
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cells = new Map();
  }

  _cellCoord(value) {
    return Math.floor(value / this.cellSize);
  }

  _key(cellX, cellY) {
    return `${cellX},${cellY}`;
  }

  /** Clears and re-buckets every item. Call once per tick, before any
   *  queries — grids don't auto-update as items move. */
  build(items) {
    this.cells.clear();
    for (const item of items) {
      const key = this._key(this._cellCoord(item.x), this._cellCoord(item.y));
      let bucket = this.cells.get(key);
      if (!bucket) {
        bucket = [];
        this.cells.set(key, bucket);
      }
      bucket.push(item);
    }
  }

  /** Returns all items in cells overlapping a (x±radius, y±radius) box.
   *  This is a candidate list, not an exact-radius result — cheap to
   *  compute, but callers doing precise circular queries should still
   *  filter by actual distance. */
  queryRadius(x, y, radius) {
    const minCX = this._cellCoord(x - radius);
    const maxCX = this._cellCoord(x + radius);
    const minCY = this._cellCoord(y - radius);
    const maxCY = this._cellCoord(y + radius);

    const results = [];
    for (let cx = minCX; cx <= maxCX; cx++) {
      for (let cy = minCY; cy <= maxCY; cy++) {
        const bucket = this.cells.get(this._key(cx, cy));
        if (bucket) {
          for (let i = 0; i < bucket.length; i++) {
            results.push(bucket[i]);
          }
        }
      }
    }
    return results;
  }
}