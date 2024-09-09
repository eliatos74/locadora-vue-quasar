import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: () => import('pages/LoginPage.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'rents', component: () => import('pages/RentsPage.vue') },
      { path: 'books', component: () => import('pages/BooksPage.vue') },
      {
        path: 'publishers',
        component: () => import('pages/PublishersPage.vue'),
      },
      { path: 'tenants', component: () => import('pages/TenantsPage.vue') },
      { path: 'users', component: () => import('pages/UsersPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
