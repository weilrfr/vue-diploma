<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useUser } from '../composables/useUser'
import FileUpload from 'primevue/fileupload'
import { useContent } from '@/composables/useContent'
import ProgressBar from 'primevue/progressbar'
import { ref, watch } from 'vue'

const { user } = useUser()
const { onUpload, addContent, newContent, loading } = useContent()

const validate = ref<string | boolean>(false)

function validated() {
  if (!newContent.value.songName) {
    validate.value = 'нет названия'
    return
  } else if (!newContent.value.author) {
    validate.value = 'нет автора'
    return
  }
  validate.value = 'validated'
  return
}

if (user) {
  newContent.value.author = user.value.displayName
}

watch(
  newContent.value,
  () => {
    console.log('chamge')
    validated()
  }
)
</script>

<template>
  <div class="card flex justify-content-center inputs-group">
    <form class="flex flex-column gap-2">
      <div>
        <span class="p-float-label">
          <InputText
            id="songName"
            v-model="newContent.songName"
            type="text"
            aria-describedby="text-error"
          />
          <label for="songName">Название трека</label>
        </span>
      </div>

      <div>
        <span class="p-float-label">
          <InputText
            id="author"
            v-model="newContent.author"
            type="text"
            aria-describedby="text-error"
            disabled
          />
          <label for="author">Имя</label>
        </span>
      </div>

      <div>
        <span class="p-float-label">
          <InputText
            id="genre"
            v-model="newContent.genre"
            type="text"
            aria-describedby="text-error"
          />
          <label for="genre">Жанр</label>
        </span>
      </div>

      <FileUpload
        class="file-uploader"
        mode="basic"
        name="images"
        accept=".jpg, .png"
        chooseLabel="Нажмите что бы загрузить картинку"
        @input="onUpload($event)"
      />
      <FileUpload
        mode="basic"
        name="songs"
        accept=".mp3"
        chooseLabel="Нажмите что бы загрузить трек"
        @input="onUpload($event)"
      />
      <ProgressBar v-if="loading.newContent" mode="indeterminate" style="height: 6px"></ProgressBar>
      <Button v-else-if="validate == false" label="Заполните все поля" disabled/>
      <Button v-else label="Submit" @click="addContent" />
    </form>
  </div>
</template>

<style scoped>
:deep(.p-fileupload) {
  border-radius: 20px;
}
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

.inputs-group form > * {
  width: 100%;
}
</style>
