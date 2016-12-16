<template>
  <section class="game" oncontextmenu="return false;">
    <div class="row"
         v-for="row in tiles">
      <div class="tile"
           v-for="tile in row"
           :class="[tile.classes, {'flagged': tile.flagged}]"
           @click="openTile(tile, true)"
           @contextmenu="flagTile(tile)">
      </div>
    </div>
    <transition name="fade">
      <section class="game-over" v-if="gameOver">
        <span v-if="gameWon">YOU WON!!</span>
        <span v-else>GAME OVER</span>

        <button @click="newGame">Play Again</button>
      </section>
    </transition>
  </section>
</template>

<script>
export default {
  props: [
    'rows', 
    'columns', 
    'tiles',
    'gameOver',
    'firstPlay',
  ],
  data() {
    return {
      gameWon: false
    }
  },
  methods: {
    openAllMines() {
      this.tiles.forEach(row => {
        row.forEach(tile => {
          if (tile.mined) {
            // this.openTile(tile, false);
            tile.classes.push('mined');
          }
        });
      });
    },
    checkWin() {
      let status = true;
      this.tiles.forEach(row => {
        row.forEach(tile => {
          if (!this.isOpened(tile) && !tile.mined) {
            status = false;
          }
        });
      });
      return status;
    },
    isOpened(tile) {
      if (tile.classes.indexOf('opened') < 0) {
        return false;
      } else {
        return true;
      }
    },
    flagTile(tile) {
      tile.flagged = !tile.flagged;
    },
    openTile(tile, recursive=false) {
      if (this.firstPlay) {
        this.newGame();
        return;
      }

      // Only consider if the tile has not been touched
      if (!this.isOpened(tile) && !this.gameOver) {
        // Open the tile
        if (tile.classes.indexOf('opened') < 0) {
          tile.classes.push('opened');
        }

        if (this.checkWin()) {
          this.gameWon = true;
          this.$emit('gameIsOver');
        }

        if (tile.mined) {
          tile.classes.push('mined');
          this.$emit('gameIsOver');
          this.openAllMines();
          return;
        }
  
        let neighbors = this.collectNeighbors(tile);
        let neighboringMines = this.countMines(neighbors);
        let noNeighboringMines = false;
        if (neighboringMines > 0) {
          let warningKey = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight'};
          tile.classes.push(warningKey[neighboringMines]);
          return;
        } else {
          // Should continue opening tiles recursively
          noNeighboringMines = true;
        }
        
        // Open tiles recursively
        if (noNeighboringMines && recursive) {
          neighbors.forEach((neighborTile) => {
            // Do not open next neighbor recursively by default
            // It will check if it should during next pass
            // Open with timeout for looks :)
            var vm = this;
            setTimeout(() => {
              vm.openTile(neighborTile, true);
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
    newGame() {
      this.gameWon = false;
      this.$emit('newGame');
    }
  },
}
</script>