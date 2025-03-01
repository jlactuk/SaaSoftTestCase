<script setup lang="ts">
import TrashIcon from './VueIcons/TrashIcon.svg'
import HiddenPasswordIcon from './VueIcons/HiddenPasswordIcon.svg'
import ShowPasswordIcon from './VueIcons/ShowPasswordIcon.svg'
import QuestionIcon from './VueIcons/QuestionIcon.svg';
import {ref} from 'vue';
const isShowPassword = ref(false);
</script>

<template>
  <main class="container mx-auto grid gap-4">
    <header class="flex gap-4 items-center">
      <p class="text-2xl">Учетная запись</p>
      <button class="p-4 border rounded-md box-content">+</button>
    </header>
    <article class="bg-gray-200 flex gap-2 p-2.5 rounded-md">
        <QuestionIcon />
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </article>
    <section class="grid w-full gap-2">
      <article class="grid grid-cols-5 gap-2">
        <p>Метки</p>
        <p>Тип записи</p>
        <p>Логин</p>
        <p>Пароль</p>
      </article>
      <article class="grid grid-cols-5 gap-2">
        <input type="text" placeholder="Метки" maxlength="50" class="border rounded-md p-2.5 outline-none w-full">
        <select name="#" id="#" class="border rounded-md p-2.5 bg-transparent">
          <option value="locale">Локальная</option>
          <option value="ldap">LDAP</option>
        </select>
        <input type="text" pattern="Логин" class="border rounded-md p-2.5 outline-none w-full">
        <label for="#" class="flex border rounded-md p-2.5 justify-between">
          <input :type="isShowPassword ? 'password' : 'text'" pattern="Пароль" autocomplete="false" class="outline-none w-full">
          <ShowPasswordIcon v-if="!isShowPassword" @click="isShowPassword = true"/>
          <HiddenPasswordIcon v-if="isShowPassword" @click="isShowPassword = false"/>
        </label>
        <button>
          <TrashIcon />
        </button>
      </article>
    </section>
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
