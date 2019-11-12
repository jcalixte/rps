<template>
  <div class="home">
    <div>
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/logo.png" />
      </router-link>
    </div>
    <div class="card-container">
      <md-card>
        <md-card-content>
          <md-field>
            <label>game id</label>
            <md-input v-model="id" @keyup.enter="add"></md-input>
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
    <div class="history" v-if="plays.length">
      <router-link :to="{ name: 'history' }" tag="md-button" class="md-raised">
        History
      </router-link>
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
      id: '',
      plays: []
    }
  },
  async mounted() {
    this.plays = await repository.getAll()
  },
  methods: {
    async add() {
      if (this.uuid && this.lowerId) {
        const play = await PlayService.getRemote(this.lowerId)
        if (play) {
          this.joinPlay()
          return
        }
        const ok = await PlayService.add(this.uuid, this.lowerId)
        if (ok) {
          this.redirectToPlay(this.lowerId)
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
      const id = await PlayService.joinPlay(this.lowerId, this.uuid)
      this.redirectToPlay(this.id)
    },
    redirectToPlay(id) {
      if (id) {
        this.$router.push({ name: 'play', params: { id } })
      }
    }
  },
  computed: {
    ...mapGetters(['uuid']),
    lowerId() {
      return (this.id || '').toLowerCase()
    }
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.card-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

img {
  margin: 5px;
}
</style>
