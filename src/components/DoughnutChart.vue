<template>
  <div>
    <Doughnut v-if="chartDataReady" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps, watch } from 'vue';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Chart.js 플러그인 등록
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

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

const chartDataReady = computed(() => {
  return (
    props.chartData.labels.length > 0 &&
    props.chartData.datasets[0].data.length > 0
  );
});

// 데이터 변화를 감지하고 콘솔에 로그를 남겨서 확인
watch(
  () => props.chartData,
  (newValue) => {
    console.log('Chart data updated:', newValue);
  },
  { deep: true }
);
</script>

<style scoped>
/* 스타일을 추가할 수 있습니다. */
</style>
