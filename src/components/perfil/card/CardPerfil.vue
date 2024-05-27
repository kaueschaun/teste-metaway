<script setup>
    import Icon from 'src/components/_UI/Icon.vue';
    import { useUserStore } from 'src/stores/user';
    import date from 'src/helpers/date';

    const userStore = useUserStore()
    const formatDate  = dateContent => date.format(dateContent)

    const emit = defineEmits(['on-action']);

    const onActions = (action) => {
        emit('on-action', action);
    };

</script>

<template>
    <div class="container-card">
        <div class="container-card__content">
            
            <div class="container-card__row">
                <Icon name="user"  color="#A2A0A0"/>
                <p class="container-card__text-infos">Nome de Usuário:</p>
                <p class="container-card__text-data">{{userStore.$state.username}}</p>
            </div>
            
            <div class="container-card__row">
                <Icon name="call"/>
                <p class="container-card__text-infos">Telefone:</p>
                <p class="container-card__text-data">{{userStore.$state.telefone}}</p>
            </div>

            <div class="container-card__row">
                <Icon name="email"  color="#A2A0A0"/>
                <p class="container-card__text-infos">E-mail:</p>
                <p class="container-card__text-data">{{userStore.$state.email}}</p>
            </div>

            <div class="container-card__row">
                <Icon name="badge"  color="#A2A0A0"/>
                <p class="container-card__text-infos">Nome:</p>
                <p class="container-card__text-data">{{userStore.$state.name}}</p>
            </div>
            <div class="container-card__row">
                <Icon name="lock"  color="#A2A0A0"/>
                <p class="container-card__text-infos">Tipo de Permissão:</p>
                <p class="container-card__text-data" v-for="role in userStore.$state.role">
                    {{ role }}
                </p>
            </div>
            
            <div class="container-card__row">
                <Icon name="calendar"  color="#A2A0A0"/>
                <p class="container-card__text-infos">Data de Nascimento:</p>
                <p class="container-card__text-data">{{formatDate(userStore.$state.birthDate)}}</p>
            </div>

            <div class="container-card__row">
                <p class="container-card__text-infos">CPF:</p>
                <p class="container-card__text-data">{{userStore.$state.cpf}}</p>
            </div>

            <div class="container-card__content-icons">
                <div 
                    class="container-card__action-perfil"
                    @click="onActions('edit-perfil')"
                 >
                    <Icon name="edit" size="20px" />
                    <p class="container-card__text-data">Editar</p>
                </div>
                <div 
                    @click="onActions('edit-password')" 
                    class="container-card__action-password"
                >
                    <Icon name="lock-reset" size="20px" />
                    <p class="container-card__text-data">Alterar Senha</p>
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
    .container-card {
        background: $secondary;
        border-radius: 8px;
        height: 380px;
        width: 100%;
        display: flex;
        padding: 15px;

        @media (min-width: $breakpoint-small) {
            width: 100%;
        }
        @media (min-width: 450px) {
            width: 350px;
        }
        &__content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 5px;
        }

        &__content-icons {
            display: flex;
            justify-content: center;
            width: 100%;
            align-items: center;
            margin-top: 20px;
            & > div {
                display: flex;
                align-items: center;
                flex-direction: row;
                cursor: pointer;
            }
        }

        &__text-infos {
            margin-left: 5px;
            color: $primaryDark;
            font-size: 12px;
            font-weight: bold;
        }
        &__row {
            margin-top: 15px;
            display: flex;
            flex-direction: row;
            align-items: center;  
        }
        &__text-data {
            color: $primaryDark;
            font-size: 12px;
            margin-left: 5px;
        }

        &__action-password, &__action-perfil {
            margin-left: 15px;
            transition: all ease-in-out .25s;
            &:hover {
                transform: scale(1.1);
            }

        }
    }
</style>