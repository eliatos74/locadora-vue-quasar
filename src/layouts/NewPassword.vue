<template>
  <div class="login-css">
    <div class="logo-container">
      <img src="../assets/logo.svg" alt="Logo" class="logo" />
    </div>
    <div class="form">
      <h6 class="css-title">Alterar Senha</h6>
      <div class="item-form">
        <div>
          <label>E-mail</label>
          <q-input
            v-model="recover.email"
            bg-color="white"
            type="email"
            dense
            outlined
            :rules="[(val) => '']"
            disable
          />
        </div>
        <div>
          <label>Nova senha</label>
          <q-input
            v-model="recover.newPassword"
            bg-color="white"
            :type="isPwd ? 'password' : 'text'"
            dense
            outlined
            :rules="[(val) => !!val || 'Campo obrigatório']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
            /></template>
          </q-input>
        </div>
        <div>
          <label>Confirmar senha</label>
          <q-input
            v-model="recover.repeatPassword"
            bg-color="white"
            :type="isPwdConfirm ? 'password' : 'text'"
            dense
            outlined
            :rules="[(val) => !!val || 'Campo obrigatório']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdConfirm = !isPwdConfirm"
            /></template>
          </q-input>
        </div>
        <div>
          <label>Codigo de verificação</label>
          <q-input
            v-model="recover.otpCode"
            bg-color="white"
            type="number"
            dense
            outlined
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />
        </div>
      </div>

      <div class="button-group">
        <q-btn
          label="Voltar"
          color="primary"
          no-caps
          class="back-btn"
          @click="goToLoginPage"
        />
        <q-btn
          label="Confirmar"
          color="primary"
          no-caps
          class="confirm-btn"
          @click="recoverPassword"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RecoverApi } from 'src/api/RecoverApi';
import { NotifyMessage } from 'src/helpers/Notify';
import { RecoverPassword } from 'src/interfaces/RecoverPassword.interface';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const emailLocal = ref(localStorage.getItem('email')!);
const isPwd = ref(true);
const isPwdConfirm = ref(true);
const router = useRouter();

const recover: RecoverPassword = reactive({
  email: emailLocal.value,
  newPassword: '',
  repeatPassword: '',
  otpCode: null,
});

async function recoverPassword() {
  $q.loading.show();
  try {
    recover.otpCode = recover.otpCode ? Number(recover.otpCode) : null;
    await RecoverApi.alterPassword(recover);
    NotifyMessage.notifySuccess('Senha atualizada com sucesso!');
    router.replace('/login');
  } catch (error) {
    NotifyMessage.notifyError(
      'Vefifique se os campos estão preenchidos corretamente!'
    );
  } finally {
    $q.loading.hide();
  }
}

function goToLoginPage() {
  router.replace('/recoverPassword');
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
  justify-content: space-between;
  gap: 15px;
}

.q-btn {
  font-size: 1.1em;
  width: 100%;
  max-width: 150px;
}

.back-btn {
  background-color: #f5f5f5;
}

.confirm-btn {
  background-color: #0066cc;
  color: white;
}
</style>
