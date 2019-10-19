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
          <md-button class="md-icon-button md-primary" @click="add">
            <md-icon>play_arrow</md-icon>
          </md-button>
        </md-card-content>
      </md-card>

      <md-button class="md-icon-button md-raised md-primary" @click="create">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import RockPaperScissors from '@/components/RockPaperScissors.vue'
import PlayService from '@/services/PlayService'
import repository from '@/repository'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      id: ''
    }
  },
  methods: {
    async add() {
      if (this.uuid && this.id) {
        const play = await repository.getRemote(this.id)
        if (play) {
          this.joinPlay()
          return
        }
        const ok = await PlayService.add(this.uuid, this.id)
        if (ok) {
          this.redirectToPlay(this.id)
        }
      }
    },
    async create() {
      if (this.uuid) {
        const id = await PlayService.add(this.uuid)
        this.redirectToPlay(id)
      }
    },
    async joinPlay() {
      await PlayService.joinPlay(this.id, this.uuid)
      this.redirectToPlay(this.id)
    },
    redirectToPlay(id) {
      if (id) {
        this.$router.push({ name: 'play', params: { id: this.id } })
      }
    }
  },
  computed: {
    ...mapGetters(['uuid'])
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
