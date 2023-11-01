<script setup lang="ts">
import { defineProps } from 'vue'; 
import PButton from 'primevue/button'
import { useContent } from '@/composables/useContent';

const props = defineProps({
  audio: {
    type: Object,
    required: true
  }
})

const {contentList} = useContent()


function playAudio() {
  const audioId = props.audio.id
  const audioContent = props.audio
  const audioElement = document.getElementById(audioId) as HTMLAudioElement

  if (audioId) {
    audioContent.play = true
    const audioElement = document.getElementById(audioId) as HTMLAudioElement
    audioElement.play()
    console.log(props.audio.id + ' играет')
  }

  contentList.value.forEach((video: any) => {
    if (video.id !== audioId) {
      video.play = false
      const audioElement = document.getElementById(audioId) as HTMLAudioElement
      console.log(audioElement)
      audioElement.pause()
    }
  })
}

function playStop() {
  const audioId = props.audio.id
  const audioContent = props.audio
  const audioElement = document.getElementById(audioId) as HTMLAudioElement

  if (audioId) {
    audioContent.play = false
    audioElement.pause()
    console.log(props.audio.id + ' на паузе')
  }

  console.log(contentList.value)

  contentList.value.forEach((video: any) => {
    if (video.id !== audioId) {
      video.play = false
      console.log(audioElement)
      audioElement.pause()
    }
  })
}
</script>

<template>
  <div class="play-button">
    <audio :id="props.audio.id">
      <source  :src="props.audio.song" type="audio/mp3">
    </audio>
    <p-button v-if="!props.audio.play" icon="pi pi-play" class="p-button"  @click.stop="playAudio" />
    <p-button  v-else icon="pi pi-pause" class="p-button" @click.stop="playStop" />
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