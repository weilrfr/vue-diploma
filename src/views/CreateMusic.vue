<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue'
import { useUser } from '../composables/useUser'
import FileUpload from 'primevue/fileupload';

const { user } = useUser();

const { handleSubmit, resetForm } = useForm()
const { value, errorMessage } = useField('value', validateField)
const songName = ref('');
const authorName = ref(user.value.displayName);


function validateField(value: string) {
  if (!value) {
    return 'Это поле обязательно'
  }

  return true
}

const onSubmit = handleSubmit((values) => {
  if (values.value && values.value.length > 0) {
    resetForm()
  }
})
</script>

<template>
  <div class="card flex justify-content-center inputs-group">
    <form @submit="onSubmit" class="flex flex-column gap-2">

      <div>
        <span class="p-float-label">
          <InputText id="songName" v-model="songName" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error"/>
          <label for="songName">Название трека</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </div>

      <div>
        <span class="p-float-label">
          <InputText id="author" v-model="authorName" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" disabled/>
          <label for="author">Имя</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </div>

      <div>
        <span class="p-float-label">
          <InputText id="genre" v-model="value" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error"/>
          <label for="genre">Жанр</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
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
