<template>
  <div class="home">
    <p>Join a game</p>
    <div class="card-container">
      <md-card>
        <md-card-content>
          <md-field>
            <label>game id</label>
            <md-input v-model="id"></md-input>
          </md-field>
          <router-link
            v-if="id"
            :to="{ name: 'game', params: { id } }"
            tag="span"
          >
            <md-button class="md-icon-button md-primary">
              <md-icon>play_arrow</md-icon>
            </md-button>
          </router-link>
        </md-card-content>
      </md-card>

      <md-button class="md-icon-button md-raised md-primary" @click="add">
        <md-icon>add</md-icon>
      </md-button>
    </div>
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
  },
  methods: {
    add() {}
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
}

.card-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
