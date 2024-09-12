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
        <q-btn
          color="primary"
          icon="close"
          dense
          round
          v-close-popup
          @click="closeModal"
        />
      </q-card-section>

      <q-card-section>
        <slot> </slot>
      </q-card-section>

      <q-card-actions align="right" style="padding: 16px">
        <q-btn
          label="Fechar"
          color="negative"
          style="text-transform: none; padding: 0px 15px"
          @click="closeModal"
          v-close-popup
        />
        <q-btn
          label="Cadastrar"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          @click="confirmModal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const modal = defineModel({
  default: false,
});

defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirme'): void;
}>();

function closeModal() {
  emit('close');
}

function confirmModal() {
  emit('confirme');
}
</script>

<style scoped></style>
