<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContent } from '@/composables/useContent';

import VirtualScroller from 'primevue/virtualscroller';


const router = useRouter()

const { contentList, getAllContent, loading } = useContent()

onMounted(async () => {
  await getAllContent();
})

// function goToCarUrl(id) {
//   router.push({ name: 'car', params: { id } })
// }
</script>

<template>
  <section class="songs-list">
    <CardItem :song="song" class="songs" v-for="song in contentList" :key="song" :loading="loading.contentList" /> <!-- @click="goToCarUrl(auto.id)" -->
  </section>
</template>

<style scoped>
.songs-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0px 20px;
  margin: 20px 0px 20px 0px;
  justify-content: space-evenly;
}
</style>
