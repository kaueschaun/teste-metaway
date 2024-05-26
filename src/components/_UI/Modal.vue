
  
<script setup>
    import { computed } from 'vue';
    import Icon from './Icon.vue';

    const props = defineProps({
        isOpen: Boolean,
        closeButton: Boolean,
        title: String,
        size: {
            type: String,
            default: 'medium',
            validator: value => ['small', 'medium', 'large'].includes(value)
        }
    });

    const emit = defineEmits(['close']);

    const onCloseClick = (e) => {
        e.preventDefault();
        emit('close', e || false);
    };

    const sizeClass = computed(() => {
        return {
        small: 'styled-modal__small',
        medium: 'styled-modal__medium',
        large: 'styled-modal__large'
        }[props.size];
    });
</script>



<template>
    <div v-if="isOpen" class="styled-modal" @click="onCloseClick">
        <div :class="['styled-modal__modal', sizeClass]" @click.stop>
            <button v-if="closeButton" class="styled-modal__close" @click="onCloseClick">
                <Icon name="close" color="#fff"/>
            </button>
            <h2 v-if="title">{{ title }}</h2>
            <div class="styled-modal__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


  
<style scoped lang="scss">
    .styled-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(23, 21, 21, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    
        &__modal {
            background: $primary;
            padding: 20px;
            border-radius: 10px;
            position: relative;
            transition: all 0.3s ease-in-out;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            & > h2 {
                color: $secondary;
            }
    
            &.styled-modal__small {
                width: 300px;
            }
        
            &.styled-modal__medium {
                width: 500px;
                max-width: 500px;
            }
    
            &.styled-modal__large {
                width: 800px;
            }
        }
    
        &__close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            font-size: 20px;
            cursor: pointer;
        }
    
        &__content {
            margin-top: 20px;
        }
    }
</style>
  