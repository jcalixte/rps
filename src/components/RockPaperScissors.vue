<template>
  <div class="rock-paper-scissors">
    <h1>Play {{ id }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RockPaperScissors',
  props: {
    id: String
  }
})
</script>
