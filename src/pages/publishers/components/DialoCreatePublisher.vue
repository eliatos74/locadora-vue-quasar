<template>
  <DialogBase
    v-model="modal"
    title="Cadastrar Editora"
    @close="closeModal"
    @confirme="confirmModal"
  >
    <q-form>
      <div class="input-group-css">
        <label for="Nome do livro">Nome da editora</label>
        <q-input
          v-model="publisher.name"
          placeholder="Digite o nome da editora"
          dense
          outlined
        />
      </div>
      <div class="input-group-css">
        <label for="Nome do livro">Email</label>
        <q-input
          v-model="publisher.email"
          placeholder="Email da editora"
          dense
          outlined
        />
      </div>
      <div class="input-group-css">
        <label for="Nome do livro">Telefone</label>
        <q-input
          v-model="publisher.telephone"
          placeholder="Telefone"
          dense
          outlined
          mask="(##)#####-####"
        />
      </div>
      <div class="input-group-css">
        <label for="Nome do livro">Site</label>
        <q-input
          v-model="publisher.site"
          placeholder="Link do site"
          dense
          outlined
        />
      </div>
    </q-form>
  </DialogBase>
</template>

<script setup lang="ts">
import DialogBase from 'components/DialogBase.vue';
import { Publisher } from '../../../interfaces/Publishers.interface';
import { reactive } from 'vue';

const modal = defineModel({
  default: false,
});

const publisher: Publisher = reactive({
  name: '',
  email: '',
  telephone: '',
  site: '',
});

function resetForm() {
  (publisher.name = ''),
    (publisher.email = ''),
    (publisher.telephone = ''),
    (publisher.site = '');
}

function closeModal() {
  resetForm();
}

function confirmModal() {
  console.log(publisher);
}
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
