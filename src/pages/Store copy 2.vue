<template>
  <div>
    <h1>Store</h1>
    <DoughnutChart :data="graphData" />
    <h2>수입</h2>
    <ul>
      <li v-for="data in accountBookIncome" :key="data.id">
        {{ data.id }} / {{ data.date }} / {{ data.amount }} /
        {{ data.memo }}
      </li>
    </ul>
    <h2>지출</h2>
    <ul>
      <li v-for="data in accountBookExpense" :key="data.id">
        {{ data.id }} / {{ data.date }} / {{ data.amount }} /
        {{ data.memo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onUpdated, onMounted, watch } from 'vue';
import { useAccountBookStore } from '@/stores/account.js';
import DoughnutChart from '@/components/DoughnutChart.vue';

const accountBookStore = useAccountBookStore();
const { fetchIncomeData, fetchExpenseData, fetchGraphData } = accountBookStore;

const accountBookIncome = computed(() => accountBookStore.accountBookIncome);
const accountBookExpense = computed(() => accountBookStore.accountBookExpense);
const graphData = computed(() => accountBookStore.graphData);

onMounted(() => {
  fetchIncomeData();
  fetchExpenseData();
  fetchGraphData();
});

watch(
  () => graphData.value,
  (newData) => {
    graphData.value = [...newData.map((item) => item.data)];
  }
);
</script>
