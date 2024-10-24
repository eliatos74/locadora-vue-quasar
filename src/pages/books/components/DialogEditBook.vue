<template>
  <q-dialog v-model="modalEdit" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Editar Livro
        </div>
        <q-btn color="primary" icon="close" dense round v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form>
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
        />
        <q-btn
          label="Confirmar"
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
import { PublisherApi } from 'src/api/PublisherApi';
import { Book, BookInfo } from 'src/interfaces/Books.interface';
import { computed, reactive, ref, watch } from 'vue';

const modalEdit = defineModel({
  default: false,
});

const props = defineProps<{
  bookEdit?: BookInfo;
  modalWithoutError: boolean;
}>();

const book: Book = reactive({
  id: undefined,
  name: '',
  author: '',
  totalQuantity: 0,
  launchDate: '',
  publisherId: '',
});

let originalBook: Book = reactive({ ...book });

watch(
  () => props.bookEdit,
  async (newVal) => {
    if (newVal && modalEdit.value) {
      const idBook = await loadSelectPublishers(newVal.publisherName);

      book.id = newVal.id;
      book.name = newVal.name;
      book.author = newVal.author;
      book.totalQuantity = newVal.totalQuantity;
      book.launchDate = newVal.launchDate;
      book.publisherId = idBook;

      originalBook = { ...book };
    }
  }
);

const options = ref<{ id: number; name: string }[]>([]);

async function loadSelectPublishers(publisherName: string) {
  const response = await PublisherApi.getPublisherSelect();

  const selectedPublisher = response.find(
    (publisher) => publisher.name === publisherName
  );

  options.value = response;
  return selectedPublisher?.id;
}

const formEdited = computed(() => {
  return (
    (!!book.name && book.name !== originalBook.name) ||
    (!!book.author && book.author !== originalBook.author) ||
    (!!book.totalQuantity &&
      book.totalQuantity !== originalBook.totalQuantity) ||
    (!!book.launchDate && book.launchDate !== originalBook.launchDate) ||
    (!!book.publisherId && book.publisherId !== originalBook.publisherId)
  );
});

const emit = defineEmits<{
  (e: 'submit', book: Book): void;
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
  book.name = originalBook.name;
  book.author = originalBook.author;
  book.totalQuantity = originalBook.totalQuantity;
  book.launchDate = originalBook.launchDate;
  book.publisherId = originalBook.publisherId;
}

function submitForm() {
  if (formEdited.value) {
    emit('submit', book);
  }
}
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
