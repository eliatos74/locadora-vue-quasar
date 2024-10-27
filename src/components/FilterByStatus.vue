<template>
  <q-select
    outlined
    dense
    v-model="selected"
    :options="options"
    emit-value
    label="Filtrar por Status"
    style="width: 300px"
    class="custom-shadow"
    @update:model-value="selectedStatus"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Options } from 'src/interfaces/Utils.intrface';

const selected = ref<string>('');

defineProps<{
  options: Options[];
}>();

const emit = defineEmits<{
  (e: 'selectedStatus', value: string): void;
}>();

function selectedStatus() {
  emit('selectedStatus', selected.value);
}
</script>

<style scoped></style>
