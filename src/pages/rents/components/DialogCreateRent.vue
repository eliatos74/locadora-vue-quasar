<template>
  <q-dialog v-model="modalCreate" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Cadastrar Aluguel
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
            <label>Locatário</label>
            <q-select
              label="Selecionar editora"
              v-model="rent.renterId"
              :options="optionsRenters"
              option-label="name"
              option-value="id"
              emit-value
              map-options
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Livro</label>
            <q-select
              label="Selecionar editora"
              v-model="rent.bookId"
              :options="optionsBooks"
              option-label="name"
              option-value="id"
              emit-value
              map-options
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Prazo de Entrega</label>
            <q-input
              v-model="rent.deadline"
              type="date"
              dense
              outlined
              mask="##-##-####"
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
import { RentCreate } from 'src/interfaces/Rent.interface';
import { computed, reactive, ref, watch } from 'vue';

const modalCreate = defineModel({
  default: false,
});

const props = defineProps<{
  rentersSelects: { id: number; name: string }[] | undefined;
  booksSelects: { id: number; name: string }[] | undefined;
  modalWithoutError: boolean;
}>();

const rent: RentCreate = reactive({
  renterId: '',
  bookId: '',
  deadline: '',
});

watch(modalCreate, () => {
  if (modalCreate.value) {
    console.log(props.rentersSelects);
    console.log(props.booksSelects);
    loadSelects();
  }
});

const optionsRenters = ref<{ id: number; name: string }[]>([]);
const optionsBooks = ref<{ id: number; name: string }[]>([]);

function loadSelects() {
  optionsRenters.value = props.rentersSelects!;
  optionsBooks.value = props.booksSelects!;
}

const formValid = computed(() => {
  return !!rent.renterId && !!rent.bookId && !!rent.deadline;
});

function resetForm() {
  rent.renterId = '';
  rent.bookId = '';
  rent.deadline = '';
}

const emit = defineEmits<{
  (e: 'submit', rent: RentCreate): void;
}>();

function submitForm() {
  if (formValid.value) {
    emit('submit', rent);
  }
}

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
