<script setup lang="ts">
import Listbox from 'primevue/listbox';
import { ref } from "vue";

const visible = ref(false);

const toggleVisible = () => {
  visible.value = !visible.value;
}

const selectedCity = ref();
const cities = ref([
    { name: 'Settings'},
    { name: 'Create music'},
    { name: 'About'},
    { name: 'Support'},
    { name: 'Privace'}
]);
</script>

<template>
<div class="nav-bar">
  <p>Добрый день</p>
  <div class="icons">
    <i class="pi pi-ellipsis-v" @click="toggleVisible"></i>
    <div class="listbox" >
      <Listbox v-model="selectedCity" v-model:visible="visible" :options="cities" optionLabel="name" class="w-full md:w-14rem" />
    </div>
  </div>
</div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.listbox {
  position: absolute;
  top: 10%;
  left: 60%;
}
.listbox > *{
  padding: 10px;
}

:deep(.p-listbox-list-wrapper li) {
  padding: 3px 0px;
}

</style>