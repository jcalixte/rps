<template>
  <div class="rock-paper-scissors">
    <div class="game">
      <md-button class="md-icon-button md-primary hand">
        {{ rock }}
      </md-button>
      <md-button class="md-icon-button md-primary hand">
        {{ paper }}
      </md-button>
      <md-button class="md-icon-button md-primary hand">
        {{ scissors }}
      </md-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RockPaperScissors',
  props: {
    id: String
  },
  data() {
    return {
      rock: '✊',
      paper: '✋',
      scissors: '✌️'
    }
  }
})
</script>

<style>
.rock-paper-scissors {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.game {
  font-size: 72pt;
}

.md-button.hand {
  width: 86pt;
  height: 86pt;
  font-size: 72pt;
}
</style>
