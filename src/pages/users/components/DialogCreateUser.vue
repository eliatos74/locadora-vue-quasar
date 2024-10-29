<template>
  <q-dialog v-model="modalCreate" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Cadastrar Usuário
        </div>
        <q-btn
          color="primary"
          icon="close"
          dense
          round
          v-close-popup
          @click="resetForm"
        />
      </q-card-section>

      <q-card-section>
        <q-form ref="myForm">
          <div class="input-group-css">
            <label>Nome do usuário</label>
            <q-input
              v-model="user.name"
              placeholder="Digite o nome do usuário"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>E-mail do usuário</label>
            <q-input
              v-model="user.email"
              placeholder="Digite o e-mail do usuário"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Senha do usuário</label>
            <q-input
              v-model="user.password"
              placeholder="Digite a senha do usuário"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="flex justify-center">
            <div class="q-gutter-sm">
              <q-radio v-model="user.role" val="ADMIN" label="Administrador" />
              <q-radio v-model="user.role" val="VISITOR" label="Visitante" />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" style="padding: 16px">
        <q-btn
          label="Fechar"
          color="negative"
          style="text-transform: none; padding: 0px 15px"
          v-close-popup
          @click="resetForm"
        />
        <q-btn
          label="Cadastrar"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          :disable="!formValid"
          @click="submitForm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { User } from 'src/interfaces/Users.interface';
import { computed, reactive, watch } from 'vue';

const modalCreate = defineModel({
  default: false,
});

const user: User = reactive({
  name: '',
  email: '',
  password: '',
  role: 'ADMIN',
});

const formValid = computed(() => {
  return !!user.name && !!user.email && !!user.password;
});

function resetForm() {
  user.name = '';
  user.email = '';
  user.password = '';
  user.role = 'ADMIN';
}

const emit = defineEmits<{
  (e: 'submit', user: User): void;
}>();

function submitForm() {
  if (formValid.value) {
    emit('submit', user);
  }
}

const props = defineProps<{
  modalWithoutError: boolean;
}>();

watch(
  () => props.modalWithoutError,
  (newVal) => {
    if (newVal) {
      modalCreate.value = false;
      resetForm();
    }
  }
);
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
