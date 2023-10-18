<script setup lang="ts">
import { ref } from "vue";
let selected = ref();

let options = ref([
  { id: 1, icon: 'pi pi-home', title: 'Home', titleColor: '#669C35', path: { name: "home" }},
  { id: 2, icon: 'pi pi-search', title: 'Search', titleColor: '#669C35'},
  { id: 3, icon: 'pi pi-user', title: 'Account', titleColor: '#669C35', path: { name: "reg" }},
])
</script>

<template>
  <RingBottomNavigation :options="options" v-model="selected"/>
</template>

<style scoped>

:deep(.rg-btn-icon i, .rg-btn-title) {
  color: #c7c7c7
}

:deep(.rg-btn-title) {
  color: #c7c7c7
}

:deep(.rg-btn-icon-active i) {
  color: white;
}

</style>