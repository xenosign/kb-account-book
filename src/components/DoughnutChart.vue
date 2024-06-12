<!-- DoughnutChart.vue -->
<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { defineProps, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    required: true,
  },
});

watch(props.chartData, () => {
  console.log('!!');
});
</script>
