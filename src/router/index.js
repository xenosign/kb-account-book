import Home from '@/pages/Home.vue';

import Income from '@/pages/Income.vue';
import ShowIncome from '@/pages/ShowIncome.vue';
import Expense from '@/pages/Expense.vue';
import ShowExpense from '@/pages/ShowExpense.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/income',
      name: 'income',
      component: Income,
    },
    {
      path: '/showIncome',
      name: 'showIncome',
      component: ShowIncome,
    },
    {
      path: '/showExpense',
      name: 'showExpense',
      component: ShowExpense,
    },
    {
      path: '/expense',
      name: 'expense',
      component: Expense,
    },
  ],
});

export default router;
