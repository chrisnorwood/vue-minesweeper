<template>
  <div id="app">
    <app-header 
      @newGame="newGame" 
      :gameOver="gameOver" 
      :timer="timer" 
      :firstPlay="firstPlay">  
    </app-header>
    <transition name="fade" mode="out-in" appear>
      <mine-game 
        v-if="displayGame" 
        @gameIsOver="endGame"
        @newGame="newGame"
        :rows="rows"
        :columns="columns"
        :tiles="tiles"
        :gameOver="gameOver"
        :firstPlay="firstPlay">  
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
      gameStart: 0,
      elapsedTime: 0,
      windowTimer: null,
      displayGame: true,
      gameOver: false,
      firstPlay: true,
    }
  },
  name: 'app',
  components: {
    mineGame: MineGame,
    appHeader: Header,
  },
  computed: {
    timer() {
      let totalSeconds = Math.floor(this.elapsedTime/1000);
      let minutes = Math.floor(totalSeconds/60);
      let seconds = totalSeconds - (minutes * 60);

      if (minutes.toString().length == 1) {
        minutes = '0' + minutes;
      }

      if (seconds.toString().length == 1) {
        seconds = '0' + seconds;
      }
      
      return minutes + ':' + seconds;
    },
  },
  methods: {
    newGame() {
      this.firstPlay = false;
      this.gameOver = false;
      this.initTiles();
      this.startTimer();
    },
    endGame() {
      clearInterval(this.windowTimer);
      this.windowTimer = null;
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
            mined: (Math.random() * 10 > 9),
          }
        })
      });
    },
    startTimer() {
      this.gameStart = new Date().getTime();
      this.windowTimer = setInterval(() => {
        this.elapsedTime = (new Date().getTime() - this.gameStart);
      }, 1000);
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
