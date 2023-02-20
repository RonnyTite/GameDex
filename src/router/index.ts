import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/homePage',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/homePage',
      },
      {
        path: 'homePage',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: 'library',
        component: () => import('@/views/Library.vue'),
      },
      {
        path: 'account',
        component: () => import('@/views/Account.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
