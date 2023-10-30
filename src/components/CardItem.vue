<script setup lang="ts">
import { defineProps } from 'vue'
import  PlayButton  from './PlayButton.vue';

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
      <PlayButton :audio="song"/>
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
  object-fit: cover;
}

.card {
  display: flex;
  flex-wrap: wrap;
  width: 152px;
  margin: 15px 0px;
  position: relative;
}

.card div {
  flex-basis: 100%;
}
</style>
