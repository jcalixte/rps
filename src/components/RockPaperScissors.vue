<template>
  <div class="rock-paper-scissors">
    <div class="game">
      <div class="player player-1">
        <h1>Player 1</h1>
        <RPSCommand />
      </div>
      <div class="player player-2">
        <h1>Player 2</h1>
        <RPSCommand />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RPSCommand from '@/components/RPSCommand.vue'

export default Vue.extend({
  name: 'RockPaperScissors',
  components: { RPSCommand },
  props: {
    id: String
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
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.player {
  margin: 15px;
}
</style>
