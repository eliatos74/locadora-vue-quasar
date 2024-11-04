<template>
  <div class="header">
    <h5>Dashboard</h5>
  </div>

  <div class="q-pa-md card-container">
    <div class="top-card">
      <q-card class="my-card-top">
        <q-card-section class="ranking-section">
          <RankingBook />
        </q-card-section>
      </q-card>
    </div>
    <div class="bottom-cards">
      <q-card class="my-card-bottom">
        <q-card-section style="height: 450px; width: 614px">
          <BarChart />
        </q-card-section>
      </q-card>
      <q-card class="my-card-bottom">
        <q-card-section style="padding: 5px">
          <SummaryLoans />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import RankingBook from './components/RankingBook.vue';
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
  width: calc(614px * 2 + 20px);
}

.bottom-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.my-card-top {
  width: 100%;
}

.my-card-bottom {
  min-width: 400px;
  min-height: 400px;
}

.ranking-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
