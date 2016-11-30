<template>
  <header>
    <nav>
      <div class="brand">
        <h1>Minesweeper</h1>
      </div>
      <div class="info">(R-click to flag tile)</div>
      <div class="menu">
        <ul>
          <li>
            <button class="timer">{{ timer }}</button>
          </li>
          <li>
            <button @click="newGame" v-if="gameOver || firstPlay">Start</button>
            <button @click="newGame" v-else>Reset</button>
          </li>
          <li class="dropdown-menu">
            <button 
              class="dropdown-toggle" 
              @click="toggleSettings">
                &nbsp;&nbsp;&nbsp;
              </button>
            <transition name="fade">
              <div class="dropdown" v-show="settings">
                <button 
                  @click="setDiff(1)"
                  :class="{selected: thisDiffIs(1)}">
                    easy
                </button>
                <button 
                  @click="setDiff(2)" 
                  :class="{selected: thisDiffIs(2)}">
                    normal
                </button>
                <button @click="setDiff(3)"
                  :class="{selected: thisDiffIs(3)}">
                    hard
                </button>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: [
    'gameOver',
    'timer',
    'firstPlay',
    'difficulty',
  ],
  data() {
    return {
      settings: false,
    }
  },
  methods: {
    newGame() {
      this.$emit('newGame');
    },
    setDiff(level) {
      this.toggleSettings();
      this.$emit('setDiff', level);
    },
    thisDiffIs(level) {
      return this.difficulty === level;
    },
    toggleSettings() {
      this.settings = !this.settings;
    }
  },
}
</script>