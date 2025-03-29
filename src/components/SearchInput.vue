<template>
  <q-input
    v-model="textSearch"
    type="text"
    label="Pesquisar..."
    outlined
    dense
    debounce="500"
    style="width: 300px"
    @update:model-value="searchRent"
    class="custom-shadow"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textSearch = ref('');

const emit = defineEmits<{
  (e: 'searchInput', value: string): void;
}>();

function searchRent(value: string | number | null) {
  emit('searchInput', value as string);
}
</script>

<style scoped></style>
