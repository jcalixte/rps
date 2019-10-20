<template>
  <div class="play">
    <RockPaperScissors v-if="play" :play="play" />
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
    bus.$on(SYNC_UP, async () => {
      this.$set(this, 'play', await PlayService.get(this.id))
    })
    repository.liveGame(this.id)
    this.play = await PlayService.get(this.id)
    if (!this.play.player2) {
      await PlayService.joinPlay(this.id, this.uuid)
    }
  },
  computed: {
    ...mapGetters(['uuid'])
  }
}
</script>
