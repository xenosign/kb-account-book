import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useAccountBookStore = defineStore('accountBook', () => {
  const state = reactive({
    income: [],
    expense: [],
  });

  // localhost:3000
  const BASEURL_INCOME = '/api/income';
  const BASEURL_EXPENSE = '/api/expense';

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

  const accountBookIncome = computed(() => state.income);
  const accountBookExpense = computed(() => state.expense);

  return {
    accountBookIncome,
    accountBookExpense,
    fetchIncomeData,
    fetchExpenseData,
  };
});
