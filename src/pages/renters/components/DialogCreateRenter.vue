<template>
  <q-dialog v-model="modalCreate" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Cadastrar Locatário
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
            <label>Nome do locatário</label>
            <q-input
              v-model="renter.name"
              placeholder="Digite o nome do locatário"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>E-mail do locatário</label>
            <q-input
              v-model="renter.email"
              placeholder="Digite o e-mail do locatário"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Telefone do locatário</label>
            <q-input
              v-model="renter.telephone"
              placeholder="Digite o telefone do locatário"
              dense
              outlined
              mask="(##) # ####-####"
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Endereço do locatário</label>
            <q-input
              v-model="renter.address"
              placeholder="Digite o endereço do locatário"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>CPF do locatário</label>
            <q-input
              v-model="renter.cpf"
              placeholder="Digite o CPF do locatário"
              dense
              outlined
              mask="###.###.###-##"
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
          @click="resetForm"
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
import { Renter } from 'src/interfaces/Renters.interface';
import { computed, reactive, watch } from 'vue';

const modalCreate = defineModel({
  default: false,
});

const renter: Renter = reactive({
  name: '',
  email: '',
  telephone: '',
  address: '',
  cpf: '',
});

const formValid = computed(() => {
  return (
    !!renter.name &&
    !!renter.email &&
    !!renter.telephone &&
    !!renter.address &&
    !!renter.cpf
  );
});

function resetForm() {
  renter.name = '';
  renter.email = '';
  renter.telephone = '';
  renter.address = '';
  renter.cpf = '';
}

function formatPhoneNumber() {
  renter.telephone = renter.telephone.replace(/\D/g, '');
}

const emit = defineEmits<{
  (e: 'submit', renter: Renter): void;
}>();

function submitForm() {
  if (formValid.value) {
    formatPhoneNumber();
    emit('submit', renter);
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
