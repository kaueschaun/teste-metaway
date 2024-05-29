<script setup>
    import { useUsersStore } from 'src/stores/users';
    import date from 'src/helpers/date';
    import Icon from 'src/components/_UI/Icon.vue';
    const formatDate  = dateContent => date.format(dateContent);
    import phoneFormatter from 'src/helpers/phone.js';
    import { useStoreAction } from 'src/stores/action';
    const storeAction = useStoreAction()


    const props = defineProps({
        data: Object,
    });

    const action = async(action) => {
       await storeAction.onConfirm(action)
    }
</script>

<template>
    <div class="container-card">
         <div class="container-card__content">
            <div class="container-card__row">
                <Icon name="user"  color="#A2A0A0"/>
                <p class="container-card__text-infos">Nome de Usuário:</p>
                <p class="container-card__text-data">{{data.username ? data.username : 'Não Informado'}}</p>
            </div>
            
            <div class="container-card__row">
                <Icon name="call"/>
                <p class="container-card__text-infos">Telefone:</p>
                <p class="container-card__text-data">{{ data.telefone ? phoneFormatter(data.telefone) : 'Não Informado' }}</p>
            </div>

            <div class="container-card__row">
                <Icon name="email"  color="#A2A0A0"/>
                <p class="container-card__text-infos">E-mail:</p>
                <p class="container-card__text-data">{{data.email ? data.email : 'Não Informado'}}</p>
            </div>

            <div class="container-card__row">
                <Icon name="badge"  color="#A2A0A0"/>
                <p class="container-card__text-infos">Nome:</p>
                <p class="container-card__text-data">{{data.nome ? data.nome : 'Não Informado'}}</p>
            </div>
            
            <div class="container-card__row">
                <Icon name="calendar"  color="#A2A0A0"/>
                <p class="container-card__text-infos">Data de Nascimento:</p>
                <p class="container-card__text-data">{{data.dataNascimento ? formatDate(data.dataNascimento) :  'Não Informado'}}</p>
            </div>
            
            <div class="container-card__row">
                <p class="container-card__text-infos">CPF:</p>
                <p class="container-card__text-data">{{data.cpf ? data.cpf : 'Não Informado' }}</p>
            </div>

            <div class="container-card__content-icons">
                <div 
                    class="container-card__action-user"
                     @click="action({data, type:'isEdit'})" 
                 >
                    <Icon name="edit" size="20px" />
                    <p class="container-card__text-data">Editar</p>
                </div>

            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .container-card {
        padding: 15px;
        width: 100%;
        background: $secondary;
        height: 310px;
        border-radius: 8px;
        @media(max-width: $breakpoint-micro) {
            height: 340px;
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
            flex-wrap: wrap;
            text-align: center;
        }

        &__text-data {
            color: $primaryDark;
            font-size: 12px;
            margin-left: 5px;
        }

        &__action-user {
            transition: all ease-in-out .25s;
            &:hover {
                transform: scale(1.1);
            }

        }
    }
</style>