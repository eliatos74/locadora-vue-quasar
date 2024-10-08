<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Livros</h5>
      <div class="header-source">
        <input type="text" placeholder="Pesquisar..." />
        <button class="add-button" @click="openCreateModal">+ Novo</button>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="books"
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
            <q-btn flat round icon="visibility" color="grey-8" />
            <q-btn flat round icon="edit" color="grey-8" />
            <q-btn flat round icon="delete" color="red-7" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <DialogCreateBook
    v-model="showModalCreate"
    @submit="createBook"
    :modalWithoutError="modalWithoutError"
  />
</template>

<script setup lang="ts">
import { BookApi } from 'src/api/BookApi';
import { Book, ParametersBook } from 'src/interfaces/Books.interface';
import { ref, onMounted } from 'vue';
import DialogCreateBook from './components/DialogCreateBook.vue';
import { NotifyMessage } from 'src/helpers/Notify';
import { handleError } from 'src/helpers/Errors';
import { QTableProps } from 'quasar';

const showModalCreate = ref(false);

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
    name: 'author',
    label: 'Autor',
    field: 'author',
    align: 'center',
  },
  {
    name: 'totalQuantity',
    label: 'Qtd. total',
    field: 'totalQuantity',
    align: 'center',
  },
  {
    name: 'availableQuantity',
    label: 'Qtd. Disponivel',
    field: 'availableQuantity',
    align: 'center',
  },
  {
    name: 'inUseQuantity',
    label: 'Qtd. em uso',
    field: 'inUseQuantity',
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  },
]);

const books = ref<Book[]>([]);

const request: ParametersBook = {
  search: '',
  availableQuantity: '',
  launchDate: '',
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

  console.log(page, rowsPerPage);

  request.page = page - 1;
  request.size = rowsPerPage;
  pagination.value!.page = page;
  pagination.value!.rowsPerPage = rowsPerPage;
  getBooks();
};

async function getBooks() {
  try {
    const response = await BookApi.getBooksList(request);
    pagination.value!.rowsNumber = response.totalElements;
    pagination.value!.rowsPerPage = response.pageSize;
    books.value = response.content;
    console.log(response);
  } catch (error) {
    NotifyMessage.notifyError('Erro ao carregar as livros');
  }
}

function openCreateModal() {
  showModalCreate.value = true;
}

async function createBook(book: Book) {
  try {
    await BookApi.createBook(book);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Livro cadastrado com sucesso!');
    getBooks();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

onMounted(() => {
  getBooks();
});
</script>

<style scoped></style>
