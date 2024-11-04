<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Alugueis</h5>
      <div class="css-buttons">
        <FilterByStatus
          v-model="selectedStatus"
          :options="options"
          @selected-status="searchSelect"
        />
        <SearchInput v-model="searchText" @search-input="searchInput" />
        <ClearSearchInputs @clear-search-rent="clearSearchRent" />
        <ButtonNew
          v-if="!Role.isVisitor()"
          @open-create-modal="openCreateModal"
        />
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
            <q-btn
              flat
              round
              icon="bookmark_added"
              color="grey-8"
              @click="openModalDeliver(props.row)"
              :disable="
                props.row.status === 'DELIVERED' ||
                props.row.status === 'DELIVERED_WITH_DELAY'
              "
            >
              <template
                v-if="
                  props.row.status === 'DELIVERED' ||
                  props.row.status === 'DELIVERED_WITH_DELAY'
                "
              >
              </template>
              <template v-else>
                <q-tooltip>Entregar Livro</q-tooltip>
              </template>
            </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="colorStatus[props.row.status as Status]?.bgColor"
              text-color="white"
              dense
              :label="colorStatus[props.row.status as Status]?.translatedText"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <DialogCreateRent
    v-model="modalCreate"
    :renters-selects="renters"
    :books-selects="books"
    @submit="creatRent"
    :modal-without-error="modalWithoutError"
  />
  <DialogDeliverRent
    v-model="modalDeliver"
    :rent="rent"
    :modal-without-error="modalWithoutError"
    @submit="rentDeliver"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { QTableColumn, QTableProps } from 'quasar';
import {
  ParametersRent,
  RentCreate,
  RentList,
} from 'src/interfaces/Rent.interface';
import { RentApi } from 'src/api/RentApi';
import DialogCreateRent from './components/DialogCreateRent.vue';
import { RenterApi } from 'src/api/RentersApi';
import { BookApi } from 'src/api/BookApi';
import { NotifyMessage } from 'src/helpers/Notify';
import { handleError } from 'src/helpers/Errors';

import { useQuasar } from 'quasar';
import DialogDeliverRent from './components/DialogDeliverRent.vue';
import ClearSearchInputs from 'src/components/ClearSearchInputs.vue';
import SearchInput from 'src/components/SearchInput.vue';
import FilterByStatus from 'src/components/FilterByStatus.vue';
import { Options } from 'src/interfaces/Utils.intrface';
import ButtonNew from 'src/components/ButtonNew.vue';
import { Role } from 'src/helpers/Role';
const $q = useQuasar();

const renters = ref();
const books = ref();
const searchText = ref<string>('');

const modalCreate = ref(false);
const modalDeliver = ref(false);

const modalWithoutError = ref(false);

const selectedStatus = ref<string>('');

// interface Column {
//   name: string;
//   label: string;
//   field: string;
//   align: 'left' | 'center' | 'right';
// }

const columns = ref<QTableColumn[]>([
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
    format: (value) =>
      value
        ? new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })
        : '',
  },
  {
    name: 'deadLineDate',
    label: 'Limite Entrega',
    field: 'deadLineDate',
    align: 'center',
    format: (value) =>
      new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      }),
  },
  {
    name: 'rentDate',
    label: 'Data Aluguel',
    field: 'rentDate',
    align: 'center',
    format: (value) =>
      new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      }),
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'center',
  },
]);

if (Role.columnActions()) {
  columns.value.push({
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  });
}

const rent = ref<RentList>();

const rentsList = ref<RentList[]>([]);

const request: ParametersRent = {
  search: '',
  status: '',
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
  try {
    const response = await RentApi.getRentsList(request);
    pagination.value!.rowsNumber = response.totalElements;
    pagination.value!.rowsPerPage = response.pageSize;
    rentsList.value = response.content;
    modalWithoutError.value = false;
  } catch (error) {
    console.error(error);
    NotifyMessage.notifyError('Erro ao carregar os alugueis!');
  }
}

async function loadSelects() {
  $q.loading.show();
  const responseRenters = await RenterApi.getRentersSelect();
  const responseBooks = await BookApi.getBooksSelect();
  renters.value = responseRenters;
  books.value = responseBooks;
  $q.loading.hide();
}

function openCreateModal() {
  modalCreate.value = true;
}

async function creatRent(rentCreate: RentCreate) {
  try {
    await RentApi.createRent(rentCreate);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Aluguel criado com sucesso!');
    getRents();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

function openModalDeliver(rentRow: RentList) {
  modalDeliver.value = true;
  rent.value = rentRow;
}

async function rentDeliver(id: number) {
  console.log(id);
  await RentApi.deliverRent(id);
  modalWithoutError.value = true;
  NotifyMessage.notifySuccess('Livro entregue com sucesso!');
  getRents();
  try {
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

type Status = 'IN_TIME' | 'DELIVERED' | 'DELIVERED_WITH_DELAY' | 'DELAYED';

const colorStatus = computed(() => {
  return {
    IN_TIME: {
      bgColor: 'green',
      text: 'IN_TIME',
      translatedText: 'Em Tempo',
    },
    DELIVERED: {
      bgColor: 'blue-7',
      translatedText: 'Entregue',
    },
    DELIVERED_WITH_DELAY: {
      bgColor: 'red',
      translatedText: 'Entrgue com Atraso',
    },
    DELAYED: {
      bgColor: 'orange',
      translatedText: 'Atrasado',
    },
  };
});

const options: Options[] = [
  { label: 'Em Tempo', value: 'IN_TIME' },
  { label: 'Entregue', value: 'DELIVERED' },
  { label: 'Entregue com Atraso', value: 'DELIVERED_WITH_DELAY' },
  { label: 'Atrasado', value: 'DELAYED' },
];

function searchSelect(selectedStatus: string) {
  request.status = selectedStatus;
  getRents();
}

function searchInput(textSearch: string) {
  request.search = textSearch;
  getRents();
}

function clearSearchRent() {
  searchText.value = '';
  selectedStatus.value = '';
  searchSelect(searchText.value);
  searchInput(selectedStatus.value);
  getRents();
}

async function loadRentsScreen() {
  $q.loading.show();
  try {
    await getRents();
    await loadSelects();
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  loadRentsScreen();
});
</script>

<style scoped></style>
