<template>
  <apexchart
    height="300"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCssVar } from 'quasar';

const options = ref({
  title: {
    text: 'ApexColumn',
    align: 'left',
  },
  chart: {
    id: 'apex-column',
  },
  colors: [getCssVar('primary'), getCssVar('secondary'), getCssVar('negative')],
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
});

const series = ref([
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
]);
</script>
