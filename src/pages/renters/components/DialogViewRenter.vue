<template>
  <q-dialog v-model="modalView" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Visualizar Locatário
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
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>
          <div class="input-group-css">
            <label>E-mail do locatário</label>
            <q-input
              v-model="renter.email"
              placeholder="Digite o e-mail do locatário"
              dense
              outlined
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>
          <div class="input-group-css">
            <label>Telefone do locatário</label>
            <q-input
              v-model="renter.telephone"
              placeholder="Digite o telefone do locatário"
              dense
              outlined
              readonly
              disable
              :rules="[(val) => '']"
            />
          </div>
          <div class="input-group-css">
            <label>Endereço do locatário</label>
            <q-input
              v-model="renter.address"
              placeholder="Digite o endereço do locatário"
              dense
              outlined
              readonly
              disable
              :rules="[(val) => '']"
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
import { Renter } from 'src/interfaces/Renters.interface';
import { reactive, watch } from 'vue';

const modalView = defineModel({
  default: false,
});

const props = defineProps<{
  renterView?: Renter;
}>();

const renter: Renter = reactive({
  name: '',
  email: '',
  telephone: '',
  address: '',
  cpf: '',
});

watch(
  () => props.renterView,
  async (renterView) => {
    renter.name = renterView!.name;
    renter.email = renterView!.email;
    renter.telephone = renterView!.telephone;
    renter.address = renterView!.address;
    renter.cpf = renterView!.cpf;
  }
);
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
</style>
