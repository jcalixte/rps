<template>
  <div class="rock-paper-scissors">
    <div class="game">
      <div class="player player-1">
        <h1 v-if="isSpectator">Player 1</h1>
        <h1 v-else>{{ isPlayer1 ? 'you!' : 'your opponent' }}</h1>
        <h2>{{ player1Score }}</h2>
        <RPSCommand v-model="play1" :canPlay="isPlayer1" :raise="isPlayer1" />
      </div>
      <div class="player player-2">
        <h1 v-if="isSpectator">Player 2</h1>
        <h1 v-else>{{ isPlayer2 ? 'you!' : 'your opponent' }}</h1>
        <h2>{{ player2Score }}</h2>
        <RPSCommand v-model="play2" :canPlay="isPlayer2" />
      </div>
    </div>
    <RPSTurn :turns="play.turns" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RPSCommand from '@/components/RPSCommand.vue'
import RPSTurn from '@/components/RPSTurn.vue'
import { mapGetters } from 'vuex'
import IPlay from '@/models/IPlay'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Hand from '@/enums/Hand'
import Player from '@/enums/Player'
import PlayService from '@/services/PlayService'

@Component({
  components: { RPSCommand, RPSTurn }
})
export default class RockPaperScissors extends Vue {
  @Prop({ type: Object, required: true })
  private play!: IPlay

  @Getter
  private uuid!: string

  private play1: Hand | null = null
  private play2: Hand | null = null

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

  private get player1Score() {
    return this.play.turns.filter((turn) => turn.winner === Player.Player1)
      .length
  }

  private get player2Score() {
    return this.play.turns.filter((turn) => turn.winner === Player.Player2)
      .length
  }

  public get lastTurn() {
    const turns = this.play.turns
    return [...turns].pop() || null
  }

  @Watch('play1')
  public async onPlayer1Play(play1: Hand | null) {
    if (play1 === null) {
      return
    }

    await PlayService.setPlay(this.play, Player.Player1, play1)
    if (this.play2 !== null) {
      PlayService.setPlay(this.play, Player.Player2, this.play2)
    }
  }

  @Watch('play2')
  public onPlayer2Play(play2: Hand | null) {
    if (play2 === null) {
      return
    }

    PlayService.setPlay(this.play, Player.Player2, play2)
  }

  @Watch('play', { deep: true })
  public async onPlayChange(play: IPlay) {
    if (!this.lastTurn) {
      return
    }

    if (this.isPlayer2) {
      this.play1 = this.lastTurn[Player.Player1]
    }
    if (this.isPlayer1) {
      this.play2 = this.lastTurn[Player.Player2]
    }

    if (
      this.lastTurn[Player.Player1] === null &&
      this.lastTurn[Player.Player2] === null
    ) {
      this.play1 = null
      this.play2 = null
    }

    if (this.isPlayer1 && (await PlayService.newTurn(this.play))) {
      this.play1 = null
      this.play2 = null
    }
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
