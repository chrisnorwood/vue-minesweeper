<template>
  <header>
    <nav>
      <div class="brand">
        <h1>Minesweeper</h1>
      </div>
      <div class="info">| Right-click to flag tile |</div>
      <div class="menu">
        <div class="menu">
        <button @click="newGame" v-if="gameOver">New Game</button>
        <button @click="newGame" v-else>Reset</button>
      </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: [
    'gameOver'
  ],
  methods: {
    newGame() {
      this.$emit('newGame');
    },
  },
}
</script>