<script setup>
    import usersApi from 'src/api/requests/users';
    import { onMounted } from 'vue';
    import { useUsersStore } from 'src/stores/users';
    import { ref } from 'vue';
    import CardUser from './card/CardUser.vue'
    import Loader from '../_UI/Loader.vue';
    import { useToast } from 'vue-toast-notification';
    import NotFound from '../commons/NotFound.vue';
    

    const storeUsers = useUsersStore()

    const toast = useToast()
    const users = ref([])
    const isLoading = ref(false)
    const isNotFound = ref(false)

    onMounted(() => {
        getUsers()
    })

    const getUsers = async() => {
        isLoading.value = true
        const term = {
            termo: ''
        }
        try {
            const {data} = await usersApi.search(term)
            users.value = data
            storeUsers.setUsers(data)
            if(!users.value.length) {
                isNotFound.value = true
            }
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            })
        } finally {
            isLoading.value = false
        }
    }
</script>

<template>
    <div class="container-list">
        <div 
            v-for="user in users" :key="user.id" 
            class="container-list__item"
            v-if="!isLoading || users.length > 0" 
        >
            <CardUser 
                :data="user"
            />
        </div>

        <div class="container-list__content-loader" v-else-if="isLoading">
            <Loader color="secondary" size="40px" />
        </div>

        <NotFound v-if="isNotFound" title="Nenhum resultado encontrado" size="70px"/>
        
    </div>
</template>

<style lang="scss" scoped>
    .container-list {
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        &__item {
            width: 100%;
            margin-bottom: 60px;
            display: flex;
            @media (min-width: $breakpoint-medium) {
                width: 370px;
            }
        }
        &__content-loader {
            display: flex;
            justify-content: center;
            width: 100%;
        }
    }

</style>