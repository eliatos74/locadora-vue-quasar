<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Alugueis</h5>
      <div class="header-source">
        <input
          type="text"
          placeholder="Pesquisar..."
          v-model="textSearch"
          @input="searchRenter"
        />
        <button class="add-button" @click="openCreateModal">+ Novo</button>
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
import { QTableProps } from 'quasar';
import { Parameters } from 'src/interfaces/Utils.intrface';
import { RentCreate, RentList } from 'src/interfaces/Rent.interface';
import { RentApi } from 'src/api/RentApi';
import DialogCreateRent from './components/DialogCreateRent.vue';
import { RenterApi } from 'src/api/RentersApi';
import { BookApi } from 'src/api/BookApi';
import { NotifyMessage } from 'src/helpers/Notify';
import { handleError } from 'src/helpers/Errors';

import { useQuasar } from 'quasar';
import DialogDeliverRent from './components/DialogDeliverRent.vue';
const $q = useQuasar();

const renters = ref();
const books = ref();
const textSearch = ref<string>('');

const modalCreate = ref(false);
const modalDeliver = ref(false);

const modalWithoutError = ref(false);

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

const rent = ref<RentList>();

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
}

function searchRenter() {
  request.search = textSearch.value;
  console.log(request);
  getRents();
}

type Status = 'IN_TIME' | 'DELIVERED' | 'DELIVERED_WITH_DELAY' | 'DELAYED';

const colorStatus = computed(() => {
  return {
    IN_TIME: {
      bgColor: 'green',
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
