<template>
  <div>
    <h1>수입 등록</h1>
    <div v-if="isLoading">Loding</div>

    <div v-else>
      분류 :
      <select v-model="incomeSelect">
        <option
          v-for="option in incomeCategory"
          :key="option.name"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
      <br />
      메모 :
      <input type="text" v-model="incomeMemo" />
      <br />
      금액 : <input type="text" v-model="income" />
      <button @click="sendIncomeData">수입 등록</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted, computed, watch } from 'vue';

const BASEURL = '/api';
const INCOME_CATEGORY = 'incomeCategory';

const income = ref(0);
const incomeSelect = ref('월급');
const incomeCategory = ref([]);
const incomeMemo = ref('');

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

const fetchIncomeData = async () => {
  incomeCategory.value = await fetchCategory(INCOME_CATEGORY);
  isLoading.value = false;
};

const sendIncomeData = async () => {
  try {
    const incomeData = {
      date: new Date(),
      category: incomeSelect.value,
      amount: income.value,
      memo: incomeMemo.value,
    };

    const sendIncomeRes = await axios.post(BASEURL + `/income`, incomeData);

    if (sendIncomeRes.status !== 201) return alert('수입 등록 실패');

    income.value = 0;
    incomeMemo.value = '';
    return alert('수입 등록 완료');
  } catch (error) {
    alert('수입 fetch 작업 중 ERR 발생');
    console.log(error);
  }
};

onMounted(() => {
  fetchIncomeData();
});
</script>
