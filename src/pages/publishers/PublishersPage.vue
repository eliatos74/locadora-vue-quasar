<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Editoras</h5>
      <div class="header-source">
        <input
          v-model="textSearch"
          @input="searchPublisher"
          type="text"
          placeholder="Pesquisar..."
        />
        <button class="add-button" @click="showModalCreate">+ Novo</button>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="publishers"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        @request="onRequest"
        :rows-per-page-options="[10, 20, 30, 40, 50]"
        no-data-label="Nenhum registro encontrado"
        rows-per-page-label="Registros por página :"
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
              @click="deletePublisher(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <DialogCreatePublisher
    v-model="modalCreate"
    :modalWithoutError="modalWithoutError"
    @submit="createPublisher"
  />
  <DialogEditPublisher
    v-model="modalEdit"
    :publi="publisher"
    :modalWithoutError="modalWithoutError"
    @submit="editPublisher"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Publisher, Parameters } from '../../interfaces/Publishers.interface';
import { PublisherApi } from '../../api/PublisherApi';
import DialogEditPublisher from './components/DialogEditPublisher.vue';
import DialogCreatePublisher from './components/DialogCreatePublisher.vue';
import { handleError } from 'src/helpers/Errors';
import { NotifyMessage } from 'src/helpers/Notify';
import { QTableProps } from 'quasar';

const textSearch = ref<string>('');

const modalCreate = ref(false);
const modalEdit = ref(false);
const modalWithoutError = ref(false);

interface Column {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'center' | 'right';
}

const publisher = ref<Publisher>();

const publishers = ref<Publisher[]>([]);

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
    name: 'site',
    label: 'Site',
    field: 'site',
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
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

function showModalCreate() {
  modalCreate.value = true;
}

function showModalEdit(publisherRow: Publisher) {
  modalEdit.value = true;
  publisher.value = publisherRow;
}

async function getPublishers() {
  try {
    const response = await PublisherApi.getPublishersList(request);
    pagination.value!.rowsNumber = response.totalElements;
    pagination.value!.rowsPerPage = response.pageSize;
    publishers.value = response.content;
  } catch (error) {
    NotifyMessage.notifyError('Erro ao carregar as editoras');
  }
}

const onRequest: QTableProps['onRequest'] = function (props) {
  const { page, rowsPerPage } = props.pagination;

  console.log(page, rowsPerPage);

  request.page = page - 1;
  request.size = rowsPerPage;
  getPublishers();
};

async function createPublisher(params: Publisher) {
  try {
    const response = await PublisherApi.createPublisher(params);
    console.log(response);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Edidora cadastrada com sucesso!');
    getPublishers();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function editPublisher(params: Publisher) {
  try {
    const response = await PublisherApi.updatePublisher(params);
    console.log(response);
    NotifyMessage.notifySuccess('Edidora editada com sucesso!');
    getPublishers();
  } catch (error) {
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function deletePublisher(params: Publisher) {
  console.log(params);
}

function searchPublisher() {
  request.search = textSearch.value;
  getPublishers();
}

onMounted(() => {
  getPublishers();
});
</script>

<style scoped></style>
