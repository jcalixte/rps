<template>
  <div class="rps-command">
    <md-button :class="buttonClass">{{ rock }}</md-button>
    <md-button :class="buttonClass">{{ paper }}</md-button>
    <md-button :class="buttonClass">{{ scissors }}</md-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hand, { HandLabel } from '@/enums/Hand'

export default Vue.extend({
  name: 'RPSCommand',
  props: {
    id: String
  },
  data() {
    return {
      buttonClass: 'md-icon-button md-primary hand',
      rock: HandLabel[Hand.Rock],
      paper: HandLabel[Hand.Paper],
      scissors: HandLabel[Hand.Scissors]
    }
  }
})
</script>

<style scoped>
.md-button.hand {
  width: 86pt;
  height: 86pt;
  font-size: 60pt;
}
</style>
