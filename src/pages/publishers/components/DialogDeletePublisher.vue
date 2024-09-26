<template>
  <q-dialog v-model="modalDelete" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Excluir Editora
        </div>
        <q-btn color="primary" icon="close" dense round v-close-popup />
      </q-card-section>

      <q-card-section>
        <h6 style="text-align: center; margin: 15px 0px">
          Deseja realmente exlucir a editora "{{ props.publisher?.name }}" ?
        </h6>
      </q-card-section>
      <q-card-actions align="right" style="padding: 16px">
        <q-btn
          label="Fechar"
          color="negative"
          style="text-transform: none; padding: 0px 15px"
          v-close-popup
        />
        <q-btn
          label="Confirmar"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          @click="submitForm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Publisher } from '../../../interfaces/Publishers.interface';
import { watch } from 'vue';

const modalDelete = defineModel({
  default: false,
});

const props = defineProps<{
  publisher?: Publisher;
  modalWithoutError: boolean;
}>();

watch(
  () => props.modalWithoutError,
  (newVal) => {
    if (newVal) {
      modalDelete.value = false;
    }
  }
);

const emit = defineEmits<{
  (e: 'submit', id: number): void;
}>();

function submitForm() {
  if (props.publisher?.id) {
    emit('submit', props.publisher.id!);
  }
}
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
