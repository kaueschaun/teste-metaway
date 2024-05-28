<script setup>
    import Icon from 'src/components/_UI/Icon.vue';
    import { ref } from 'vue';

    const props = defineProps({
        data: Object,
        onAddFavorite: Function,
        onRemoveFavorite: Function,
    });

    const emit = defineEmits(['delete-request']); 

    const actionContact = (contact) => {
        if(contact.favorito) {
            removeFavorite(contact.id)
        }
        if(!contact.favorito) {
            addFavorite(contact)
        }
    }

    const addFavorite = (contact) => {
        props.onAddFavorite(contact);
    };
    

    const onActions = (contact) => {
        emit('action-request', contact);
    };

    const removeFavorite = (id) => {
        props.onRemoveFavorite(id);
    };
</script>


<template>
    <div class="container-card">
        <div class="container-card__header">
            <div class="container-card__top-slot">
                <div class="container-card__image">
                    <h1>oi</h1>
                </div>
                <div class="container-card__info">
                    <p class="container-card__text-phone"><b>{{data?.tipoContato && data.tipoContato}} - {{ data?.tag && data.tag }}</b></p>
                    <p>{{ data?.telefone && data?.telefone }}</p>
                </div>
            </div>
            <div class="container-card__content">
                <div class="container-card__icons-actions">
                    <Icon name="delete" size="small" class="container-card__icons" @click="onActions({data, type: 'isDelete'})"/>
                    <Icon name="edit" size="small"  class="container-card__icons" @click="onActions({data, type: 'isEdit'})"/>
                    <button @click="actionContact(data)" class="container-card__actions-favorite">
                        <span :class="`${data.favorito === true ? 'container-card__star-favorite' : 'container-card__star'}`"></span> 
                    </button>
                </div>
            </div>
        </div>
        <div class="container-card__basic-infos">
            <p :class="`${data.privado ?  'container-card__private-tag' : 'container-card__not-private-tag'}`" ><b>{{ data.privado ?  'Privado' : 'Não privado'}}</b></p>
            <div class="container-card__row-infos">
                <p><b>Email:</b></p><p class="container-card__text-email"> {{ data?.email && data.email !== 'null' && data.email.trim() !== '' ? data.email : 'Não informado' }} </p>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    .container-card {
        background: $secondary;
        height: 220px;
        width: 100%;
        border-radius: 4px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 10px;

        &__header {
            display: flex;
            flex-direction: column-reverse;
            height: 120px;
            width: 100%;
            
        }

        &__top-slot {
            width: 100%;
            height: 150px;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        &__info {
            display: flex;
            flex-direction: column;
            padding-top: 15px;
            width: 100%;
            align-items: center;
            justify-content: center;
            & > p {
                color: $primaryDark;
                margin-top: 5px;
                margin-left: 5px;
                font-size: 10px;
                @media (min-width: $breakpoint-small) {
                    font-size: 14px;

                }
            }
        }
        &__text-phone {
            text-transform: uppercase;
        }

        &__image {
            width: 110px;
            background: gray;
            height: 100%;
            border-radius: 4px;
        }
        &__content  {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 60px;
            justify-content: flex-end;
        }

        &__icons-actions {
           display: flex;
           width: 100%;
           align-items: center;
           height: 100%;
           justify-content: flex-end;   
        }  

        &__icons {
            margin-left: 10px;
            transition: all ease-in-out .25s;
            &:hover {
                cursor: pointer;
                transform: scale(1.2);
                opacity: 0.7;
            }
        }

        &__actions-favorite {
            background: transparent;
            margin-left: 10px;
            &:hover {
                cursor: pointer;
            }
        }

        @mixin star($color) {
            display: inline-block;
            position: relative;
            width: 0;
            height: 0;
            border-right: 12px solid transparent;
            border-bottom: 9px solid $color;
            border-left: 12px solid transparent;
            transform: rotate(35deg);

            &::before,
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: -12px;
                width: 0;
                height: 0;
                border-right: 12px solid transparent;
                border-bottom: 9px solid $color;
                border-left: 12px solid transparent;
            }

            transition: all ease-in-out .30s;
            
            &:hover {
                transform: scale(1.2);
                opacity: 0.7;
                cursor: pointer;
            }

            &::before {
                transform: rotate(-70deg);
            }

            &::after {
                transform: rotate(-140deg);
            }
        }

        &__star {
            @include star(gray);
        }

        &__star-favorite {
            @include star(gold);
            
        }

        &__basic-infos {
            display: flex;
            flex-direction: column;
            padding-top: 10px;
            width: 100%;
        }
        &__private-tag {
            width: 85px;
            height: 25px; 
            font-size: 14px;
            background: $success;
            color: $secondary;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }

        &__not-private-tag {
            height: 25px;
            width: 85px;
            text-align: center;
            background: $danger;
            color: $secondary;
            margin-bottom: 10px;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        &__row-infos {
            display: flex;
            flex-direction: row;
            height: 40x;
            & > p {
                font-size: 10px;
                color: $primaryDark;
                text-transform: uppercase;
                @media (min-width: $breakpoint-small) {
                    font-size: 14px;
                }
            }
        }

        &__text-email {
            margin-left: 5px;
            display: flex;
            flex-wrap: wrap;
            text-transform: lowercase !important;
        }


    }
</style>