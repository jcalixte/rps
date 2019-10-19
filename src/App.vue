<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'app',
  created() {
    this.generateUuid()
  },
  methods: {
    ...mapActions(['generateUuid'])
  }
})
</script>

<style>
#app {
  text-align: center;
  height: 100vh;
}
</style>
