<script setup lang="ts">
import { RouterView } from 'vue-router'
import  BottomBar  from './components/layouts/BottomBar.vue';
import { onMounted } from 'vue';
import { useUser } from './composables/useUser'

onMounted(() => {
  getUserFromLocalStorage()
})

const { getUserFromLocalStorage } = useUser()
</script>

<template>
  <BottomBar/>
  <RouterView />
</template>

<style scoped>

</style>
