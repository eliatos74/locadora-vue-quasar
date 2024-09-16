<template>
  <DialogBase
    v-model="modal"
    title="Cadastrar Editora"
    :isFormValid="formValid"
    @close="closeModal"
    @confirm="submitForm"
  >
    <q-form>
      <div class="input-group-css">
        <label>Nome da editora</label>
        <q-input
          v-model="publisher.name"
          placeholder="Digite o nome da editora"
          dense
          outlined
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>
      <div class="input-group-css">
        <label>Email</label>
        <q-input
          v-model="publisher.email"
          placeholder="Email da editora"
          dense
          outlined
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>
      <div class="input-group-css">
        <label>Telefone</label>
        <q-input
          v-model="publisher.telephone"
          placeholder="Telefone"
          dense
          outlined
          mask="(##) ####-####"
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>
      <div class="input-group-css">
        <label>Site</label>
        <q-input
          v-model="publisher.site"
          placeholder="Link do site"
          dense
          outlined
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </div>
    </q-form>
  </DialogBase>
</template>

<script setup lang="ts">
import DialogBase from 'components/DialogBase.vue';
import { Publisher } from '../../../interfaces/Publishers.interface';
import { computed, reactive } from 'vue';

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

const formValid = computed(() => {
  return (
    !!publisher.name &&
    !!publisher.email &&
    !!publisher.telephone &&
    !!publisher.site
  );
});

function closeModal() {
  resetForm();
}

const emit = defineEmits<{
  (e: 'submit', publisher: Publisher): void;
}>();

function submitForm() {
  if (formValid.value) {
    emit('submit', publisher);
    resetForm();
  }
}
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
