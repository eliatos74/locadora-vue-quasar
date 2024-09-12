<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Livros</h5>
      <div class="header-source">
        <input
          v-model="textSearch"
          @input="searchBook"
          type="text"
          placeholder="Pesquisar..."
        />
        <button class="add-button" @click="createBook">+ Novo</button>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="books"
        :columns="columns"
        row-key="id"
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
            <q-btn
              flat
              round
              icon="visibility"
              color="grey-8"
              @click="showBook(props.row)"
            />
            <q-btn
              flat
              round
              icon="edit"
              color="grey-8"
              @click="editBook(props.row)"
            />
            <q-btn
              flat
              round
              icon="delete"
              color="red-7"
              @click="deleteBook(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <DialogRegister v-model="modal"></DialogRegister>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { BookApi } from '../../api/BookApi';

import { Book, Parameters } from '../../interfaces/Books.interface';

import DialogRegister from 'src/components/DialogRegister.vue';

const textSearch = ref<string>('');

const modal = ref(false);

interface Column {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'center' | 'right';
}

const books = ref<Book[]>([]);

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
    name: 'inUseQuantity',
    label: 'Qtd. em uso',
    field: 'inUseQuantity',
    align: 'center',
  },
  {
    name: 'availableQuantity',
    label: 'Qtd. disponivel',
    field: 'availableQuantity',
    align: 'center',
  },
  {
    name: 'totalQuantity',
    label: 'Qtd. total',
    field: 'totalQuantity',
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

async function getBooks() {
  const response = await BookApi.getBooksList(request);
  books.value = response;
}

function createBook() {
  modal.value = true;
  console.log('CRIAÇAO');
}

function showBook(content: Book) {
  console.log(content);
}

function editBook(content: Book) {
  console.log(content);
}

function deleteBook(content: Book) {
  console.log(content);
}

function searchBook() {
  request.search = textSearch.value;
  getBooks();
}

onMounted(() => {
  getBooks();
});
</script>

<style scoped></style>
