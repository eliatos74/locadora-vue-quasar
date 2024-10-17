<template>
  <q-dialog v-model="modalView" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Visualizar Livro
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
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>
          <div class="input-group-css">
            <label>Nome do Autor</label>
            <q-input
              v-model="book.author"
              placeholder="Digite o nome do autor"
              dense
              outlined
              readonly
              disable
              :rules="[(val) => '']"
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
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>
          <div class="input-group-css">
            <label>Data de lançamento</label>
            <q-input
              v-model="book.launchDate"
              type="date"
              dense
              outlined
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>
          <div class="input-group-css">
            <label>Editora</label>
            <q-input
              v-model="book.publisherId"
              type="text"
              dense
              outlined
              readonly
              disable
              :rules="[(val) => '']"
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
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Book, BookInfo } from 'src/interfaces/Books.interface';
import { reactive, watch } from 'vue';

const modalView = defineModel({
  default: false,
});

const props = defineProps<{
  bookView?: BookInfo;
}>();

const book: Book = reactive({
  name: '',
  author: '',
  totalQuantity: 0,
  launchDate: '',
  publisherId: '',
});
watch(
  () => props.bookView,
  async (newBookEdit) => {
    if (modalView.value) {
      book.name = newBookEdit!.name;
      book.author = newBookEdit!.author;
      book.totalQuantity = newBookEdit!.totalQuantity;
      book.launchDate = newBookEdit!.launchDate;
      book.publisherId = newBookEdit!.publisherName;
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
