import Home from '@/pages/Home.vue';
import Show from '@/pages/Show.vue';
import Income from '@/pages/Income.vue';
import Expense from '@/pages/Expense.vue';
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
      path: '/show',
      name: 'show',
      component: Show,
    },
    {
      path: '/expense',
      name: 'expense',
      component: Expense,
    },
  ],
});

export default router;
