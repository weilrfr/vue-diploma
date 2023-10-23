<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContent } from '@/composables/useContent';

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
    <div class="songs" v-for="song in contentList" :key="song" :loading="loading.contentList">
      <CardItem :song="song"  /> <!-- @click="goToCarUrl(auto.id)" -->
    </div>
  </section>
</template>

<style scoped>
.songs-list {
  display: flex;
  width: 100%;
  padding: 0px 20px;
  flex-wrap: wrap;
  margin: 20px 0px 20px 0px;
  justify-content: space-evenly;
}

.cars-list .songs {
  flex-basis: 20%;
}
</style>
