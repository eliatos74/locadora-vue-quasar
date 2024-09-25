<template>
  <q-dialog v-model="modal" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          {{ title }}
        </div>
        <q-btn color="primary" icon="close" dense round v-close-popup />
      </q-card-section>

      <q-card-section>
        <slot> </slot>
      </q-card-section>

      <q-card-actions align="right" style="padding: 16px">
        <q-btn
          label="Fechar"
          color="negative"
          style="text-transform: none; padding: 0px 15px"
          v-close-popup
        />
        <q-btn
          :label="titleButton"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          @click="confirmModal"
          :disable="!isFormValid"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

const titleButton = ref('Cadastrar');

const modal = defineModel({
  default: false,
});

const props = defineProps<{
  title: string;
  isFormValid: boolean;
  modalWithoutError: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

function confirmModal() {
  emit('confirm');
}

watch(
  () => props.modalWithoutError,
  (newValue) => {
    if (newValue) {
      modal.value = false;
    }
  }
);
</script>

<style scoped></style>
