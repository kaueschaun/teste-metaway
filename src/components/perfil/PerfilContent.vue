<script setup>
    import { onMounted } from 'vue';
    import CardPerfil from './card/CardPerfil.vue';
    import { useUserStore } from 'src/stores/user';
    import { ref } from 'vue';
    import Loader from '../_UI/Loader.vue';
    import debounce from 'src/helpers/debounce';
    import Modal from '../_UI/Modal.vue';
    import FormPerfil from './form/FormPerfil.vue';
    import FormUpdatePassword from './form/FormUpdatePassword.vue';

    


    const userStore = useUserStore()
    const userId = userStore

    const isLoading = ref(false)
    const isModalOpen = ref(false)

    const onConfirm = (action) => {
       if(action === 'edit-perfil') {
            isModalOpen.value = 'edit-perfil'
       }
       if(action === 'edit-password') {
            isModalOpen.value = 'edit-password'
       }
    }

    onMounted(() => {
       isLoading.value = true
       if(userStore.$state) {
            debounced()
       }
    })

    const closeModal = () => {
        isModalOpen.value = false;
    }

    const debounced = debounce(() => {
        isLoading.value = false;
    }, 500); // Simulando o tempo da API com debounce

</script>

<template>
    <div class="container-perfil">
        <div v-if="!isLoading">
            <CardPerfil @on-action="onConfirm" />
        </div>
        <div class="container-perfil__loading" v-else-if="isLoading">
            <Loader size="40px" color="secondary"/>
        </div>
        <Modal
            :isOpen="isModalOpen"
            :closeButton="true"
            :title="isModalOpen === 'edit-perfil' ? 'Editar dados' : 'Editar senha' "
            size="medium"
            @close="() => isModalOpen = false"
        >
            <FormPerfil 
                v-if="isModalOpen === 'edit-perfil'"
                :closeModal="closeModal"
            />

            <FormUpdatePassword
                v-else-if="isModalOpen === 'edit-password'"
                :closeModal="closeModal"
            />
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
    .container-perfil {
        margin-top: 60px;
        display: flex;
        flex-direction: column;

        width: 100%;
        &__loading {
            display: flex;
            justify-content: center;
        }
    }
</style>