<script setup lang="ts">
import Button from 'primevue/button'
import { useUser } from '../composables/useUser'
import Avatar from 'primevue/avatar';

const { user, googleRegister, googleLogout } = useUser()
</script>

<template>
  <div class="side">
    <!-- <div v-if="!user">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <Button label="Войти" @click="googleRegister">Войти<i class="pi pi-sign-in"></i></Button>
    </div> -->

    <div class="profile">
      <div class="avatar">
        <Avatar image="https://avatars.githubusercontent.com/u/132679772?v=4" class="mr-2" size="xlarge" shape="circle" />
      </div>
      <p>{{ user.value.name }}</p>
      <Button label="Выйти" @click="googleLogout">Выйти <i class="pi pi-sign-out"></i></Button>
    </div>
  </div>
</template>

<style scoped>
.side {
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-basis: 100%;
}
.avatar {
  display: flex;
  justify-content: center;
  flex-basis: 100%;
}

.profile Button {
  padding: 15px;
}
</style>