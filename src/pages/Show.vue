<template>
  <div>
    <h1>Expense</h1>
    <div v-if="isLoading">Loding</div>

    <div v-else>
      <!-- 분류 정하기 -->
      분류 :
      <select v-model="expenseCategory">
        <option value="all">전체</option>
        <option
          v-for="option in expenseCategoryArr"
          :key="option.name"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
      <!-- 내역 보여주기 -->
      <ul>
        <li v-for="data in expenseDataArr" :key="data.id">
          {{ data.id }} / {{ data.date }} / {{ data.amount }} / {{ data.memo }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue';

const BASEURL = '/api';
const EXPENSE = 'expense';
const EXPENSECATEGORY = 'expenseCategory';

const expenseCategory = ref('all');
const expenseCategoryArr = ref([]);
const expenseDataArr = ref([]);
const expenseDataArrCopy = ref([]);

const isLoading = ref(true);

async function fetchCategory(category) {
  try {
    const fetchCategoryRes = await axios.get(BASEURL + `/${category}`);

    if (fetchCategoryRes.status !== 200) return alert(`${category} fetch 실패`);

    return fetchCategoryRes.data;
  } catch (error) {
    alert('${category} fetch 작업 중 ERR 발생');
    console.log(error);
  }
}

async function fetchExpenseData() {
  try {
    const fetchExpenseDataRes = await axios.get(BASEURL + EXPENSE);

    if (fetchExpenseDataRes.status !== 200)
      return alert('expenseData fetch 실패');

    return fetchExpenseDataRes.data;
  } catch (error) {
    alert('expenseData fetch 작업 중 ERR 발생');
    console.log(error);
  }
}

const fetchShowData = async () => {
  expenseCategoryArr.value = await fetchCategory(EXPENSECATEGORY);
  expenseDataArr.value = await fetchExpenseData();
  expenseDataArrCopy.value = expenseDataArr.value;
  isLoading.value = false;
};

watch(
  () => expenseCategory.value,
  () => {
    if (expenseCategory.value === 'all') return fetchShowData();
    expenseDataArr.value = expenseDataArrCopy.value.filter(
      (item) => item.category === expenseCategory.value
    );
  }
);

onMounted(() => {
  fetchShowData();
});
</script>
