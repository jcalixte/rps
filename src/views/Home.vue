<template>
  <div class="home">
    <p>Join a game</p>
    <input type="text" v-model="id" />
    <router-link v-if="id" :to="{ name: 'game', params: { id } }">
      Join
    </router-link>
  </div>
</template>

<script>
import RockPaperScissors from '@/components/RockPaperScissors.vue'

export default {
  name: 'home',
  data() {
    return {
      id: ''
    }
  }
}
</script>
