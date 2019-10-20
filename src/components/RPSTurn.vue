<template>
  <div class="rps-turn">
    {{ list }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Hand, { HandLabel } from '../enums/Hand'
import Player from '../enums/Player'
import { ITurn } from '@/models/IPlay'

@Component
export default class RPSTurn extends Vue {
  @Prop({ type: Array, required: true })
  private turns!: ITurn[]

  private get finishedTurns(): ITurn[] {
    return (this.turns as ITurn[]).filter(
      (turn: ITurn) =>
        turn[Player.Player1] !== null && turn[Player.Player2] !== null
    )
  }

  private get list() {
    return (this.finishedTurns as ITurn[])
      .map(
        (turn) =>
          `${HandLabel[turn[Player.Player1] as Hand]} - ${
            HandLabel[turn[Player.Player2] as Hand]
          }`
      )
      .join(' | ')
  }
}
</script>
