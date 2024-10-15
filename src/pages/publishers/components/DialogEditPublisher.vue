<template>
  <q-dialog v-model="modalEdit" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Editar Editora
        </div>
        <q-btn
          color="primary"
          icon="close"
          dense
          round
          v-close-popup
          @click="closeModal"
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
          @click="closeModal"
        />
        <q-btn
          label="Confirmar"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          @click="submitForm"
          :disable="!formEdited"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  {{ modalWithoutError }}
</template>

<script setup lang="ts">
import { Publisher } from '../../../interfaces/Publishers.interface';
import { computed, reactive, watch } from 'vue';

const modalEdit = defineModel({
  default: false,
});

const props = defineProps<{
  publi?: Publisher;
  modalWithoutError: boolean;
}>();

const publisher: Publisher = reactive({
  id: undefined,
  name: '',
  email: '',
  telephone: '',
  site: '',
});

let originalPublisher: Publisher = reactive({ ...publisher });

watch(modalEdit, () => {
  if (modalEdit.value) {
    publisher.id = props.publi?.id;
    publisher.name = props.publi!.name;
    publisher.email = props.publi!.email;
    publisher.telephone = props.publi!.telephone;
    publisher.site = props.publi!.site;

    originalPublisher = { ...publisher };
  }
});

watch(
  () => props.modalWithoutError,
  (newVal) => {
    if (newVal) {
      modalEdit.value = false;
      resetForm();
    }
  }
);

function resetForm() {
  publisher.name = '';
  publisher.email = '';
  publisher.telephone = '';
  publisher.site = '';
}

const formEdited = computed(() => {
  return (
    (!!publisher.name && publisher.name !== originalPublisher.name) ||
    (!!publisher.email && publisher.email !== originalPublisher.email) ||
    (!!publisher.telephone &&
      publisher.telephone !== originalPublisher.telephone) ||
    (!!publisher.site && publisher.site !== originalPublisher.site)
  );
});

function closeModal() {
  resetForm();
}

function formatPhoneNumber() {
  publisher.telephone = publisher.telephone.replace(/\D/g, '');
}

const emit = defineEmits<{
  (e: 'submit', publisher: Publisher): void;
}>();

function submitForm() {
  if (formEdited.value) {
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
