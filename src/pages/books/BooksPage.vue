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
  <DialogCreateBook
    v-model="ModalCreate"
    @submit="createBook"
    :modalWithoutError="modalWithoutError"
  />
  <DialogEditBook
    v-model="ModalEdit"
    :bookEdit="bookEdit"
    :modalWithoutError="modalWithoutError"
    @submit="editBook"
  />
  <DialogViewBook v-model="ModalView" :book-view="book" />
  <DialogDeleteBook
    v-model="ModalDelete"
    :bookDelete="book"
    :modalWithoutError="modalWithoutError"
    @submit="deleteBook"
  />
</template>

<script setup lang="ts">
import { BookApi } from 'src/api/BookApi';
import { Book, BookInfo, ParametersBook } from 'src/interfaces/Books.interface';
import { ref, onMounted } from 'vue';
import DialogCreateBook from './components/DialogCreateBook.vue';
import DialogEditBook from './components/DialogEditBook.vue';
import DialogViewBook from './components/DialogViewBook.vue';
import DialogDeleteBook from './components/DialogDeleteBook.vue';
import { NotifyMessage } from 'src/helpers/Notify';
import { handleError } from 'src/helpers/Errors';
import { QTableProps } from 'quasar';

const ModalCreate = ref(false);
const ModalEdit = ref(false);
const ModalView = ref(false);
const ModalDelete = ref(false);

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

const bookEdit = ref<BookInfo>();
const book = ref<BookInfo>();

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
    modalWithoutError.value = false;
  } catch (error) {
    NotifyMessage.notifyError('Erro ao carregar os livros');
  }
}

function openCreateModal() {
  ModalCreate.value = true;
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

async function showModalEdit(bookRow: Book) {
  ModalEdit.value = true;
  const response = await BookApi.getBookId(bookRow.id!);
  bookEdit.value = response.data;
}

async function editBook(book: Book) {
  try {
    await BookApi.updateBook(book);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Livro editado com sucesso!');
    getBooks();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function showModalView(bookRow: Book) {
  ModalView.value = true;
  const response = await BookApi.getBookId(bookRow.id!);
  book.value = response.data;
}

async function showModalDelete(bookRow: BookInfo) {
  ModalDelete.value = true;
  book.value = bookRow;
  console.log(book.value);
}

async function deleteBook(id: number) {
  try {
    await BookApi.deleteBook(id);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Livro excluido com sucesso!');
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
