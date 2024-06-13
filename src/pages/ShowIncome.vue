<template>
  <div>
    <br />
    <h1>수입 내역</h1>
    <div v-if="isLoading">Loding</div>

    <div v-else>
      <div>
        <h3>총 수입 : {{ totalIncome }}</h3>
        <h3 v-if="incomeSelect !== '전체'">
          {{ monthSelect }} 수입 : {{ categoryIncome }}
        </h3>
      </div>
      <br />
      <div>
        <div>
          <!-- 분류 정하기 -->
          분류 :
          <select v-model="monthSelect">
            <option>전체</option>
            <option
              v-for="option in incomeCategory"
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
        <br />
        <div>
          <h3>내역</h3>

          <!-- 내역 보여주기 -->
          <ul>
            <li v-for="data in incomeData" :key="data.id">
              {{ data.id }} / {{ data.date }} / {{ data.amount }} /
              {{ data.memo }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue';

const BASEURL = '/api';
const INCOME = 'income';
const INCOME_CATEGORY = 'incomeCategory';

const incomeSelect = ref('전체');
const incomeCategory = ref([]);
const incomeData = ref([]);
const incomeDataCopy = ref([]);
const incomeCategoryDataCopy = ref([]);

const totalIncome = ref(0);
const categoryIncome = ref(0);

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

async function fetchIncomeData() {
  try {
    const fetchIncomeDataRes = await axios.get(BASEURL + INCOME);

    if (fetchIncomeDataRes.status !== 200)
      return alert('incomeData fetch 실패');

    return fetchIncomeDataRes.data;
  } catch (error) {
    alert('incomeData fetch 작업 중 ERR 발생');
    console.log(error);
  }
}

const fetchShowData = async () => {
  incomeCategory.value = await fetchCategory(INCOME_CATEGORY);
  incomeData.value = await fetchIncomeData();
  incomeDataCopy.value = incomeData.value;
  incomeCategoryDataCopy.value = incomeData.value;
  totalIncome.value = incomeDataCopy.value.reduce(
    (acc, cur) => (acc += parseInt(cur.amount)),
    0
  );
  isLoading.value = false;
};

watch(
  () => incomeSelect.value,
  () => {
    if (incomeSelect.value === '전체') return fetchShowData();

    incomeData.value = incomeDataCopy.value.filter(
      (item) => item.category === monthSelect.value
    );

    categoryIncome.value = incomeData.value.reduce(
      (acc, cur) => (acc += parseInt(cur.amount)),
      0
    );
  }
);

const filterPeriod = (period) => {
  if (period === 'day') {
    incomeData.value = incomeCategoryDataCopy.value.filter((item) => {
      const now = new Date();
      const oneDayBefore = now.setDate(now.getDate() - 1);
      const itemDate = new Date(item.date);
      return oneDayBefore < itemDate;
    });
  } else if (period === 'week') {
    incomeData.value = incomeCategoryDataCopy.value.filter((item) => {
      const now = new Date();
      const oneWeekBefore = now.setDate(now.getDate() - 7);
      const itemDate = new Date(item.date);
      return oneWeekBefore < itemDate;
    });
  } else if (period === 'month') {
    incomeData.value = incomeCategoryDataCopy.value.filter((item) => {
      const now = new Date();
      const oneMonthBefore = now.setMonth(now.getMonth() - 1);
      const itemDate = new Date(item.date);
      return oneMonthBefore < itemDate;
    });
  } else {
    incomeData.value = incomeCategoryDataCopy.value;
  }
};

onMounted(() => {
  fetchShowData();
});
</script>
