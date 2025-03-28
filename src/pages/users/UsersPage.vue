<template>
  <q-page style="padding: 0px 15px">
    <div class="header">
      <h5>Usuários</h5>
      <div class="css-buttons">
        <SearchInput v-model="textSearch" @search-input="searchUser" />
        <ButtonNew
          v-if="!Role.isVisitor()"
          @open-create-modal="openModalCreate"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        @request="onRequest"
        :rows-per-page-options="[10, 20, 30, 40, 50]"
        no-data-label="Nenhum registro encontrado"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="background-color: var(--q-primary)"
            >
              <span style="color: white">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              icon="visibility"
              color="grey-8"
              @click="showModalView(props.row)"
            />
            <q-btn
              v-if="!Role.isVisitor()"
              flat
              round
              icon="edit"
              color="grey-8"
              @click="showModalEdit(props.row)"
            />
            <q-btn
              v-if="!Role.isVisitor()"
              flat
              round
              icon="delete"
              color="red-7"
              @click="showModalDelete(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <DialogCreateUser
    v-model="ModalCreate"
    @submit="createUser"
    :modal-without-error="modalWithoutError"
  />
  <DialogEditUser
    v-model="ModalEdit"
    :user-edit="user"
    @submit="editUser"
    :modal-without-error="modalWithoutError"
  />
  <DialogViewUser v-model="ModalView" :user-view="user" />
  <DialogDeleteUser
    v-model="ModalDelete"
    :modal-without-error="modalWithoutError"
    :user="user"
    @submit="deleteUser"
  />
</template>

<script setup lang="ts">
import { QTableProps, useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { User, UserList } from 'src/interfaces/Users.interface';
import { UserApi } from 'src/api/UserApi';
import { Parameters } from 'src/interfaces/Utils.intrface';
import { NotifyMessage } from 'src/helpers/Notify';
import DialogCreateUser from './components/DialogCreateUser.vue';
import ButtonNew from 'src/components/ButtonNew.vue';
import SearchInput from 'src/components/SearchInput.vue';
import { handleError } from 'src/helpers/Errors';
import DialogEditUser from './components/DialogEditUser.vue';
import DialogViewUser from './components/DialogViewUser.vue';
import DialogDeleteUser from './components/DialogDeleteUser.vue';
import { Role } from 'src/helpers/Role';

const $q = useQuasar();

const ModalCreate = ref(false);
const ModalEdit = ref(false);
const ModalView = ref(false);
const ModalDelete = ref(false);

const modalWithoutError = ref(false);

const textSearch = ref('');

interface Column {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'center' | 'right';
}

const columns = ref<Column[]>([
  {
    name: 'name',
    label: 'Usuário',
    field: 'name',
    align: 'center',
  },
  {
    name: 'role',
    label: 'Perfil',
    field: 'role',
    align: 'center',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  },
]);

const user = ref<User>();
const users = ref<UserList[]>([]);

const request: Parameters = {
  search: '',
  page: 0,
  size: 10,
  sort: 'id',
  direction: 'ASC',
};

const pagination = ref<QTableProps['pagination']>({
  page: 0,
  rowsNumber: 0,
  rowsPerPage: 10,
});

const onRequest: QTableProps['onRequest'] = function (props) {
  const { page, rowsPerPage } = props.pagination;

  request.page = page - 1;
  request.size = rowsPerPage;
  pagination.value!.page = page;
  pagination.value!.rowsPerPage = rowsPerPage;
  getUsers();
};

async function getUsers() {
  try {
    const response = await UserApi.getUserList(request);
    pagination.value!.rowsNumber = response.totalElements;
    pagination.value!.rowsPerPage = response.pageSize;
    users.value = response.content;
    modalWithoutError.value = false;
  } catch (error) {
    NotifyMessage.notifyError('Erro ao carregar os usuários');
  }
}

function openModalCreate() {
  ModalCreate.value = true;
}

async function createUser(user: User) {
  try {
    await UserApi.createBook(user);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Usuário cadastrado com sucesso!');
    getUsers();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function showModalEdit(userRow: User) {
  ModalEdit.value = true;
  const response = await UserApi.getUserId(userRow.id!);
  user.value = response.data;
}

async function editUser(user: User) {
  try {
    await UserApi.updateUser(user);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Usuário editado com sucesso!');
    getUsers();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

async function showModalView(userRow: User) {
  ModalView.value = true;
  const response = await UserApi.getUserId(userRow.id!);
  user.value = response.data;
}

async function showModalDelete(userRow: User) {
  ModalDelete.value = true;
  user.value = userRow;
}

async function deleteUser(id: number) {
  try {
    await UserApi.deleteUser(id);
    modalWithoutError.value = true;
    NotifyMessage.notifySuccess('Usuário excluido com sucesso!');
    getUsers();
  } catch (error) {
    modalWithoutError.value = false;
    const errorResponse = handleError(error);
    errorResponse.forEach((err) => {
      NotifyMessage.notifyError(err);
    });
  }
}

function searchUser() {
  request.search = textSearch.value;
  getUsers();
}

async function loadBooksScreen() {
  $q.loading.show();
  try {
    await getUsers();
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  loadBooksScreen();
});
</script>

<style scoped></style>
