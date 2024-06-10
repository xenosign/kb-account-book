<template>
  <div>
    <h1>수입 내역</h1>
    <div v-if="isLoading">Loding</div>

    <div v-else>
      <div>
        <h3>총 수입 : {{ totalIncome }}</h3>
        <h3 v-if="incomeSelect !== '전체'">
          {{ incomeSelect }} 수입 : {{ categoryIncome }}
        </h3>
      </div>

      <div>
        <!-- 분류 정하기 -->
        분류 :
        <select v-model="incomeSelect">
          <option>전체</option>
          <option
            v-for="option in incomeCategory"
            :key="option.name"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
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
      (item) => item.category === incomeSelect.value
    );

    categoryIncome.value = incomeData.value.reduce(
      (acc, cur) => (acc += parseInt(cur.amount)),
      0
    );
  }
);

onMounted(() => {
  fetchShowData();
});
</script>
