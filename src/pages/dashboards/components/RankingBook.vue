<template>
  <q-card-section>
    <div class="text-h6 text-bold">Ranking dos livros mais alugados</div>
  </q-card-section>

  <q-card-section
    v-if="livrosExibidos.length"
    class="display column q-mt-sm piramide-layout"
  >
    <div class="livro-top">
      <q-chip
        v-for="(livro, index) in [livrosExibidos[0]]"
        :key="index"
        class="q-mb-sm chip-custom"
        text-color="primary"
      >
        <q-avatar :color="cores[0]" text-color="white" class="avatar-custom">
          {{ livro.posicao }}
        </q-avatar>
        <div class="livro-nome">
          {{ livro.nome }} ({{ livro.quantidade }} alugados)
        </div>
      </q-chip>
    </div>
    <div class="livro-base">
      <q-chip
        v-for="(livro, index) in livrosExibidos.slice(1, 3)"
        :key="index"
        class="q-mb-sm chip-custom"
        text-color="primary"
      >
        <q-avatar
          :color="cores[index + 1]"
          text-color="white"
          class="avatar-custom"
        >
          {{ livro.posicao }}
        </q-avatar>
        <div class="livro-nome">
          {{ livro.nome }} ({{ livro.quantidade }} alugados)
        </div>
      </q-chip>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { DashboardApi } from 'src/api/DashboardApi';
import { MostRentend } from 'src/interfaces/Dashboard.interface';
import { ref, computed, onMounted } from 'vue';

import { useQuasar } from 'quasar';
import { NotifyMessage } from 'src/helpers/Notify';
const $q = useQuasar();

const livros = ref<{ posicao: number; nome: string; quantidade: number }[]>([]);

async function mostRentedRanking() {
  $q.loading.show();
  try {
    const response = await DashboardApi.getMostRentedBooks();
    livros.value = response.map((item: MostRentend, index: number) => ({
      posicao: index + 1,
      nome: item.bookName,
      quantidade: item.rentedNumber,
    }));
  } catch (error) {
    NotifyMessage.notifyError('Erro ao carregar ranking de livros!');
  } finally {
    $q.loading.hide();
  }
}

const cores = ['green', 'blue', 'purple'];

const livrosExibidos = computed(() => livros.value.slice(0, 3));

onMounted(() => {
  mostRentedRanking();
});
</script>

<style scoped>
.text-bold {
  font-weight: bold;
  color: var(--q-primary);
  text-align: center;
}

.piramide-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.livro-top {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.livro-base {
  display: flex;
  gap: 16px;
}

.chip-custom {
  background-color: var(--q-primary);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar-custom {
  margin-right: 12px;
  font-weight: bold;
}

.livro-nome {
  flex: 1;
  text-align: left;
  color: white;
  font-size: 1rem;
}
</style>
