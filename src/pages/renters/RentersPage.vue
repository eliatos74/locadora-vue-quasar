<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Locatários</h5>
      <div class="header-source">
        <input
          v-model="textSearch"
          @input="searchRenter"
          type="text"
          placeholder="Pesquisar..."
        />
        <button class="add-button">+ Novo</button>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="renters"
        :columns="columns"
        @request="onRequest"
        row-key="id"
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
            <q-btn flat round icon="visibility" color="grey-8" />
            <q-btn flat round icon="edit" color="grey-8" />
            <q-btn flat round icon="delete" color="red-7" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import { RenterApi } from 'src/api/RentersApi';
import { NotifyMessage } from 'src/helpers/Notify';
import { Renter } from 'src/interfaces/Renters.interface';
import { Parameters } from 'src/interfaces/Utils.intrface';
import { onMounted, ref } from 'vue';

const textSearch = ref<string>('');

interface Column {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'center' | 'right';
}

const columns = ref<Column[]>([
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'center',
  },
  {
    name: 'email',
    label: 'E-mail',
    field: 'email',
    align: 'center',
  },
  {
    name: 'telephone',
    label: 'Telefone',
    field: 'telephone',
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  },
]);

const renters = ref<Renter[]>([]);

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
  getRenters();
};

async function getRenters() {
  try {
    const response = await RenterApi.getRentersList(request);
    pagination.value!.rowsNumber = response.totalElements;
    pagination.value!.rowsPerPage = response.pageSize;
    renters.value = response.content;
  } catch (error) {
    console.error(error);
    NotifyMessage.notifyError('Erro ao carregar os locatários');
  }
}

function searchRenter() {
  request.search = textSearch.value;
  getRenters();
}

onMounted(() => {
  getRenters();
});
</script>
<style scoped></style>
