import { defineStore } from 'pinia'
import {ref} from 'vue'
import type { Account } from '../interfaces/Account';
export const useAccountStore = defineStore('Account', () => {

    const Accounts = ref(JSON.parse(localStorage.getItem('accounts') || '[]') as Account[]);

    function changeAccount(data : Account) {
        
        const  index  = Accounts.value.findIndex(account => account.id === data.id);

        if(index !== -1) 
            Accounts.value[index] = data;
        else
            Accounts.value.push(data)
            
            saveToLocalStorage()
    }
    function removeAccount(id : Number) {
        const index  = Accounts.value.findIndex(account => account.id === id);
        if(index !== -1) {
            Accounts.value = Accounts.value.filter((account) => account.id !== id);
            saveToLocalStorage()
            return true;
        }
            return false;
    }
    function saveToLocalStorage() {
        localStorage.setItem('accounts', JSON.stringify(Accounts.value.filter(account => account.login !== null))); 
    }
    return {Accounts,changeAccount, removeAccount}
})

