<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useUser } from '../composables/useUser'
import FileUpload from 'primevue/fileupload';
import { useContent } from '@/composables/useContent';

const { user } = useUser();
const { onUpload, addContent, newContent } = useContent();

if (user) {
  newContent.value.author = user.value.displayName;
}

</script>

<template>
  <div class="card flex justify-content-center inputs-group">
    <form class="flex flex-column gap-2">

      <div>
        <span class="p-float-label">
          <InputText id="songName" v-model="newContent.songName" type="text" aria-describedby="text-error"/>
          <label for="songName">Название трека</label>
        </span>
      </div>

      <div>
        <span class="p-float-label">
          <InputText id="author" v-model="newContent.author" type="text" aria-describedby="text-error" disabled/>
          <label for="author">Имя</label>
        </span>
      </div>

      <div>
        <span class="p-float-label">
          <InputText id="genre" v-model="newContent.genre" type="text" aria-describedby="text-error"/>
          <label for="genre">Жанр</label>
        </span>
      </div>

      <FileUpload mode="basic" name="images" accept=".jpg, .png" chooseLabel="Нажмите что бы загрузить картинку" @input="onUpload($event)"/>
      <FileUpload mode="basic" name="songs" accept=".mp3" chooseLabel="Нажмите что бы загрузить трек" @input="onUpload($event)"/>
      <Button label="Submit" @click="addContent"/>
    </form>
  </div>
</template>

<style scoped>
.inputs-group {
  display: flex;
  justify-content: center;
}

.inputs-group div {
  margin: 20px 0px;
}

:deep(.p-inputtext) {
  padding: 5px 0px;
  width: 100%;
}

:deep(.p-fileupload) {
  width: 100%;
}

:deep(.p-button) {
  display: block;
  padding: 5px 0px;
}
:deep(.p-button > *) {
  margin-right: 10px;
}

.inputs-group form > *{
  width: 100%;
}


</style>
