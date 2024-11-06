<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Editoras</h5>
      <div class="css-buttons">
        <SearchInput v-model="textSearch" @search-input="searchPublisher" />
        <ButtonNew
          v-if="!Role.isVisitor()"
          @open-create-modal="showModalCreate"
        />
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
              v-if="!Role.isVisitor()"
              flat
              round
              icon="edit"
              color="grey-8"
              @click="showModalEdit(props.row)"
            />
            <q-btn
              v-if="!Role.isVisitor()"
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
  <DialogViewPublisher
    v-model="modalView"
    :publi="publisher"
    :modalWithoutError="modalWithoutError"
  />
  <DialogDeletePublisher
    v-model="modalDelete"
    :publisher="publisher"
    :modalWithoutError="modalWithoutError"
    @submit="deletePublisher"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Publisher } from '../../interfaces/Publishers.interface';
import { Parameters } from 'src/interfaces/Utils.intrface';
import { PublisherApi } from '../../api/PublisherApi';
import DialogEditPublisher from './components/DialogEditPublisher.vue';
import DialogCreatePublisher from './components/DialogCreatePublisher.vue';
import DialogViewPublisher from './components/DialogViewPublisher.vue';
import DialogDeletePublisher from './components/DialogDeletePublisher.vue';
import SearchInput from 'src/components/SearchInput.vue';
import ButtonNew from 'src/components/ButtonNew.vue';
import { handleError } from 'src/helpers/Errors';
import { NotifyMessage } from 'src/helpers/Notify';
import { QTableProps } from 'quasar';

import { useQuasar } from 'quasar';
import { Role } from 'src/helpers/Role';
const $q = useQuasar();

const textSearch = ref<string>('');

const modalCreate = ref(false);
const modalEdit = ref(false);
const modalView = ref(false);
const modalDelete = ref(false);

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

function showModalView(publisherRow: Publisher) {
  modalView.value = true;
  publisher.value = publisherRow;
}

function showModalDelete(publisherRow: Publisher) {
  modalDelete.value = true;
  publisher.value = publisherRow;
}

async function getPublishers() {
  try {
    const response = await PublisherApi.getPublishersList(request);
    pagination.value!.rowsNumber = response.totalElements;
    pagination.value!.rowsPerPage = response.pageSize;
    publishers.value = response.content;
    modalWithoutError.value = false;
  } catch (error) {
    NotifyMessage.notifyError('Erro ao carregar as editoras');
  }
}

const onRequest: QTableProps['onRequest'] = function (props) {
  const { page, rowsPerPage } = props.pagination;

  request.page = page - 1;
  request.size = rowsPerPage;
  pagination.value!.page = page;
  pagination.value!.rowsPerPage = rowsPerPage;
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
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Edidora editada com sucesso!');
    getPublishers();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function deletePublisher(id: number) {
  try {
    await PublisherApi.deletePublisher(id);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Editora excluida com sucesso!');
    getPublishers();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

function searchPublisher() {
  request.search = textSearch.value;
  getPublishers();
}

async function loadPublisherScreen() {
  $q.loading.show();
  try {
    await getPublishers();
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  loadPublisherScreen();
});
</script>

<style scoped></style>
