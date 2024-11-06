<template>
  <div class="login-css">
    <div class="logo-container">
      <img src="../assets/logo.svg" alt="Logo" class="logo" />
    </div>
    <div class="form">
      <h6 class="css-title">Informações do Perfil</h6>
      <div class="item-form">
        <div>
          <label>Nome de Usuário</label>
          <q-input
            v-model="username"
            bg-color="white"
            dense
            outlined
            :rules="[(val) => '']"
            disable
          />
        </div>
      </div>

      <div class="button-group">
        <q-btn
          label="Alterar Senha"
          color="primary"
          no-caps
          class="back-btn"
          @click="handleRecoveryPass"
        />
        <q-btn
          label="Voltar"
          color="primary"
          no-caps
          class="confirm-btn"
          @click="goToDashboard"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref(localStorage.getItem('username')!);

const router = useRouter();

function handleRecoveryPass() {
  router.push('/recoverPassword');
}

async function goToDashboard() {
  router.push('/dashboard');
}
</script>

<style scoped>
.login-css {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  background: var(--q-primary);
}

.logo-container {
  position: absolute;
  top: 60px;
  left: 120px;
}

.logo {
  width: 260px;
  margin-bottom: 30px;
  filter: drop-shadow(0px 5px 8px rgba(0, 0, 0, 0.2));
}

.css-title {
  color: var(--q-primary);
  margin: 0;
  font-weight: bold;
  font-size: 25px;
  display: flex;
  justify-content: center;
}

.form {
  padding: 50px;
  margin-top: 30px;
  border-radius: 14px;
  background-color: #ffffff;
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.2);
}

.item-form label {
  color: var(--q-primary);
  font-weight: bold;
  font-size: 1.2em;
}

.q-input input {
  font-size: 1.1em;
  color: #424242;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.q-btn {
  font-size: 1.1em;
  width: 100%;
}

.back-btn {
  background-color: #f5f5f5;
}

.confirm-btn {
  background-color: #0066cc;
  color: white;
}
</style>
