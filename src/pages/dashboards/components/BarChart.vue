<template>
  <apexchart type="bar" :options="options" :series="series"></apexchart>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCssVar } from 'quasar';
import { DashboardApi } from 'src/api/DashboardApi';

const options = ref({
  title: {
    text: 'Livros devolvidos dentro e fora do prazo',
    align: 'left',
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: getCssVar('primary'),
    },
  },
  chart: {
    id: 'apex-bar',
    toolbar: {
      show: false,
    },
  },
  colors: [getCssVar('primary'), getCssVar('negative')],
  xaxis: {
    categories: ['Dentro do Prazo', 'Fora do Prazo'],
    labels: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '55%',
      endingShape: 'rounded',
      distributed: true,
    },
  },
  legend: {
    show: true,
    position: 'bottom',
    labels: {
      colors: '#000',
    },
  },
  dataLabels: {
    enabled: true,
  },
  yaxis: {
    max: 100,
    labels: {
      formatter: (value: number) => value.toFixed(0),
    },
  },
});

const series = ref([
  {
    name: 'Devoluções',
    data: [75, 15],
  },
]);

async function refoundInformations() {
  const { valueDeliver, valueDeliverDelay } =
    await DashboardApi.getRefundInformation();

  series.value[0].data = [valueDeliver, valueDeliverDelay];
}

onMounted(() => {
  refoundInformations();
});
</script>
