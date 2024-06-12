import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';
import { data } from '@/assets/chartConfig';

export const useAccountBookStore = defineStore('accountBook', () => {
  const state = reactive({
    income: [],
    expense: [],
    graphData: [],
  });

  // localhost:3000
  const BASEURL_INCOME = '/api/income';
  const BASEURL_EXPENSE = '/api/expense';
  const BASEURL_GRAPH = '/api/graphData';

  async function fetchIncomeData() {
    try {
      const fetchIncomeDataRes = await axios.get(BASEURL_INCOME);

      state.income = fetchIncomeDataRes.data;
    } catch (error) {
      alert('TodoList 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  async function fetchExpenseData() {
    try {
      const fetchExpenseDataRes = await axios.get(BASEURL_EXPENSE);

      state.expense = fetchExpenseDataRes.data;
    } catch (error) {
      alert('TodoList 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  async function fetchGraphData() {
    try {
      const fetchIncomeDataRes = await axios.get(BASEURL_GRAPH);

      state.graphData = fetchIncomeDataRes.data;
    } catch (error) {
      alert('TodoList 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  const accountBookIncome = computed(() => state.income);
  const accountBookExpense = computed(() => state.expense);
  const graphData = computed(() => state.graphData);

  return {
    accountBookIncome,
    accountBookExpense,
    graphData,
    fetchIncomeData,
    fetchExpenseData,
    fetchGraphData,
  };
});
