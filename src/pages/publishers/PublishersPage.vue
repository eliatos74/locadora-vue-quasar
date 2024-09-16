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
            <q-btn flat round icon="edit" color="grey-8" />
            <q-btn flat round icon="delete" color="red-7" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <DialoCreatePublisher v-model="modal" @submit="createPublisher" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Publisher, Parameters } from '../../interfaces/Publishers.interface';

import { PublisherApi } from '../../api/PublisherApi';

import DialoCreatePublisher from './components/DialogCreatePublisher.vue';

const textSearch = ref<string>('');

const modal = ref(false);

interface Column {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'center' | 'right';
}

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

function showModalCreate() {
  modal.value = true;
}

async function getPublishers() {
  const response = await PublisherApi.getPublishersList(request);
  publishers.value = response;
}

async function createPublisher(publisher: Publisher) {
  try {
    const response = await PublisherApi.createPublisher(publisher);
    console.log(response);
    getPublishers();
  } catch (error) {
    console.log(error);
  }
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
