<template>
  <div class="header">
    <h5>Usuários</h5>
    <div class="header-source">
      <input type="text" placeholder="Pesquisar..." />
      <button id="openModalButton" class="add-button">+ Novo</button>
    </div>
  </div>

  <div>
    <p style="color: black">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt repellendus
      incidunt iure illo alias, repudiandae ipsum consequatur sed dolore. Maxime
      quidem possimus ducimus aperiam repellendus repudiandae nostrum distinctio
      quae provident.
    </p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';

async function getUser() {
  const response = await axios.get('users/1');
  console.log(response);
}

onMounted(() => {
  getUser();
});
</script>

<style scoped></style>
