<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Alugueis</h5>
      <div class="header-source">
        <input type="text" placeholder="Pesquisar..." />
        <button class="add-button">+ Novo</button>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="rentsList"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        @request="onRequest"
        :rows-per-page-options="[10, 20, 30, 40, 50]"
        no-data-label="Nenhum registro encontrado"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="background-color: var(--q-primary)"
            >
              <span style="color: white">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round icon="bookmark_added" color="grey-8">
              <q-tooltip>Entregar Livro</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QTableProps } from 'quasar';
import { Parameters } from 'src/interfaces/Utils.intrface';
import { RentList } from 'src/interfaces/Rent.interface';
import { RentApi } from 'src/api/RentApi';

interface Column {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'center' | 'right';
}

const columns = ref<Column[]>([
  {
    name: 'renterName',
    label: 'Nome do Locatário',
    field: 'renterName',
    align: 'center',
  },
  {
    name: 'bookName',
    label: 'Nome do Livro',
    field: 'bookName',
    align: 'center',
  },
  {
    name: 'devolutionDate',
    label: 'Data Devolução',
    field: 'devolutionDate',
    align: 'center',
  },
  {
    name: 'deadLineDate',
    label: 'Limite Entrega',
    field: 'deadLineDate',
    align: 'center',
  },
  {
    name: 'rentDate',
    label: 'Data Aluguel',
    field: 'rentDate',
    align: 'center',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  },
]);

const rentsList = ref<RentList[]>([]);

const request: Parameters = {
  search: '',
  page: 0,
  size: 10,
  sort: 'id',
  direction: 'DESC',
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
  getRents();
};

async function getRents() {
  const response = await RentApi.getRentsList(request);
  rentsList.value = response.content;
}

onMounted(() => {
  getRents();
});
</script>

<style scoped></style>
