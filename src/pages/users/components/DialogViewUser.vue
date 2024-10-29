<template>
  <q-dialog v-model="modalView" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Editar Usuário
        </div>
        <q-btn color="primary" icon="close" dense round v-close-popup />
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
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>
          <div class="input-group-css">
            <label>E-mail do usuário</label>
            <q-input
              v-model="user.email"
              placeholder="Digite o e-mail do usuário"
              dense
              outlined
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>

          <div class="flex justify-center">
            <div class="q-gutter-sm">
              <q-radio
                v-model="user.role"
                val="ADMIN"
                label="Administrador"
                disable
              />
              <q-radio
                v-model="user.role"
                val="VISITOR"
                label="Visitante"
                disable
              />
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
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { User } from 'src/interfaces/Users.interface';
import { reactive, watch } from 'vue';

const modalView = defineModel({
  default: false,
});

const props = defineProps<{
  userView?: User;
}>();

const user: User = reactive({
  name: '',
  email: '',
  role: '',
});

watch(
  () => props.userView,
  async (newVal) => {
    if (newVal && modalView.value) {
      user.id = newVal.id;
      user.name = newVal.name;
      user.email = newVal.email;
      user.role = newVal.role;
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
