<script setup>
    import UsersList from './UsersList.vue'
    import Modal from '../_UI/Modal.vue';
    import { useStoreAction } from 'src/stores/action';
    import FormUsers from './form/FormUsers.vue';
    const storeAction = useStoreAction()


    const closeModal = () => {
        storeAction.action = false
    }
   
</script>


<template>
    <div class="container-users">
        <div class="container-users__content-button">
            <button 
                class="container-users__button"
                @click="storeAction.onConfirm({type: 'isCreate'})"
            >
                Criar Usuário
            </button>
        </div>

        <UsersList />

        <Modal
            :title="storeAction.action.type === 'isCreate' ? 'Criar usuário'  : 'Editar usuário'"
            :isOpen="storeAction.action"
            :closeButton="true"
            size="medium"
            @close="closeModal"
        >
            <FormUsers :closeModal="closeModal"  :edit="storeAction.action.data"/>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
    .container-users {
        display: flex;
        width: 100%;
        flex-direction: column;
        &__content-button {
            bottom: 25px;
            position: relative;
            width: 300px;
            margin-bottom: 40px;
            display: flex;
            justify-content: flex-end;
            width: 100%;
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
            &:hover {
                transform: scale(1.1);
            }
    
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
        }
    }
</style>