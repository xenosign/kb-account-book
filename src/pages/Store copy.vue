<template>
  <div>
    <h1>Store</h1>
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
import { ref, reactive, computed, onUpdated } from 'vue';
import { useAccountBookStore } from '@/stores/account.js';

const accountBookStore = useAccountBookStore();
const { fetchIncomeData, fetchExpenseData } = accountBookStore;

fetchIncomeData();
fetchExpenseData();

const accountBookIncome = computed(() => accountBookStore.accountBookIncome);
const accountBookExpense = computed(() => accountBookStore.accountBookExpense);
</script>
