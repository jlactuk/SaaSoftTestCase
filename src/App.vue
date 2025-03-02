<script setup lang="ts">

import QuestionIcon from './VueIcons/QuestionIcon.svg';
import AccountRow from './components/AccountRow.vue'
import {useAccountStore} from './store/AccountStore';
import type { Account } from './interfaces/Account';
const accountStore = useAccountStore();
function removeAccount(id : Number) {
  accountStore.removeAccount(id);
}
function changeData(data : Account) {
  accountStore.changeAccount(data);
}
function createRow() {
  accountStore.changeAccount({
    id : accountStore.Accounts.length,
    markers: null,
    typeRecord: 'locale',
    login: null,
    password: null
  });
}
</script>

<template>
  <main class="container mx-auto grid gap-4 mt-10" >
    <header class="flex gap-4 items-center">
      <p class="text-2xl">Учетная запись</p>
      <button class="py-4 px-6 border rounded-md box-content" @click="createRow()">+</button>
    </header>
    <article class="bg-gray-200 flex gap-2 p-2.5 rounded-md items-center w-full">
        <QuestionIcon />
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </article>
    <section class="grid w-full gap-2">
      <article class="grid grid-cols-5 gap-2 text-gray-400">
        <p>Метки</p>
        <p>Тип записи</p>
        <p>Логин</p>
        <p>Пароль</p>
      </article>
      <TransitionGroup name="list">
      <template v-for="account in accountStore.Accounts" :key="account.id">
        
        <AccountRow :accountData="account" @changeAccountData="(data) => changeData(data)" @removeAccount="(id) => removeAccount(id)"/>
      </template>
    </TransitionGroup>
    </section>
  </main>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
