<script setup>
import {RouterLink} from 'vue-router'
import { onMounted, ref } from 'vue';

import menuItens from 'src/theme/menuItens';
import Icon from '../_UI/Icon.vue';
import { useUserStore } from '../../stores/user.js';
import userApi from '../../api/requests/users.js';
import Loader from '../_UI/Loader.vue';

    const store = useUserStore();
    const isExpanded = ref(false)

    const toggleMenu = () => {
      isExpanded.value = !isExpanded.value;
    };

    onMounted(() => {
        if(!store.role) {

            getUser() 
        }
    })

    const getUser = async() => {
        const id = localStorage.getItem('userId')
        try {
            const {data} = await userApi.get(id)
            store.setUser({ id: data.object.usuario.id, role: data.object.tipos[0] });

        } catch (error) {
            
        }
    }
</script>

<template>
<main :class="`${isExpanded && 'sidebar-is-expanded'}`">
    <div class="block-title">
        <Icon name="menu-book" size="medium" />
        <h3 class="title">Agenda Pessoal</h3>
    </div>

    <div class="menu-toogle-wrap">
        <button class="menu-toogle" @click="toggleMenu">
            <Icon name="arrow" class="logo" size="default" color="#A2A0A0" />
        </button>
    </div>

    <div class="container-menu" >

        <div class="container-loader" v-if="!store.role">
            <Loader color="primary"  />
        </div>
        <div v-for="item in menuItens" class="menu" :key="item.name" v-else-if="store.role">
            <RouterLink v-if="item.name !== 'usuários' || store.role === 'ROLE_ADMIN'" :to="item.route" class="link">
                <Icon :name="item.icon" class="icons" size="default" />
                <span class="text-link">{{ item.name }}</span>
            </RouterLink>
        </div>
    </div>
    

    <div class="flex"></div>

    <div class="menu">
        <div class="link">
            <Icon name="logout" class="icons" size="default"/>
            <span class="text-link">Sair</span>
        </div>
    </div>
</main>
</template>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    width: calc(3rem + 32px);
    min-height: 100vh;
    @media (max-width: $breakpoint-small) {
        overflow: unset;
        width: 60px;
    }
    overflow: hidden;
    background: $secondary;
    transition: 0.2s ease-out;

    .flex {
        flex: 1 1 0;
    }
    
    .block-title {
        margin-bottom: 1rem;
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        
    }
    .title {
        display: none;
    }

    .menu-toogle-wrap {
        cursor: pointer;
        display: flex;
        justify-content: center;
        position: relative;
        top: 0;
        transition: 0.2s ease-out;
        margin: 30px 0;

        .menu-toogle {
            background: transparent;
            transition: 0.2s ease-out;

            .logo {
                color: $primaryDark;
                transition: 0.2s ease-out;
            }

            &:hover {
                .logo {
                    color: $primaryDark;
                    transform: translate(0.5rem);
                }
            }
        }
    }

    .container-menu {
        display: flex;
        justify-content: center;
        flex-direction: column;
        .container-loader {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 300px;
        }
    }
    .menu {
        .link {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;

            .icons {
                font-size: 15rem;
                transition: 0.2s ease-out;
            }

            .text-link {
                display: none;
                text-transform: capitalize;
                transition: 0.2s ease-out;
            }

            &:hover, &.router-link-exact-active {
                background: $primary;

                .icons {
                    fill: $secondary;
                }

                .text-link {
                    color: $secondary;
                }
            }

            &.router-link-exact-active {
                border-right: 5px solid $primaryDark;
            }
        }
    }

    &.sidebar-is-expanded {
        width: 240px;
        
        .title {
            display: flex;
            color: $primaryDark;
            margin-left: 10px;
            font-size: 16px;
        }
        
        .block-title {
            padding: 5px 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        .menu-toogle-wrap {
            top: -3.7rem;
            justify-content: flex-end;
            margin: 0 10px 0 0;

            .menu-toogle {
                transform: rotate(-180deg);
            }
        }

        .menu {
            .icons {
                margin-right: 1rem;
            }

            .text-link {
                display: flex;
                color: $primaryDark;
                text-transform: capitalize;
                transition: 0.2s ease-out;
            }

            &:hover {
                .icons {
                    fill: $secondary;
                }

                .text-link {
                    color: $secondary;
                    fill: $secondary;
                }
            }
        }

        @media (max-width: 810px) {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            min-height: 100vh;
            overflow: hidden;
            z-index: 99;
        }
    }
}
</style>

