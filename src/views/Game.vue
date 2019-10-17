<template>
  <div class="home">
    <RockPaperScissors :id="id" />
  </div>
</template>

<script>
import RockPaperScissors from '@/components/RockPaperScissors.vue'

export default {
  name: 'home',
  components: {
    RockPaperScissors
  },
  props: {
    id: String
  }
}
</script>
