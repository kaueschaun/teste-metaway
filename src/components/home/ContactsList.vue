
<script setup>

    import { useContactStore } from '../../stores/contacts.js';
    import { onMounted, computed, ref, watch } from 'vue'
    import favoriteApi from 'src/api/requests/favorite.js';
    import CardContact from './card/CardContact.vue';
    import {useToast} from 'vue-toast-notification';
    import contactsApi from 'src/api/requests/contacts.js';
    import Modal from '../_UI/Modal.vue';
    import NotFound from '../commons/NotFound.vue';
    import Loader from '../_UI/Loader.vue';
    import { reactive } from 'vue';
    import debounce from 'src/helpers/debounce.js';
    import FormContacts from './form/FormContacts.vue';

    const isModalOpen = ref(false);

    const props = defineProps({
        isLoader: { type: Boolean},
        isNotFound: { type: Boolean}
    });
   
    const toast = useToast()
    const contactStore = useContactStore(); 
    const contactsFull = computed(() => contactStore.contactsCombined);
    const contacts = contactsFull
    const contact = ref(null)
    const isLoading = ref(false)
    const edit = reactive({})
    const verify = contacts


    const onConfirm = (action ) => {
        if(action.type === 'isDelete') {
            contact.value = action.data
            isModalOpen.value = 'isDelete';
        }
        if(action.type === 'isEdit') {
            edit.value = action.data
            isModalOpen.value = 'isEdit';
        }
        if(action.type === 'isCreate') {
            isModalOpen.value = 'isCreate';
        }
    }
    
    const closeModal = () => {
        isModalOpen.value = false;
        edit.value = null
    }
    onMounted(async () => {
        isLoading.value = true

        if(props.isLoader === true) {
            isLoading.value = !isLoading.value
        }
        
        try {
            await contactStore.fetchContacts();
            await contactStore.fetchFavorites();
            
        } catch (error) {
            
        } finally {
            isLoading.value = false
        }
    });

    watch(() => contactStore.searchResults, (newSearchResults, oldSearchResults) => {
        if (newSearchResults !== oldSearchResults) {
            contacts.value.splice(0, contacts.value.length, ...newSearchResults);
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

    const deleteContact = async(contact) => {
        isLoading.value = true
        if(contact.favorito) {
            toast.warning('Remova o contato dos favoritos!', {
                position: 'top'
            })
            isModalOpen.value = false
            isLoading.value = false
            return
        }
        try {
           await contactsApi.delete(contact.id)
           toast.success('Contato excluído com sucesso!', {
               position: 'top'
           })
           contactStore.removeContact(contact.id); 
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            })
        } finally {
            debounced()  // Simulando o tempo da api 
        }
    }


    const debounced = debounce(() => {
        isLoading.value = false;
        isModalOpen.value = false;
    }, 500); // Simulando o tempo da API com debounce
    

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
        <div class="container-list__content-add">
           <button 
                type="button"
                class="container-list__button" 
                @click="onConfirm({type: 'isCreate'})"
            >
                Criar Contato
            </button>
        </div>
        <div class="container-list__content"  v-if="verify.length > 0 && !isLoader && !isLoading">
            <div v-for="contact in contacts" :key="contact.id" class="container-list__item">
                <CardContact 
                    :data="contact"
                    :onAddFavorite="addNewFavorite" 
                    :onRemoveFavorite="removeFavorite" 
                    @action-request="onConfirm"
                />
            </div>
        </div>
        <div v-else-if="isLoader || isLoading">
            <Loader color="secondary"  size="40px"/>
        </div>
        <div v-else-if="isNotFound || verify.length === 0">
            <NotFound  title="Nenhum resultado encontrado!" size="70px"/>
        </div>
    
        <Modal
            :isOpen="isModalOpen"
            :closeButton="true"
            :title="isModalOpen === 'isCreate' && 'Criar contato' || isModalOpen === 'isEdit' && 'Editar Contato'"
            size="medium"
            @close="closeModal"
        >
            <div class="container-list__content-confirm " v-if="isModalOpen === 'isDelete' ">
                <h3 class="container-list__title-confirm">Tem certeza que deseja excluir ?</h3>
                <div v-if="!isLoading">
                    <button class="container-list__button-confirm" @click="deleteContact(contact)">Confirmar</button>
                    <button class="container-list__button-exit" @click="isModalOpen = false">Cancelar</button>
                </div>
                <div v-else-if="isLoading">
                    <Loader color="secondary" size="40px"/>
                </div>
            </div>
            <div v-else-if="isModalOpen === 'isCreate' || isModalOpen === 'isEdit' ">
               <FormContacts :closeModal="closeModal" :action="isModalOpen" :data="edit"/>
            </div>
        </Modal>
        
    </div>
</template>

<style lang="scss" scoped>
    .container-list {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;

        &__content-add {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            position: relative;
        }

        &__button {
            background: transparent;
            border: 1px solid $secondary;
            padding: 10px;
            width: 120px;
            font-weight: bold;
            border-radius: 4px;
            color: $secondary;
            position: relative;
            display: flex;
            align-items: center;
            text-indent: 15px;
            transition: all ease-in-out .25s;
            
            
            &::before, &::after {
                content: '';
                position: absolute;
                background-color: $secondary;
            }
            
            &::before {
                width: 2px;
                margin-left: 4px;
                height: 10px; 
            }
            
            &::after {
                width: 10px; 
                height: 2px;
            }
            
            &:hover {
                transform: scale(1.1);
                cursor: pointer;
            }
        }


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

        &__content-confirm {
            display: flex;
            flex-direction: column;
            align-items: center;
            & > div {
                margin-top: 15px;
            }
        }

        &__title-confirm {
            color: $secondary;
        }
        &__button-exit {
            background: $secondary;
            width: 70px;
            height: 25px;
            border-radius:  4px;
            color: $primaryDark;
            margin-left: 10px;
            cursor: pointer;
        }
        &__button-confirm {
            background: $success;
            width: 70px;
            height: 25px;
            border-radius:  4px;
            color: $secondary;
            cursor: pointer;
        }
    }
</style>