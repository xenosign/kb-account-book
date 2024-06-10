<template>
  <div>
    <h1>Expense</h1>
    <div v-if="isLoading">Loding</div>

    <div v-else>
      분류 :
      <select v-model="expenseCategory">
        <option
          v-for="option in expenseCategoryArr"
          :key="option.name"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
      <br />
      메모 :
      <input type="text" v-model="expenseMemo" />
      <br />
      금액 : <input type="text" v-model="expense" />
      <button @click="sendExpenseData">지출 등록</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';

const BASEURL = '/api';
const EXPENSECATEGORY = 'expenseCategory';

const expense = ref(0);
const expenseCategory = ref('');
const expenseCategoryArr = ref([]);
const expenseMemo = ref('');

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

const fetchExpenseData = async () => {
  expenseCategoryArr.value = await fetchCategory(EXPENSECATEGORY);

  isLoading.value = false;
};

const sendExpenseData = async () => {
  try {
    const expenseData = {
      date: new Date(),
      category: expenseCategory.value,
      amount: expense.value,
      memo: expenseMemo.value,
    };

    const sendExpenseRes = await axios.post(BASEURL + `/expense`, expenseData);

    if (sendExpenseRes.status !== 201) return alert('지출 등록 실패');

    expenseCategory.value = '';
    expense.value = 0;
    expenseMemo.value = '';
    return alert('지출 등록 완료');
  } catch (error) {
    alert('${category} fetch 작업 중 ERR 발생');
    console.log(error);
  }
};

onMounted(() => {
  fetchExpenseData();
});
</script>
