<script setup lang="ts">
import { defineProps } from 'vue'; 

const props = defineProps({
  audio: {
    type: Object,
    required: true
  }
})

function playAudio(id: number) {
  const audioContoller = props.audio.value.find((audio: any) => audio.id === id)
  if (audioContoller) {
    audioContoller.play = true
    const audioElement = document.getElementById(audioContoller.songName) as HTMLAudioElement
    audioElement.play()
    console.log('играет')
  }
  audioContoller.value.forEach((audio: any) => {
    if (audio.id !== id) {
      audio.play = false
      const audioElement = document.getElementById(audio.songName) as HTMLAudioElement
      audioElement.pause()
      console.log('на паузеплей')
    }
  })
}

function playStop(id: number) {
  const audioContoller = props.audio.value.find((audio: any) => audio.id === id)
  if (audioContoller) {
    audioContoller.play = false
    const audioElement = document.getElementById(audioContoller.songName) as HTMLAudioElement
    audioElement.pause()
    console.log('Audio на паузе')
  }
  audioContoller.value.forEach((audio: any) => {
    if (audio.id !== id) {
      audio.play = false
      const audioElement = document.getElementById(audio.songName) as HTMLAudioElement
      audioElement.pause()
      console.log('на паузе')
    }
  })
}
</script>

<template>
  <div v-if="audio.play == false" class="play-button" @click="playAudio(audio.id)">
    <audio controls class="audio">
      <source :src="audio.song">
    </audio>
    <div>
      <i class="pi pi-play"></i>
    </div>
  </div>
  <div v-else class="stop-button" @click="playStop(audio.id)">
    <audio controls class="audio">
      <source :src="audio.song">
    </audio>
    <i class="pi pi-pause"></i>
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