<template>
  <div class="history">
    <router-link
      v-for="play in plays"
      :key="play._id"
      :to="{ name: 'play', params: { id: play._id } }"
      tag="md-button"
      class="md-raised"
    >
      {{ play._id }}
    </router-link>
  </div>
</template>

<script>
import repository from '@/repository'

export default {
  name: 'history',
  data() {
    return {
      plays: []
    }
  },
  async mounted() {
    this.plays = await repository.getAll()
  }
}
</script>
