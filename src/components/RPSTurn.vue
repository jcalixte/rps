<template>
  <div class="rps-turn">
    <span
      v-for="(turn, k) in finishedTurns"
      :key="k"
      :style="{ backgroundColor: colors[turn.winner] || '#4b6584' }"
      class="score"
      v-html="list[k]"
    >
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Hand, { HandLabel } from '../enums/Hand'
import Player, { PlayerColor } from '../enums/Player'
import { ITurn } from '@/models/IPlay'

@Component
export default class RPSTurn extends Vue {
  @Prop({ type: Array, required: true })
  private turns!: ITurn[]
  private colors: typeof PlayerColor = PlayerColor

  private get finishedTurns(): ITurn[] {
    return (this.turns as ITurn[])
      .filter(
        (turn: ITurn) =>
          turn[Player.Player1] !== null && turn[Player.Player2] !== null
      )
      .reverse()
  }

  private get list() {
    const turnCount = this.finishedTurns.length
    return this.finishedTurns.map(
      (turn, index) =>
        `${turnCount - index}.&nbsp;${
          HandLabel[turn[Player.Player1] as Hand]
        }&nbsp;—&nbsp;${HandLabel[turn[Player.Player2] as Hand]}`
    )
  }
}
</script>

<style>
.rps-turn {
  line-height: 32pt;
  display: flex;
  overflow: scroll;
}

.score {
  margin: 0 15px;
  padding: 5px;
  font-size: 16pt;
  color: white;
}
</style>
