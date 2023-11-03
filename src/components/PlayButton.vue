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
  
  if (audioId) {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement
    audioContent.play = true
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
  
  if (audioId) {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement
    audioContent.play = false
    audioElement.pause()
    console.log(props.audio.id + ' на паузе')
  }

  console.log(contentList.value)

  contentList.value.forEach((video: any) => {
    if (video.id !== audioId) {
      const audioElement = document.getElementById(audioId) as HTMLAudioElement
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
    <p-button v-if="!props.audio.play" icon="pi pi-play" class="p-button btn"  @click.stop="playAudio" />
    <p-button  v-else icon="pi pi-pause" class="p-button btn" @click.stop="playStop" />
  </div>
</template>

<style scoped>
.play-button {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 30px;
  right: 10px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

.audio {
  display: none;
}
</style>