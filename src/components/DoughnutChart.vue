<!-- DoughnutChart.vue -->
<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { defineProps, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  data as chartDataConfig,
  options as chartOptionsConfig,
} from '@/assets/chartConfig';

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

if (props.chartData) {
  console.log('!!');
}

watch(props.chartData, () => {
  console.log(props.chartData);
});
</script>
