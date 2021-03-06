<template>
  <div class="rock-paper-scissors">
    <div v-if="canShareAPI && !play.player2">
      <md-button class="md-raised" @click="share">share it!</md-button>
    </div>
    <div class="game">
      <div class="player player-1">
        <h1 v-if="isSpectator">Player 1</h1>
        <h1 v-else>
          {{ isPlayer1 ? 'you!' : 'your opponent' }}
          {{ hasPlayer1Played ? 'played!' : '' }}
        </h1>
        <h2 class="burst" :style="{ backgroundColor: colors[player.Player1] }">
          {{ player1Score }}
        </h2>
        <RPSCommand v-model="play1" :canPlay="isPlayer1" :raise="isPlayer1" />
      </div>
      <div class="player player-2">
        <h1 v-if="isSpectator">Player 2</h1>
        <h1 v-else>
          {{ isPlayer2 ? 'you!' : 'your opponent' }}
          {{ hasPlayer2Played ? 'played!' : '' }}
        </h1>
        <h2 class="burst" :style="{ backgroundColor: colors[player.Player2] }">
          {{ player2Score }}
        </h2>
        <RPSCommand v-model="play2" :canPlay="isPlayer2" :raise="isPlayer2" />
      </div>
    </div>
    <RPSTurn class="turn-list" :turns="play.turns" />
  </div>
</template>

<script lang="ts">
declare const navigator: any
import Vue from 'vue'
import RPSCommand from '@/components/RPSCommand.vue'
import RPSTurn from '@/components/RPSTurn.vue'
import { mapGetters } from 'vuex'
import IPlay from '@/models/IPlay'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Hand from '@/enums/Hand'
import Player, { PlayerColor } from '@/enums/Player'
import PlayService from '@/services/PlayService'
import { launchFireworks, showSnow } from '@/utils/firework'

@Component({
  components: { RPSCommand, RPSTurn }
})
export default class RockPaperScissors extends Vue {
  @Prop({ type: String, required: true })
  private id!: string
  @Prop({ type: Object, required: true })
  private play!: IPlay

  @Getter
  private uuid!: string

  private player: typeof Player = Player
  private colors: typeof PlayerColor = PlayerColor

  private play1: Hand | null = null
  private play2: Hand | null = null

  public share() {
    if (this.canShareAPI) {
      navigator.share({
        title: `Let's play Rock Paper Scissors!`,
        text: 'I challenge you!',
        url: window.location.href
      })
    }
  }

  public get canShareAPI(): boolean {
    return !!navigator && !!navigator.share
  }

  public get playerNumber(): Player | null {
    switch (this.uuid) {
      case this.play.player1:
        return Player.Player1
      case this.play.player2:
        return Player.Player2
      default:
        return null
    }
  }

  private get isPlayer1() {
    return this.play.player1 === this.uuid
  }

  private get hasPlayer1Played() {
    return !this.isPlayer1 && this.play1 !== null
  }
  private get hasPlayer2Played() {
    return !this.isPlayer2 && this.play2 !== null
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

  @Watch('player1Score')
  public async onScore1Change(score: number) {
    if (this.isPlayer1) {
      launchFireworks()
    } else {
      showSnow()
    }
  }

  @Watch('player2Score')
  public async onScore2Change(score: number) {
    if (this.isPlayer2) {
      launchFireworks()
    } else {
      showSnow()
    }
  }

  @Watch('play1')
  public async onPlayer1Play(play1: Hand | null) {
    if (play1 === null || !this.isPlayer1) {
      return
    }

    await PlayService.setPlay(this.id, Player.Player1, play1)
  }

  @Watch('play2')
  public async onPlayer2Play(play2: Hand | null) {
    if (play2 === null || !this.isPlayer2) {
      return
    }

    await PlayService.setPlay(this.id, Player.Player2, play2)
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

    if (
      this.playerNumber &&
      (await PlayService.newTurn(this.id, this.playerNumber))
    ) {
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
  justify-content: space-between;
}

.burst {
  position: relative;
  padding: 10px 0;
  color: white;
  border-radius: 40px;
  width: 40px;
  height: 40px;
  display: inline-block;
}

.game {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 15px 0;
}

.turn-list {
  margin: 15px 0;
}

.player {
  margin: 15px;
}
</style>
