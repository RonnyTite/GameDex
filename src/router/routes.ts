import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/AppLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/homepage',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/Homepage',
      },
      {
        path: 'homepage',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: 'library',
        component: () => import('@/views/GamesLibrary.vue'),
      },
      {
        path: 'search',
        component: () => import('@/views/SearchPage.vue'),
      },
      {
        path: 'account',
        component: () => import('@/views/UserAccount.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
