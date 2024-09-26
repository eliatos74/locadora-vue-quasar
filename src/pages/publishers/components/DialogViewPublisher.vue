<template>
  <q-dialog v-model="modalVisibility" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Visualizar Editora
        </div>
        <q-btn color="primary" icon="close" dense round v-close-popup />
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
              readonly
              disable
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
              readonly
              disable
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
              readonly
              disable
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
              readonly
              disable
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
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Publisher } from '../../../interfaces/Publishers.interface';
import { reactive, watch } from 'vue';

const modalVisibility = defineModel({
  default: false,
});

const props = defineProps<{ publi?: Publisher }>();

const publisher: Publisher = reactive({
  id: undefined,
  name: '',
  email: '',
  telephone: '',
  site: '',
});

watch(modalVisibility, () => {
  if (modalVisibility.value) {
    publisher.id = props.publi?.id;
    publisher.name = props.publi!.name;
    publisher.email = props.publi!.email;
    publisher.telephone = props.publi!.telephone;
    publisher.site = props.publi!.site;
  }
});
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}

/* .q-field {
  &.q-field--readonly {
    &.q-field--standard {
      .q-field__control {
        &:before {
          border-bottom-style: solid;
        }
      }
    }
  }
} */
</style>
