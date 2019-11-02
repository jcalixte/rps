<template>
  <div class="history">
    <router-link
      v-for="play in plays"
      :key="play._id"
      :to="{ name: 'play', params: { id: getPlayId(play._id) } }"
      tag="md-button"
      class="md-raised"
      :class="{ 'play-win': hasWon(play) }"
    >
      {{ play._id }}
    </router-link>
  </div>
</template>

<script>
import repository from '@/repository'
import PlayService from '@/services/PlayService'
import IPlay from '@/models/IPlay'
import { mapGetters } from 'vuex'

export default {
  name: 'history',
  data() {
    return {
      plays: []
    }
  },
  async mounted() {
    this.plays = await repository.getAll()
  },
  methods: {
    hasWon(play) {
      if (!this.uuid) {
        return false
      }
      return PlayService.hasUserWon(this.uuid, play)
    },
    getPlayId(id) {
      return (id || '').split('_').shift()
    }
  },
  computed: {
    ...mapGetters(['uuid'])
  }
}
</script>

<style scoped>
.play-win {
  background-color: #2980b9 !important;
  color: white !important;
}
</style>
