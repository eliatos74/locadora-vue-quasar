<template>
  <div class="header">
    <h5>Dashboard</h5>
  </div>

  <div class="q-pa-md card-container">
    <div class="top-card">
      <q-card class="my-card-top">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Ranking</div>
          </q-card-section>
        </q-card>
        <q-card-section>
          <q-chip class="glossy" icon="directions" label="Get directions" />
          <q-chip>
            <q-avatar class="glossy" color="green" text-color="white"
              >1</q-avatar
            >
            Livro 01
          </q-chip>
          <q-chip>
            <q-avatar color="green" text-color="white">1</q-avatar>
            Livro 01
          </q-chip>
          <q-chip>
            <q-avatar color="green" text-color="white">1</q-avatar>
            Livro 01
          </q-chip>
        </q-card-section>
      </q-card>
    </div>
    <div class="bottom-cards">
      <q-card class="my-card-bottom">
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card>
      <q-table
        class="my-card-bottom"
        title="Table Title"
        :rows="rentsList"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RentList } from 'src/interfaces/Rent.interface';
import { ref } from 'vue';

const rentsList = ref<RentList[]>([]);

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
]);
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Espaçamento entre as linhas */
}

.top-card {
  display: flex;
  justify-content: center;
}

.bottom-cards {
  display: flex;
  gap: 20px; /* Espaçamento entre os cards */
  justify-content: center;
}

.my-card-bottom {
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 400px;
}
</style>
