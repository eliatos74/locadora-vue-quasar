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
        <div style="display: flex; align-items: center">
          <q-btn
            flat
            rounded
            class="user-btn"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              color: var(--q-primary);
            "
          >
            <span style="font-size: 18px; padding: 0px 5px">{{
              username
            }}</span>
            <q-icon
              v-if="menuOpen == false"
              name="keyboard_arrow_down"
              size="lg"
              @click="toggleMenu"
            />
            <q-icon
              v-if="menuOpen == true"
              name="keyboard_arrow_up"
              size="lg"
              @click="toggleMenu"
            />

            <q-menu
              anchor="bottom middle"
              self="top middle"
              @show="menuOpen = true"
              @hide="menuOpen = false"
            >
              <q-list
                style="
                  min-width: 200px;
                  color: var(--q-primary);
                  font-weight: 550;
                "
              >
                <q-item clickable v-close-popup @click="goToProfile">
                  <q-item-section
                    style="
                      font-size: 15px;
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      gap: 5px;
                    "
                  >
                    Acessar Perfil
                    <q-icon size="sm" name="perm_identity" />
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section
                    style="
                      font-size: 15px;
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      gap: 5px;
                    "
                  >
                    Logout

                    <q-icon size="xs" name="logout" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
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
import { UserAuth } from 'src/api/UserAuthUserApi';

const username = ref(localStorage.getItem('username') || '');

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
    page: 'renters',
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

function goToProfile() {
  router.push('/profile');
}

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }
});

const router = useRouter();

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function logout() {
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

.user-btn {
  color: var(--q-primary);
  font-size: 18px;
  font-weight: 500;
}
.rotate {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>
