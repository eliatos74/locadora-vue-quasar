import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: () => import('pages/LoginPage.vue') },
  { path: '/profile', component: () => import('src/layouts/ProfilePage.vue') },
  {
    path: '/recoverPassword',
    component: () => import('src/layouts/RecoveryPassword.vue'),
  },
  {
    path: '/newPassword',
    component: () => import('src/layouts/NewPassword.vue'),
  },
  {
    path: '/profile',
    component: () => import('src/pages/profile/ProfilePage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('src/pages/dashboards/DashboardPage.vue'),
      },
      {
        path: 'rents',
        component: () => import('src/pages/rents/RentsPage.vue'),
      },
      {
        path: 'books',
        component: () => import('src/pages/books/BooksPage.vue'),
      },
      {
        path: 'publishers',
        component: () => import('src/pages/publishers/PublishersPage.vue'),
      },
      {
        path: 'renters',
        component: () => import('src/pages/renters/RentersPage.vue'),
      },
      {
        path: 'users',
        component: () => import('src/pages/users/UsersPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
