<script setup lang="ts">
import Listbox from 'primevue/listbox'
import { onUpdated, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const visible = ref(false)

const toggleVisible = () => {
    visible.value = !visible.value
}

interface ListBoxValue {
    name: string
    route?: string
}

const cities = ref<ListBoxValue[]>([
    { name: 'Settings' },
    { name: 'Create music', route: 'createMusic' },
    { name: 'About' },
    { name: 'Support' },
    { name: 'Privace' }
])


function fff(e: any) {
  console.log(e);
  if (e.value && e.value.route !== undefined) {
    router.push(e.value?.route as string)
  }
}

</script>

<template>
    <div class="nav-bar">
        <p>Добрый день</p>
        <div class="icons">
            <i class="pi pi-ellipsis-v" @click="toggleVisible"></i>
            <div class="listbox">
                <Listbox
                    v-if="visible"
                    v-model:visible="visible"
                    :options="cities"
                    optionLabel="name"
                    @change="fff"
                    class="w-full md:w-14rem"
                >
                </Listbox>
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
    top: 7%;
    right: 35px;
}
.listbox > * {
    padding: 10px;
}

:deep(.p-listbox-list-wrapper li) {
    padding: 3px 0px;
}
</style>
