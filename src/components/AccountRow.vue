<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import TrashIcon from '../VueIcons/TrashIcon.svg'
import HiddenPasswordIcon from '../VueIcons/HiddenPasswordIcon.svg'
import ShowPasswordIcon from '../VueIcons/ShowPasswordIcon.svg'
import type {Account} from '../interfaces/Account'
// Состояние для показа/скрытия пароля
const isShowPassword = ref(false);
const emits = defineEmits(['removeAccount', 'changeAccountData']);
const props = defineProps<{
    accountData : Account
}>();


// Реактивное состояние учетной записи
const accountData = reactive<Account>(props.accountData);

// Статус валидации полей
const validationState = reactive({
    markers: true,
    login: true,
    password: true,
});

// Вычисляемое свойство для разделения меток через точку с запятой
const splitMarkers = computed({
    get: () => {
        return accountData.markers !== null ? accountData.markers.map(marker => marker.text).join(';') : '';
    },
        
    set: (newValue) => {
        const markers = newValue.split(';').map((marker) => marker.trim()).filter((marker) => marker !== '');
        if (markers.join(';').length > 50) {
            validationState.markers = false;
        } else {
            validationState.markers = true;
        }
        accountData.markers = markers.length > 0 ? markers.map(marker =>{ return {text: marker} }) : null;
    },
});

// Функция валидации обязательных полей
const validateFields = (): boolean => {
    if (!accountData['login'] || (accountData['login'].trim() === '' || accountData['login']?.length > 100)) {
        validationState['login'] = false;
        return false;
    }
    validationState['login'] = true;
    if (accountData.typeRecord === 'locale') {
        if ( !accountData['password'] || accountData['password'].trim() === '' || accountData["password"]?.length > 100) {
            validationState['password'] = false;
            return false;
        }
    }    
    validationState['password'] = true;
    validationState['markers'] = accountData.markers === null || accountData.markers?.join(';').length <= 50;
    
    if(validationState['markers']) 
     saveAccount() 
    else
     return false;
};

// Функция сохранения/обновления учетной записи
const saveAccount = () => {
    emits('changeAccountData', accountData);
};
// Функция удаления записи
const removeAccount = () => {
    emits('removeAccount', accountData.id);
}
// Обработчики событий
const handleBlur = () => {
    validateFields();
};

const handleChangeTypeRecord = () => {
    validateFields();
    if (accountData.typeRecord === 'ldap') {
        accountData.password = null; // При выборе LDAP, пароль сбрасывается
    }
};
</script>

<template>
    <article class="grid grid-cols-5 gap-2 items-center w-full">
        <!-- Метки -->
        <input
            type="text"
            placeholder="Метки (необязательно)"
            maxlength="50"
            class="border rounded-md p-2.5 outline-none w-full"
            v-model="splitMarkers"
            @blur="handleBlur()"
        />

        <!-- Тип записи -->
        <select
            name="#"
            id="#"
            class="border rounded-md p-2.5 bg-transparent"
            v-model="accountData.typeRecord"
            @change="handleChangeTypeRecord"
        >
            <option value="locale">Локальная</option>
            <option value="ldap">LDAP</option>
        </select>

        <!-- Логин -->
        <input
            type="text"
            placeholder="Логин (обязательно, максимум 100 символов)"
            maxlength="100"
            class="border rounded-md p-2.5 outline-none w-full"
            :class="{ 'border-red-500': !validationState.login, 'col-span-2' : accountData.typeRecord === 'ldap' }"
            v-model="accountData.login"
            @blur="handleBlur()"
        />

        <!-- Пароль -->
        <label
            v-if="accountData.typeRecord === 'locale'"
            for="#"
            class="flex border rounded-md p-2.5 justify-between"
            :class="{ 'border-red-500': !validationState.password }"
        >
            <input
                :type="isShowPassword ? 'text' : 'password'"
                placeholder="Пароль (обязательно, максимум 100 символов)"
                maxlength="100"
                autocomplete="false"
                class="outline-none w-full"
                v-model="accountData.password"
                @blur="handleBlur()"
            />
            <button @click="isShowPassword = !isShowPassword">
                <ShowPasswordIcon v-if="isShowPassword"/>
                <HiddenPasswordIcon v-if="!isShowPassword"/>
            </button>
        </label>

        <!-- Кнопка сохранения -->
        <TrashIcon @click="removeAccount()" class="cursor-pointer"/>
    </article>
</template>