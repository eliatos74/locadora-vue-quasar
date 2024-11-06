<template>
  <q-dialog v-model="modalEdit" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Editar Locatário
        </div>
        <q-btn color="primary" icon="close" dense round v-close-popup />
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
        />
        <q-btn
          label="Cadastrar"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          :disable="!formEdited"
          @click="submitForm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Renter } from 'src/interfaces/Renters.interface';
import { computed, reactive, watch } from 'vue';

const modalEdit = defineModel({
  default: false,
});

const props = defineProps<{
  renterEdit?: Renter;
  modalWithoutError: boolean;
}>();

const renter: Renter = reactive({
  name: '',
  email: '',
  telephone: '',
  address: '',
  cpf: '',
});

let originalRenter: Renter = reactive({ ...renter });

watch(
  () => props.renterEdit,
  (newVal) => {
    if (newVal && modalEdit.value) {
      renter.id = newVal.id;
      renter.name = newVal.name;
      renter.email = newVal.email;
      renter.telephone = newVal.telephone;
      renter.address = newVal.address;
      renter.cpf = newVal.cpf;

      originalRenter = { ...renter };
    }
  }
);

const formEdited = computed(() => {
  return (
    (!!renter.name && renter.name !== originalRenter.name) ||
    (!!renter.email && renter.email !== originalRenter.email) ||
    (!!renter.telephone && renter.telephone !== originalRenter.telephone) ||
    (!!renter.address && renter.address !== originalRenter.address) ||
    (!!renter.cpf && renter.cpf !== originalRenter.cpf)
  );
});

const emit = defineEmits<{
  (e: 'submit', renter: Renter): void;
}>();

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
  renter.name = originalRenter.name;
  renter.telephone = originalRenter.telephone;
  renter.address = originalRenter.address;
  renter.cpf = originalRenter.cpf;
}

function submitForm() {
  if (formEdited.value) {
    emit('submit', renter);
  }
}
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
