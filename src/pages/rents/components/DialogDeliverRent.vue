<template>
  <q-dialog v-model="modalDeliver" persistent>
    <q-card>
      <q-card-section
        class="row justify-between bg-primary text-white"
        style="height: 60px"
      >
        <div class="col-grow text-center text-h6" style="font-weight: bold">
          Entregar Livro
        </div>
        <q-btn color="primary" icon="close" dense round v-close-popup />
      </q-card-section>

      <q-card-section class="adjust-card-section">
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ rent?.renterName }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="auto_stories" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ rent?.bookName }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top avatar>
            <q-avatar
              :color="colorStatus[rent?.status as Status].bgColor"
              text-color="white"
              icon="circle"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              colorStatus[rent?.status as Status].translatedText
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="date_range" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ rent?.deadLineDate }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-actions align="right" style="padding: 16px">
        <q-btn
          label="Fechar"
          color="negative"
          style="text-transform: none; padding: 0px 15px"
          v-close-popup
        />
        <q-btn
          label="Confirmar Devolução"
          color="primary"
          style="text-transform: none; padding: 0px 15px"
          @click="submitForm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { RentList } from 'src/interfaces/Rent.interface';
import { computed, watch } from 'vue';

const modalDeliver = defineModel({
  default: false,
});

const props = defineProps<{
  rent?: RentList;
  modalWithoutError: boolean;
}>();

watch(
  () => props.modalWithoutError,
  (newVal) => {
    if (newVal) {
      modalDeliver.value = false;
    }
  }
);

const emit = defineEmits<{
  (e: 'submit', id: number): void;
}>();

function submitForm() {
  if (props.rent?.id) {
    emit('submit', props.rent.id!);
  }
}

type Status = 'IN_TIME' | 'DELIVERED' | 'DELIVERED_WITH_DELAY' | 'DELAYED';

const colorStatus = computed(() => {
  return {
    IN_TIME: {
      bgColor: 'green',
      translatedText: 'Em Tempo',
    },
    DELIVERED: {
      bgColor: 'blue-7',
      translatedText: 'Entregue',
    },
    DELIVERED_WITH_DELAY: {
      bgColor: 'red',
      translatedText: 'Entrgue com Atraso',
    },
    DELAYED: {
      bgColor: 'orange',
      translatedText: 'Atrasado',
    },
  };
});
</script>

<style scoped>
.input-group-css {
  font-weight: bold;
  width: 500px;
}
.adjust-card-section {
  min-width: 500px;
}
.q-item__label {
  color: var(--q-primary);
  font-weight: 600;
  font-size: 16px;
}
</style>
