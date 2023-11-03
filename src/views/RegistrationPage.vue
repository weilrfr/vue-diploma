<script setup lang="ts">
import Button from 'primevue/button'
import { useUser } from '../composables/useUser'

import Avatar from 'primevue/avatar';

const { user, googleLogout, googleRegister } = useUser()
</script>

<template>
  <div class="side">
    <div class="cont">

      <div v-if="!user" class="registerform">
        <Button label="Войти" @click="googleRegister">Войти</Button>
      </div>

      <div v-else class="profile">
        <div class="avatar">
          <Avatar :image="user.photoURL" class="mr-2" size="xlarge" shape="circle" style='width: 9rem; height: 9rem'/>
        </div>
        <p>{{ user.displayName }}</p>
        <Button label="Выйти" @click="googleLogout">Выйти</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.registerform {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.registerform Button {
  padding: 3px 5px;
  flex-basis: 100%;
  justify-content: center;
}

.cont {
  margin: 0 auto;
  width: 80%;
}
.side {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35%;
}
.profile {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-basis: 100%;
  font-size: 2rem;
  margin-top: 100px;
}
.avatar {
  display: flex;
  justify-content: center;
}

.profile p {
  text-align: center;
}

.profile > * {
  flex-basis: 100%;
  margin: 10px 0px;
}

.profile Button {
  padding: 15px;
  justify-content: center;
  border-radius: 20px;
}

.registerform Button {
  border-radius: 20px;
  padding: 15px;
}

</style>