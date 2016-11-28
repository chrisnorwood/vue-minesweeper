<template>
  <div id="app">
    <app-header></app-header>
    <mine-game></mine-game>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import MineGame from './components/MineGame.vue';

export default {
  name: 'app',
  components: {
    mineGame: MineGame,
    appHeader: Header,
  },
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
</style>
