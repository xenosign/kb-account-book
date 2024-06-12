<template>
  <div>
    <div class="title">가장 많은 지출을 한 카테고리는</div>
    <div class="title">
      <span class="emphasis">{{ mostSpentCategory }}</span
      >입니다!
    </div>

    <DoughnutChart :chart-data="chartData" :chart-options="chartOptions" />

    <ul class="categoryList">
      <li v-for="expenses in reactiveExpensesArray" :key="expenses.category">
        <span class="circle" :style="{ backgroundColor: expenses.color }">
          {{ expenses.percentage }}%
        </span>
        <span class="categoryName categoryText">{{ expenses.category }}</span>
        <span class="categoryText">{{ expenses.amount.toLocaleString() }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useAccountBookStore } from '@/stores/accountBook.js';
import DoughnutChart from '@/components/DoughnutChart.vue';
import {
  data as chartDataConfig,
  options as chartOptionsConfig,
} from '@/assets/chartConfig';

// Store에서 데이터 가져오기
const accountBookStore = useAccountBookStore();
const { fetchExpenseData } = accountBookStore;

// 반응형 변수들
const mostSpentCategory = ref('');
const totalAmount = ref(0);
const chartData = reactive({ ...chartDataConfig });
const chartOptions = reactive(chartOptionsConfig);

const reactiveExpensesArray = reactive([
  { category: '식비', amount: 0, color: '#0DC9B9', percentage: 0 },
  { category: '교통비', amount: 0, color: '#FFE70E', percentage: 0 },
  { category: '적금', amount: 0, color: '#41B6E8', percentage: 0 },
  { category: '쇼핑', amount: 0, color: '#E982AD', percentage: 0 },
  { category: '이체', amount: 0, color: '#9771EF', percentage: 0 },
]);

function updateData() {
  // 카테고리별 지출 계산
  const foodExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '식비')
    .reduce((acc, cur) => acc + parseInt(cur.amount), 0);
  const transportationExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '교통비')
    .reduce((acc, cur) => acc + parseInt(cur.amount), 0);
  const savingsExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '적금')
    .reduce((acc, cur) => acc + parseInt(cur.amount), 0);
  const shoppingExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '쇼핑')
    .reduce((acc, cur) => acc + parseInt(cur.amount), 0);
  const transferExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '이체')
    .reduce((acc, cur) => acc + parseInt(cur.amount), 0);

  // 배열 업데이트
  reactiveExpensesArray.find((item) => item.category === '식비').amount =
    foodExpenses;
  reactiveExpensesArray.find((item) => item.category === '교통비').amount =
    transportationExpenses;
  reactiveExpensesArray.find((item) => item.category === '적금').amount =
    savingsExpenses;
  reactiveExpensesArray.find((item) => item.category === '쇼핑').amount =
    shoppingExpenses;
  reactiveExpensesArray.find((item) => item.category === '이체').amount =
    transferExpenses;

  totalAmount.value =
    foodExpenses +
    transportationExpenses +
    savingsExpenses +
    shoppingExpenses +
    transferExpenses;

  // 퍼센티지 계산
  reactiveExpensesArray.forEach((expense) => {
    expense.percentage = Math.round((expense.amount / totalAmount.value) * 100);
  });

  mostSpentCategory.value = reactiveExpensesArray.sort(
    (a, b) => b.amount - a.amount
  )[0].category;

  // 차트 데이터 업데이트
  chartData.labels = reactiveExpensesArray.map((expense) => expense.category);
  chartData.datasets[0].data = reactiveExpensesArray.map(
    (expense) => expense.amount
  );
}

// 데이터 페치 및 업데이트
onMounted(async () => {
  await fetchExpenseData();
  updateData();
});

// 데이터 변경 감지 및 업데이트
watch(
  () => accountBookStore.accountBookExpenses,
  () => {
    updateData();
  },
  { immediate: true }
);
</script>

<style>
.title {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #504e64;
  margin: 8px 0px;
}
.emphasis {
  font-weight: 700;
  font-size: 25px;
  color: #0dc9b9;
}
.categoryList {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  width: 100%;
  text-align: left;
}
.categoryList li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
}
.circle {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.categoryName {
  flex-grow: 1;
  padding-left: 10px;
}
.categoryText {
  font-size: 18px;
  color: #504e64;
}
</style>
