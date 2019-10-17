<template>
  <div class="rock-paper-scissors">
    <h1>Play {{ id }}</h1>
    <div class="game">{{ rock }} {{ paper }} {{ scissors }}</div>
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
.game {
  padding: 15pt;
  font-size: 72pt;
}
</style>
