<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header-css">
      <q-toolbar class="flex justify-between">
        <q-btn
          flat
          dense
          round
          size="lg"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-btn
          flat
          dense
          round
          size="lg"
          icon="logout"
          aria-label="logout"
          @click="logoutClick"
        />
      </q-toolbar>
      <div class="linha"></div>
    </q-header>
    <q-drawer
      style="transform: translateX(0px); background-color: var(--q-primary)"
      v-model="leftDrawerOpen"
      show-if-above
      :width="270"
    >
      <q-list>
        <div class="logo">
          <img src="/src/assets/logo.svg" alt="" />
        </div>

        <MenuSidebar
          v-for="item in sidebarItens"
          :key="item.title"
          v-bind="item"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import MenuSidebar from 'src/components/MenuSidebar.vue';
import { useRouter } from 'vue-router';

import { UserAuth } from '../api/UserAuthUserApi';

defineOptions({
  name: 'MainLayout',
});

const sidebarItens = [
  {
    title: 'Dashboard',
    icon: 'src/assets/view-dashboard.svg',
    page: 'dashboard',
  },
  {
    title: 'Alugueis',
    icon: 'src/assets/book-plus-multiple.svg',
    page: 'rents',
  },
  {
    title: 'Livros',
    icon: 'src/assets/book.svg',
    page: 'books',
  },
  {
    title: 'Editoras',
    icon: 'src/assets/book-edit.svg',
    page: 'publishers',
  },
  {
    title: 'Locatários',
    icon: 'src/assets/badge-account.svg',
    page: 'tenants',
  },
  {
    title: 'Usuários',
    icon: 'src/assets/account-group.svg',
    page: 'users',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }
});

const router = useRouter();

function logoutClick() {
  UserAuth.logout();
  router.replace('/login');
}
</script>

<style scoped>
.header-css {
  padding: 20px;
  background-color: var(--q-white);
  color: var(--q-primary);
}

.linha {
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
}

.logo {
  display: flex;
  padding: 20px 20px 20px 50px;
}

.logo img {
  width: 150px;
}
</style>
