<template>
  <q-dialog v-model="modalCreate" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Cadastrar Editora
        </div>
        <q-btn
          color="primary"
          icon="close"
          dense
          round
          v-close-popup
          @click="closeButtonsModal"
        />
      </q-card-section>

      <q-card-section>
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
              mask="(##) # ####-####"
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
      </q-card-section>

      <q-card-actions align="right" style="padding: 16px">
        <q-btn
          label="Fechar"
          color="negative"
          style="text-transform: none; padding: 0px 15px"
          v-close-popup
          @click="closeButtonsModal"
        />
        <q-btn
          label="Cadastrar"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          @click="submitForm"
          :disable="!formValid"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Publisher } from '../../../interfaces/Publishers.interface';
import { computed, reactive, watch } from 'vue';

const modalCreate = defineModel({
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

function closeButtonsModal() {
  resetForm();
}

function formatPhoneNumber() {
  publisher.telephone = publisher.telephone.replace(/\D/g, '');
}

const emit = defineEmits<{
  (e: 'submit', publisher: Publisher): void;
}>();

function submitForm() {
  if (formValid.value) {
    formatPhoneNumber();
    emit('submit', publisher);
  }
}
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
