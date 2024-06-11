<template>
  <div>
    <br />
    <h1>지출 내역</h1>
    <div v-if="isLoading">Loding</div>

    <div v-else>
      <div>
        <h3>총 지출 : {{ totalExpense }}</h3>
        <h3 v-if="expenseSelect !== '전체'">
          {{ expenseSelect }} 지출 : {{ categoryExpense }}
        </h3>
      </div>
      <br />
      <div>
        <h3>필터</h3>
        <!-- 분류 정하기 -->
        <div>
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
        </div>
        <div>
          기간 :
          <button @click="filterPeriod('day')">일간</button>
          &nbsp;
          <button @click="filterPeriod('week')">주간</button>
          &nbsp;
          <button @click="filterPeriod('month')">월간</button>
          &nbsp;
          <button @click="filterPeriod('all')">전체</button>
        </div>
      </div>
      <br />
      <div>
        <h3>내역</h3>
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
const expenseCategoryDataCopy = ref([]);

const totalExpense = ref(0);
const categoryExpense = ref(0);

const startDate = ref('');
const endDate = ref('');
const startTime = ref(0);
const endTime = ref(0);

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
  expenseCategoryDataCopy.value = expenseData.value;
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

    expenseCategoryDataCopy.value = expenseData.value;

    categoryExpense.value = expenseData.value.reduce(
      (acc, cur) => (acc += parseInt(cur.amount)),
      0
    );
  }
);

watch(
  () => [startDate.value, endDate.value],
  ([newStartDate, newEndDate]) => {
    startTime.value = new Date(newStartDate).getTime();
    endTime.value = new Date(newEndDate).getTime();
  }
);

const filterPeriod = (period) => {
  if (period === 'day') {
    expenseData.value = expenseCategoryDataCopy.value.filter((item) => {
      const now = new Date();
      const oneDayBefore = now.setDate(now.getDate() - 1);
      const itemDate = new Date(item.date);
      return oneDayBefore < itemDate;
    });
  } else if (period === 'week') {
    expenseData.value = expenseCategoryDataCopy.value.filter((item) => {
      const now = new Date();
      const oneWeekBefore = now.setDate(now.getDate() - 7);
      const itemDate = new Date(item.date);
      return oneWeekBefore < itemDate;
    });
  } else if (period === 'month') {
    expenseData.value = expenseCategoryDataCopy.value.filter((item) => {
      const now = new Date();
      const oneMonthBefore = now.setMonth(now.getMonth() - 1);
      const itemDate = new Date(item.date);
      return oneMonthBefore < itemDate;
    });
  } else {
    expenseData.value = expenseCategoryDataCopy.value;
  }
};

onMounted(() => {
  fetchShowData();
});
</script>
