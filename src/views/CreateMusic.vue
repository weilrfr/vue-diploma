<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const { handleSubmit, resetForm } = useForm()
const { value, errorMessage } = useField('value', validateField)
const toast = useToast()

function validateField(value) {
  if (!value) {
    return 'Name - Surname is required.'
  }

  return true
}

const onSubmit = handleSubmit((values) => {
  if (values.value && values.value.length > 0) {
    toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000 })
    resetForm()
  }
})
</script>

<template>
  <div class="card flex justify-content-center">
    <form @submit="onSubmit" class="flex flex-column gap-2">
      <span class="p-float-label">
        <InputText
          id="value"
          v-model="value"
          type="text"
          :class="{ 'p-invalid': errorMessage }"
          aria-describedby="text-error"
        />
        <label for="value">Name - Surname</label>
      </span>
      <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      <Button type="submit" label="Submit" />
    </form>
    <Toast />
  </div>
</template>

<style scoped></style>
