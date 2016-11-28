<template>
  <section class="game">
    <div class="row"
         v-for="row in tiles">
      <div class="tile"
           v-for="tile in row"
           :class="tile.classes"
           @click="openTile(tile)">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      rows: 15,
      columns: 20,
      tiles: [],
    }
  },
  created() {
    this.initTiles();
  },
  methods: {
    initTiles() {
      this.tiles = new Array(this.rows).fill(0).map((row, rowIndex) => {
        return new Array(this.columns).fill(0).map((column, columnIndex) => {
          return {
            row: rowIndex,
            column: columnIndex,
            classes: [],
            mined: (Math.random() * 6 > 5),
          }
        })
      });
    },
    openAllMines() {
      this.tiles.forEach(row => {
        row.forEach(tile => {
          if (tile.mined) {
            this.openTile(tile, false);
          }
        });
      });
    },
    isOpened(tile) {
      if (tile.classes.indexOf('opened') < 0) {
        return false;
      } else {
        return true;
      }
    },
    openTile(tile, recursive=true) {
      // Only consider if the tile has not been touched
      if (!this.isOpened(tile)) {
        // Open the tile
        if (tile.classes.indexOf('opened') < 0) {
          tile.classes.push('opened');
        }

        if (tile.mined) {
          tile.classes.push('mined');
          this.openAllMines();
          return;
        }
  
        let neighbors = this.collectNeighbors(tile);
        let neighboringMines = this.countMines(neighbors);
        if (neighboringMines > 0) {
          let warningKey = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight'};
          tile.classes.push(warningKey[neighboringMines]);
          return;
        } else {
          // Should continue opening tiles recursively
          recursive = true;
        }
        
        // Open tiles recursively
        if (recursive) {
          neighbors.forEach((neighborTile) => {
            // Do not open next neighbor recursively by default
            // It will check if it should during next pass
            // Open with timeout for looks :)
            var vm = this;
            setTimeout(() => {
              vm.openTile(neighborTile, false);
            }, 2);
          });
        }
      }
    },
    collectNeighbors(tile) {
      // [[x, y]] relative coordinates
      const adjacentPositions = [[-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0]];
      let neighbors = [];
      
      adjacentPositions.forEach((position) => {
        let shiftRow = position[0];
        let shiftColumn = position[1];
        let row = tile.row + shiftRow;
        let column = tile.column + shiftColumn;

        if (this.findTile(row, column)) {
          neighbors.push(this.findTile(row,column));
        }
      });

      return neighbors;
    },
    findTile(row, column) {
      if (row < this.rows && row >= 0 && column < this.columns && column >= 0) {
        return this.tiles[row][column];
      } else {
        return false;
      }
    },
    countMines(tileArray) {
      let count = 0;
      tileArray.forEach((tile) => {
        if (tile.mined) {
          count++;
        }
      });
      return count;
    },
  },
}
</script>