<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue'
import { useUser } from '../composables/useUser'
import FileUpload from 'primevue/fileupload';

const { user } = useUser();

const songName = ref('');
const authorName = ref('');
const genre = ref('');

if (user) {
  authorName.value = user.value.displayName;
}

</script>

<template>
  <div class="card flex justify-content-center inputs-group">
    <form class="flex flex-column gap-2">

      <div>
        <span class="p-float-label">
          <InputText id="songName" v-model="songName" type="text" aria-describedby="text-error"/>
          <label for="songName">Название трека</label>
        </span>
      </div>

      <div>
        <span class="p-float-label">
          <InputText id="author" v-model="authorName" type="text" aria-describedby="text-error" disabled/>
          <label for="author">Имя</label>
        </span>
      </div>

      <div>
        <span class="p-float-label">
          <InputText id="genre" v-model="genre" type="text" aria-describedby="text-error"/>
          <label for="genre">Жанр</label>
        </span>
      </div>

      <FileUpload mode="basic" name="images" accept=".jpg, .png"/>
      <Button type="submit" label="Submit" />
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
