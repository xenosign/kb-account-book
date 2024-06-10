<template>
  <div>
    <h1>지출 내역</h1>
    <div v-if="isLoading">Loding</div>

    <div v-else>
      <div>
        <h3>총 지출 : {{ totalExpense }}</h3>
        <h3 v-if="expenseSelect !== '전체'">
          {{ expenseSelect }} 지출 : {{ categoryExpense }}
        </h3>
      </div>

      <div>
        <!-- 분류 정하기 -->
        분류 :
        <select v-model="expenseSelect">
          <option>전체</option>
          <option
            v-for="option in expenseCategory"
            :key="option.name"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
        <!-- 내역 보여주기 -->
        <ul>
          <li v-for="data in expenseData" :key="data.id">
            {{ data.id }} / {{ data.date }} / {{ data.amount }} /
            {{ data.memo }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue';

const BASEURL = '/api';
const EXPENSE = 'expense';
const EXPENSE_CATEGORY = 'expenseCategory';

const expenseSelect = ref('전체');
const expenseCategory = ref([]);
const expenseData = ref([]);
const expenseDataCopy = ref([]);

const totalExpense = ref(0);
const categoryExpense = ref(0);

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
  expenseCategory.value = await fetchCategory(EXPENSE_CATEGORY);
  expenseData.value = await fetchExpenseData();
  expenseDataCopy.value = expenseData.value;
  totalExpense.value = expenseData.value.reduce(
    (acc, cur) => (acc += parseInt(cur.amount)),
    0
  );
  isLoading.value = false;
};

watch(
  () => expenseSelect.value,
  () => {
    if (expenseSelect.value === '전체') fetchShowData();

    expenseData.value = expenseDataCopy.value.filter(
      (item) => item.category === expenseSelect.value
    );

    categoryExpense.value = expenseData.value.reduce(
      (acc, cur) => (acc += parseInt(cur.amount)),
      0
    );
  }
);

onMounted(() => {
  fetchShowData();
});
</script>
