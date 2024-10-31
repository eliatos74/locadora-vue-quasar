<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Resumo de Empréstimos por Usuário"
      :rows="rows"
      :columns="columns"
      row-key="index"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot=""> </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { DashboardkApi } from 'src/api/DashboardApi';
import { RentList } from 'src/interfaces/Rent.interface';
import { onMounted, ref } from 'vue';

const columns = ref<QTableColumn[]>([
  {
    name: 'name',
    label: 'Nome do Locatário',
    field: 'name',
    align: 'center',
  },
  {
    name: 'totalRents',
    label: 'Total de Alugueis',
    field: 'totalRents',
    align: 'center',
  },
  {
    name: 'activeRents',
    label: 'Total de Alugueis Ativos',
    field: 'activeRents',
    align: 'center',
  },
]);

const rows = ref<RentList[]>([]);
const pagination = ref({
  rowsPerPage: 0,
});

async function getRentsList() {
  try {
    const response = await DashboardkApi.getRentsRelationList();
    console.log(response);

    rows.value = response.map((item: RentList, index: number) => ({
      ...item,
      index,
    }));
  } catch (error) {
    console.error('Erro ao buscar a lista de alugueis:', error);
  }
}

onMounted(() => {
  getRentsList();
});
</script>
