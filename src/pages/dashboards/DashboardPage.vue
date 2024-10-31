<template>
  <div class="header">
    <h5>Dashboard</h5>
  </div>

  <div class="q-pa-md card-container">
    <!-- <div class="top-card">
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
    </div> -->
    <div class="bottom-cards">
      <q-card class="my-card-bottom">
        <q-card-section>
          <BarChart />
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section style="padding: 5px"><SummaryLoans /> </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import SummaryLoans from './components/SummaryLoans.vue';

import { defineAsyncComponent } from 'vue';

const BarChart = defineAsyncComponent(
  () => import('src/pages/dashboards/components/BarChart.vue')
);
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.top-card {
  display: flex;
  justify-content: center;
}

.bottom-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.my-card-bottom {
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 400px;
}
</style>
