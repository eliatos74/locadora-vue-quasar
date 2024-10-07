<template>
  <q-dialog v-model="modalCreate" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Cadastrar Livro
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
            <label>Nome do livro</label>
            <q-input
              v-model="book.name"
              placeholder="Digite o nome do livro"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Nome do Autor</label>
            <q-input
              v-model="book.author"
              placeholder="Digite o nome do autor"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Quantidade total</label>
            <q-input
              v-model.number="book.totalQuantity"
              placeholder="Digite o número de livros"
              type="number"
              dense
              outlined
              :rules="[
                (val) => !!val || 'Campo obrigatório',
                (val) => val > 0 || 'Quantidade livro não pode ser menor que 1',
              ]"
            />
          </div>
          <div class="input-group-css">
            <label>Data de lançamento</label>
            <q-input
              v-model="book.launchDate"
              type="date"
              dense
              outlined
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="input-group-css">
            <label>Editora</label>
            <q-select
              label="Selecionar editora"
              v-model="book.publisherId"
              :options="options"
              option-label="name"
              option-value="id"
              emit-value
              map-options
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
import { BookApi } from 'src/api/BookApi';
import { Book } from 'src/interfaces/Books.interface';
import { reactive, ref, watch, computed } from 'vue';

const modalCreate = defineModel({
  default: false,
});

const book: Book = reactive({
  name: '',
  author: '',
  launchDate: '',
});

const options = ref<{ id: number; name: string }[]>([]);

watch(modalCreate, () => {
  if (modalCreate.value) {
    loadSelectPublishers();
  }
});

async function loadSelectPublishers() {
  const response = await BookApi.getPublisherSelect();
  options.value = response;
}

const formValid = computed(() => {
  return (
    !!book.name &&
    !!book.author &&
    !!book.totalQuantity &&
    !!book.launchDate &&
    !!book.publisherId
  );
});

function resetForm() {
  book.name = '';
  book.author = '';
  book.totalQuantity = undefined;
  book.launchDate = '';
  book.publisherId = undefined;
}

const emit = defineEmits<{
  (e: 'submit', book: Book): void;
}>();

function submitForm() {
  if (formValid.value) {
    emit('submit', book);
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
