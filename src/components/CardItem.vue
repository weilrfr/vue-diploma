<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  song: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="card">
    <div class="img">
      <img :src="song.image" />
    </div>
    <div class="title">
      <p>{{ song.songName }}</p>
    </div>
  </div>
</template>

<style scoped>
.img img {
  width: 100%;
  border-radius: 5px;
}

.card {
  display: flex;
  flex-wrap: wrap;
  width: 30%;
}

.card div {
  flex-basis: 100%;
}
</style>
