<template>
  <div id="app">
    <app-header @newGame="newGame" :gameOver="gameOver"></app-header>
    <transition name="fade" mode="out-in" appear>
      <mine-game 
        v-if="displayGame" 
        @gameIsOver="endGame"
        :rows="rows"
        :columns="columns"
        :tiles="tiles"
        :gameOver="gameOver">  
      </mine-game>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import MineGame from './components/MineGame.vue';

export default {
  data() {
    return {
      rows: 15,
      columns: 20,
      tiles: [],
      displayGame: true,
      gameOver: false,
    }
  },
  name: 'app',
  components: {
    mineGame: MineGame,
    appHeader: Header,
  },
  methods: {
    newGame() {
      this.displayGame = true;
      this.gameOver = false;
      this.initTiles();
    },
    endGame() {
      this.gameOver = true;
    },
    initTiles() {
      this.tiles = new Array(this.rows).fill(0).map((row, rowIndex) => {
        return new Array(this.columns).fill(0).map((column, columnIndex) => {
          return {
            row: rowIndex,
            column: columnIndex,
            classes: [],
            flagged: false,
            mined: (Math.random() * 6 > 5),
          }
        })
      });
    },
  },
  created() {
    this.initTiles();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
