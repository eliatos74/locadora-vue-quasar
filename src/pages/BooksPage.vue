<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Livros</h5>
      <div class="header-source">
        <input type="text" placeholder="Pesquisar..." />
        <button class="add-button">+ Novo</button>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table :rows="books" :columns="columns" row-key="id">
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
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface Book {
  id: number;
  name: string;
  author: string;
  totalQuantity: number;
  availableQuantity: number;
  inUseQuantity: number;
}

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

async function getBooks() {
  const response = await axios.get('/book?page=&size=20&sort=id&direction=ASC');
  books.value = response.data.content;
  console.log(response.data.content);
  console.log(books);
}

onMounted(() => {
  getBooks();
});
</script>

<style scoped></style>
