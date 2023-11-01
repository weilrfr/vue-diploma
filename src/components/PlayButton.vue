<script setup lang="ts">
import { defineProps } from 'vue'; 
import PButton from 'primevue/button'

const props = defineProps({
  audio: {
    type: Object,
    required: true
  }
})



function playAudio() {
  const audioId = props.audio.id
  const audioContent = props.audio

  if (audioId) {
    audioContent.play = true
    const audioElement = document.getElementById(audioId) as HTMLAudioElement
    audioElement.play()
    console.log('играет')
  }
}

function playStop() {
  const audioId = props.audio.id
  const audioContent = props.audio

  if (audioId) {
    audioContent.play = false
    const audioElement = document.getElementById(audioId) as HTMLAudioElement
    audioElement.pause()
    console.log('Audio на паузе')
  }
}
</script>

<template>
  <div v-if="!props.audio.play" class="play-button" >
    <audio :id="props.audio.id">
      <source :src="props.audio.song" type="audio/mp3">
    </audio>
    <p-button icon="pi pi-play" class="p-button"  @click.stop="playAudio" />
  </div>
  <div v-else class="stop-button">
    <audio :id="props.audio.id">
      <source :src="props.audio.song" type="audio/mp3">
    </audio>
    <p-button icon="pi pi-pause" class="p-button" @click.stop="playStop" />
  </div>
</template>

<style scoped>
.play-button {
  width: 40px;
  height: 40px;
  background-color: green;
  position: absolute;
  bottom: 30px;
  right: 10px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio {
  display: none;
}
</style>