<template>
  <div class="rps-command">
    <md-button
      :class="buttonClass(hand.Rock)"
      :disabled="!canPlay"
      @click="play(hand.Rock)"
    >
      {{ rock }}
    </md-button>
    <md-button
      :class="buttonClass(hand.Paper)"
      :disabled="!canPlay"
      @click="play(hand.Paper)"
    >
      {{ paper }}
    </md-button>
    <md-button
      :class="buttonClass(hand.Scissors)"
      :disabled="!canPlay"
      @click="play(hand.Scissors)"
    >
      {{ scissors }}
    </md-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hand, { HandLabel } from '@/enums/Hand'

export default Vue.extend({
  name: 'RPSCommand',
  props: {
    id: String,
    canPlay: Boolean,
    value: Number
  },
  data() {
    return {
      hand: Hand,
      rock: HandLabel[Hand.Rock],
      paper: HandLabel[Hand.Paper],
      scissors: HandLabel[Hand.Scissors]
    }
  },
  methods: {
    buttonClass(hand: Hand) {
      const selected = this.value === hand ? 'md-raised' : ''
      return 'md-icon-button md-primary hand ' + selected
    },
    play(hand: Hand) {
      if (this.canPlay) {
        this.$emit('input', hand)
      }
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
