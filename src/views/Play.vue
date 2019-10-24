<template>
  <div class="play">
    <div>
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/logo.png" />
      </router-link>
    </div>
    <RockPaperScissors class="rps" v-if="play" :play="play" />
    <p v-else>Chargement...</p>
  </div>
</template>

<script>
import RockPaperScissors from '@/components/RockPaperScissors.vue'
import PlayService from '../services/PlayService'
import bus, { SYNC_UP } from '../utils/bus'
import repository from '../repository'
import { mapGetters } from 'vuex'

export default {
  name: 'play',
  components: {
    RockPaperScissors
  },
  props: {
    id: String
  },
  data() {
    return {
      play: null
    }
  },
  async mounted() {
    bus.$on(SYNC_UP, this.getPlay)
    repository.liveGame(this.id)
    this.getPlay()
  },
  beforeDestroy() {
    bus.$off(SYNC_UP, this.getPlay)
  },
  methods: {
    async getPlay() {
      this.play = await PlayService.get(this.id)
      if (this.play && !this.play.player2) {
        await PlayService.joinPlay(this.id, this.uuid)
      }
    }
  },
  computed: {
    ...mapGetters(['uuid'])
  }
}
</script>

<style>
.play {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.rps {
  flex: 1;
}
img {
  margin: 5px;
}
</style>
