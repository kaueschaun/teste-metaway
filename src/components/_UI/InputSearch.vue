<script setup>
    import { defineProps, defineEmits } from 'vue';
    import Icon from './Icon.vue'
    const emit = defineEmits(['update:value']);

    const props = defineProps({
        placeholder: {
            type: String,
            default: ''
        },
        onChangeValue: {
            type: Function,
            required: true
        },
        colorIcon: { type: String, default: '#A2A0A0' }
    });

    const toggleValue = (value) => {
        emit('update:value', value || false);
        props.onChangeValue(value || false);
    };
</script>

<template>
    <div class="container">
      <input 
        :placeholder="props.placeholder"
        type="text"
        @input="toggleValue($event.target.value)"
        class="container__styled-input"
      />
      <div class="container__styled-icon">
        <Icon name="search" alt="Imagem Ilustrativa" :color="props.colorIcon"/>
      </div>
    </div>
</template>


<style lang="scss" scoped>
    .container{
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 25px;
        position: relative;
        &__styled-input {
            width: 100%;
            text-indent: 8px;
            padding: 10px;
            padding-right: 45px;
            border-radius: 4px;
            border: 1px solid $secondary;
            color: $secondary;
            font-weight: bold;
            background: $primary;
            font-size: 12px;
            &:focus {
              border: 2px solid $secondary;
              outline: unset;
            }
   
        }
        &__styled-icon {
            width: 22px;
            height: 22px;
            position: absolute;
            right: 10px;
            display: flex;
            align-items: center;
            & > svg {
                :fill {
                    color: $secondary;
                }
            }
        }
    }

</style>