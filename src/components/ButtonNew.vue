<template>
  <q-btn
    color="primary"
    label="+ Novo"
    no-caps
    @click="openCreateModal"
    size="14px"
    class="custom-shadow"
  />
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openCreateModal'): string;
}>();

function openCreateModal() {
  emit('openCreateModal');
}
</script>

<style scoped></style>
