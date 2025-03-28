<template>
  <div class="login-css">
    <div class="logo-container">
      <img src="../assets/logo.svg" alt="Logo" class="logo" />
    </div>
    <div class="form">
      <q-form class="login-form" @submit.prevent="handleSubmit">
        <h5 id="loginTitle">Faça seu login</h5>
        <div class="input-group">
          <label for="username">Nome de Usuário</label>
          <input
            required
            name="username"
            placeholder="Digite seu nome de usuário"
            v-model="formData.name"
          />
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input
            required
            type="password"
            name="password"
            placeholder="Digite sua senha"
            aria-required="true"
            v-model="formData.password"
          />
        </div>
        <button id="loginBtn" type="submit">Fazer login</button>
        <q-btn
          class="forgot-password"
          dense
          flat
          color="white"
          label="Esqueceu a senha ?"
          no-caps
          @click="handleRecoveryPass"
        />
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { UserAuth } from '../api/UserAuthUserApi';
import { AuthLogin } from '../interfaces/Auth.interface';

import { NotifyMessage } from '../helpers/Notify';

const routes = useRouter();

const formData: AuthLogin = {
  name: '',
  password: '',
};

async function handleSubmit() {
  try {
    await UserAuth.login(formData);
    routes.push('/dashboard');
  } catch (error) {
    NotifyMessage.notifyError('Usuário ou senha incorreta!');
  }
}

async function handleRecoveryPass() {
  await routes.push('/recoverPassword');
}
</script>

<style scoped>
.login-css {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--q-primary);
  position: relative;
}

.logo-container {
  position: absolute;
  top: 45px;
  left: 100px;
}

.logo {
  width: 250px;
}

.form {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

.login-form h5 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: white;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: white;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

button#loginBtn {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
}

button#loginBtn:hover {
  background-color: #218838;
}

.forgot-password {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: white;
  text-decoration: none;
}
</style>
