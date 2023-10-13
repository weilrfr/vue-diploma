<script setup lang="ts">
import Button from 'primevue/button'
import { useUser } from '../../composables/useUser'

const { user, googleRegister, googleLogout } = useUser()
</script>

<template>
    <div class="side">
        <Button v-if="!user" label="Войти" @click="googleRegister">Войти<i class="pi pi-sign-in"></i></Button>
        <Button v-else label="Выйти" @click="googleLogout">Выйти <i class="pi pi-sign-out"></i></Button>
    </div>
</template>