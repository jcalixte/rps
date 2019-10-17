<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <RockPaperScissors id="" />
  </div>
</template>

<script>
import RockPaperScissors from "@/components/RockPaperScissors.vue";

export default {
  name: "home",
  components: {
    RockPaperScissors
  }
};
</script>
