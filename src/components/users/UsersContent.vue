<script setup>
    import UsersList from './UsersList.vue'
    import Modal from '../_UI/Modal.vue';
    import FormCreateUser from '../users/form/FormCreateUser.vue'
    import { ref } from 'vue';

    const isModalOpen = ref(false)

    const onConfirm = (action ) => {
        if(action  === 'isCreate') {
            isModalOpen.value = 'isCreate';
        }

        if(action === 'isEdit') {
            isModalOpen.value = 'isCreate';
        }
    }  

    const closeModal = () => {
        isModalOpen.value = false
    }

</script>


<template>
    <div class="container-users">
        <div class="container-users__content-button">
            <button 
                class="container-users__button"
                @click="onConfirm('isCreate')"
            >
                Criar Usuário
            </button>
        </div>

        <UsersList />

        <Modal
            :title="isModalOpen === 'isCreate' ? 'Criar usuário'  : 'Editar usuário'"
            :isOpen="isModalOpen"
            :closeButton="true"
            size="medium"
            @close="closeModal"
        >
            <FormCreateUser :closeModal="closeModal"/>
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
            // background: red;
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