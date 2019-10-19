<template>
  <div class="rock-paper-scissors">
    <div class="game">
      <div class="player player-1">
        <h1 v-if="isSpectator">Player 1</h1>
        <h1 v-else>{{ isPlayer1 ? 'you!' : 'your opponent' }}</h1>
        <RPSCommand />
      </div>
      <div class="player player-2">
        <h1 v-if="isSpectator">Player 2</h1>
        <h1 v-else>{{ isPlayer2 ? 'you!' : 'your opponent' }}</h1>
        <RPSCommand />
      </div>
    </div>
    <pre>{{ play }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RPSCommand from '@/components/RPSCommand.vue'
import { mapGetters } from 'vuex'
import IPlay from '@/models/IPlay'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  components: { RPSCommand }
})
export default class RockPaperScissors extends Vue {
  @Prop({ type: Object, required: true })
  private play!: IPlay

  @Getter
  private uuid!: string

  private get isPlayer1() {
    return this.play.player1 === this.uuid
  }

  public get isPlayer2() {
    return this.play.player2 === this.uuid
  }

  public get isSpectator() {
    const { player1, player2 } = this.play
    return ![player1, player2].includes(this.uuid)
  }
}
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
