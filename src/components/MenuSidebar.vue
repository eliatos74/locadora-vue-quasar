<template>
  <div class="sidebar-css">
    <q-item clickable :to="page">
      <q-item-section top avatar class="flex-center">
        <img class="logo-adjustment" :src="icon" alt="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="title-css">{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MenuSidebar',
});

defineProps({
  title: String,
  icon: String,
  page: String,
});
</script>

<style scoped>
.sidebar-css {
  display: flex;
  justify-content: center;
  color: var(--q-white);
  flex-direction: column;
}

.q-item {
  width: 100%;
  padding: 8px 16px 8px 40px;
}
.q-item__section {
  padding: 0;
}

.logo-adjustment {
  width: 30px;
  height: 30px;
}

.title-css {
  font-size: 16px;
}

.q-item.q-router-link--active {
  filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
}
</style>

vbase
