<!-- DoughnutChart.vue -->
<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { defineProps, watch, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const chartData = ref({
  labels: ['식비', '교통비', '적금', '쇼핑', '이체'],
  datasets: [
    {
      data: [1, 1, 1, 1, 1],
      backgroundColor: ['#FFE70E', '#0DC9B9', '#41B6E8', '#E982AD', '#9771EF'],
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
};

watch(
  () => props.data,
  (newData) => {
    chartData.value.datasets[0].data = newData.map((item) => item.data);
    console.log(chartData);
  }
);
</script>
