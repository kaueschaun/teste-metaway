
<script setup>
    import { useContactStore } from '../../stores/contacts.js';
    import { onMounted, computed, ref } from 'vue'
    import favoriteApi from 'src/api/requests/favorite.js';
    import CardContact from './card/CardContact.vue';
    import {useToast} from 'vue-toast-notification';
    import Loader from '../_UI/Loader.vue';
    import contactsApi from 'src/api/requests/contacts.js';

    const toast = useToast()
    const contactStore = useContactStore(); 
    const contactsFull = computed(() => contactStore.contactsCombined);
    const contacts = contactsFull

    const isLoading = ref(false)

    onMounted(async () => {
        isLoading.value = true
        try {
            await contactStore.fetchContacts();
            await contactStore.fetchFavorites();
            
        } catch (error) {
            
        } finally {
            isLoading.value = false
        }
    });

    const addNewFavorite = async(contact) => {
        try {
            await favoriteApi.create(contact); 
            toast.success('Contato adicionado aos favoritos!', {
                position: 'top'
            })
            contactStore.addFavorite(contact); 
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            })
        }
    };

    const deleteContact = async(id) => {
        try {
           const {data} = await contactsApi.delete(id)
           contactStore.removeContact(id); 
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            })
        } finally {

        }
    }

    const removeFavorite = async(id) => {
        try {
            await favoriteApi.remove(id); 
            contactStore.removeFavorite(id); 
            toast.success('Contato removido dos favoritos!', {
                position: 'top'
            })
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            })
        } 
    };
    

</script>

<template>
    <div class="container-list">
        <div class="container-list__content" v-if="!isLoading">
            <div v-for="contact in contacts" :key="contact.id" class="container-list__item">
                <CardContact 
                :data="contact"
                :onAddFavorite="addNewFavorite" 
                :onRemoveFavorite="removeFavorite" 
                :onRemoveContact="deleteContact"
                />
            </div>
        </div>
        <div  v-else-if="isLoading">
            <Loader color="secondary"  size="40px"/>
        </div>
    </div>
</template>

<style lang="scss" scope>
    .container-list {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        &__content {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        &__item {
            width: 100%;
            margin-top: 20px;
            @media (min-width: $breakpoint-medium) and (max-width: $breakpoint-xlarge){
                width: 47%;
            }
            @media (min-width: $breakpoint-xlarge) {
                width: 31%;
            }
        }
    }
</style>