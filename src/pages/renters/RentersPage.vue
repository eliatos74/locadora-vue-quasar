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
        <button class="add-button" @click="openCreateModal">+ Novo</button>
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
            <q-btn
              flat
              round
              icon="visibility"
              color="grey-8"
              @click="showModalView(props.row)"
            />
            <q-btn
              flat
              round
              icon="edit"
              color="grey-8"
              @click="showModalEdit(props.row)"
            />
            <q-btn
              flat
              round
              icon="delete"
              color="red-7"
              @click="showModalDelete(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <DialogCreateRenter
    v-model="ModalCreate"
    @submit="createRenter"
    :modalWithoutError="modalWithoutError"
  />
  <DialogEditRenter
    v-model="ModalEdit"
    :renter-edit="renter"
    @submit="editRenter"
    :modal-without-error="modalWithoutError"
  />
  <DialogViewRenter v-model="modalView" :renterView="renter" />
  <DialogDeleteRenter
    v-model="modalDelete"
    :renter-delete="renter"
    @submit="deleteRenter"
    :modal-without-error="modalWithoutError"
  />
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import { RenterApi } from 'src/api/RentersApi';
import { NotifyMessage } from 'src/helpers/Notify';
import { Renter } from 'src/interfaces/Renters.interface';
import { Parameters } from 'src/interfaces/Utils.intrface';
import { onMounted, ref } from 'vue';
import DialogCreateRenter from './components/DialogCreateRenter.vue';
import { handleError } from 'src/helpers/Errors';
import DialogEditRenter from './components/DialogEditRenter.vue';
import DialogViewRenter from './components/DialogViewRenter.vue';
import DialogDeleteRenter from './components/DialogDeleteRenter.vue';

import { useQuasar } from 'quasar';
const $q = useQuasar();

const ModalCreate = ref(false);
const ModalEdit = ref(false);
const modalView = ref(false);
const modalDelete = ref(false);
const textSearch = ref<string>('');
const modalWithoutError = ref(false);

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
const renter = ref<Renter>();

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
    modalWithoutError.value = false;
  } catch (error) {
    console.error(error);
    NotifyMessage.notifyError('Erro ao carregar os locatários');
  }
}

function openCreateModal() {
  ModalCreate.value = true;
}

async function createRenter(renter: Renter) {
  try {
    await RenterApi.createRenter(renter);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Locatário  cadastrado com sucesso!');
    getRenters();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function showModalEdit(renterRow: Renter) {
  ModalEdit.value = true;
  const response = await RenterApi.getRenterId(renterRow.id!);
  renter.value = response.data;
}

async function editRenter(renter: Renter) {
  try {
    await RenterApi.updateRenter(renter);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Locatário editado com sucesso!');
    getRenters();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function showModalView(renterRow: Renter) {
  modalView.value = true;
  const response = await RenterApi.getRenterId(renterRow.id!);
  renter.value = response.data;
}

async function showModalDelete(renterRow: Renter) {
  modalDelete.value = true;
  renter.value = renterRow;
}

async function deleteRenter(id: number) {
  try {
    await RenterApi.deleteRenter(id);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Locatário excluido com sucesso!');
    getRenters();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

function searchRenter() {
  request.search = textSearch.value;
  getRenters();
}

async function loadRentersScreen() {
  $q.loading.show();
  try {
    await getRenters();
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
}

onMounted(async () => {
  loadRentersScreen();
});
</script>
<style scoped></style>
