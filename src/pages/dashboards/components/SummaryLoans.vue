<template>
  <q-table
    class="my-card-bottom"
    title="Resumo de Empréstimos por Usuário"
    :rows="rentsList"
    :columns="columns"
    :request="onRequest"
    row-key="name"
    virtual-scroll
    :rows-per-page-options="[10, 20, 30, 40, 50]"
    no-data-label="Nenhum registro encontrado"
  />
</template>

<script setup lang="ts">
import { QTableColumn, QTableProps } from 'quasar';
import { DashboardkApi } from 'src/api/DashboardApi';
import { RentsRelation } from 'src/interfaces/Dashboard.interface';
import { Parameters } from 'src/interfaces/Utils.intrface';
import { onMounted, ref } from 'vue';

const rentsList = ref<RentsRelation[]>([]);

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

const request: Parameters = {
  search: '',
  page: 0,
  size: 10,
  sort: 'id',
  direction: 'ASC',
};

const pagination = ref<QTableProps['pagination']>({
  page: 0,
  rowsNumber: 0,
  rowsPerPage: 10,
});

const onRequest: QTableProps['onRequest'] = function (props) {
  const { page, rowsPerPage } = props.pagination;

  request.page = page - 1;
  request.size = rowsPerPage;
  pagination.value!.page = page;
  pagination.value!.rowsPerPage = rowsPerPage;
  getRentsRelation();
};

async function getRentsRelation() {
  const response = await DashboardkApi.getRentsRelationList(request);
  pagination.value!.rowsNumber = response.totalElements;
  pagination.value!.rowsPerPage = response.pageSize;
  rentsList.value = response.content;
}

onMounted(() => {
  getRentsRelation();
});
</script>

<style scoped></style>
