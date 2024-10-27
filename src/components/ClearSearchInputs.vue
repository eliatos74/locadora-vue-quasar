<template>
  <q-btn
    label="Limpar Filtros"
    no-caps
    outline
    color="primary"
    size="14px"
    class="custom-shadow"
    @click="clearSearchRent"
  />
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'clearSearchRent'): string;
}>();

function clearSearchRent() {
  emit('clearSearchRent');
}
</script>
