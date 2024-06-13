<template>
  <div>
    <DoughnutChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DoughnutChart from '@/components/DoughnutChart.vue';

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Data',
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ],
      data: [],
    },
  ],
});

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/chartData');
    const data = response.data;
    chartData.value.labels = data.map((item) => item.label);
    chartData.value.datasets[0].data = data.map((item) => item.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const chartOptions = ref({
  plugins: {
    legend: {
      position: 'top',
      labels: {
        padding: 20, // 레이블과 레이블 사이의 간격 설정
      },
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  responsive: true,
  // maintainAspectRatio: false,
  animation: {
    animateScale: true,
    animateRotate: true,
  },
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* 스타일을 추가할 수 있습니다. */
</style>
