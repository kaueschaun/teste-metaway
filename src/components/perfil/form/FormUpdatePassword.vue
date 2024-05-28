<script setup>
    import * as Yup from 'yup';
    import { Form, Field } from 'vee-validate';
    import { useUserStore } from 'src/stores/user';
    import {ref} from 'vue'
    import userApi from 'src/api/requests/users';
    import { useToast } from 'vue-toast-notification';
    import Loader from 'src/components/_UI/Loader.vue';
    import debounce from 'src/helpers/debounce';


    const props = defineProps({
       closeModal: { type: Function},
    });

    const toast = useToast()

    const storeUser = useUserStore()
    const username = storeUser.username

    const messageError = ref(false)
    const isLoading = ref(false)

    const password = ref('')
    const newPassword = ref('')



    const schema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'O campo senha atual deve ter no mínimo 8 caracteres!')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'O campo senha atual deve conter pelo menos uma letra e um número')
            .required('O campo senha atual é obrigatório!'),
        newPassword: Yup.string()
        .required('O campo nova senha é obrigatório!')
            .min(8, 'O campo nova senha deve ter no mínimo 8 caracteres!')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'O campo nova senha deve conter pelo menos uma letra e um número')
    });


    const updatePassword = async(values) => {
        isLoading.value = true
        messageError.value = false
        const payload = {
            newPassword: values.newPassword,
            password: values.password,
            username: username
        }

        try {
            await userApi.updatePassword(payload)
            messageError.value = false
            toast.success('Senha alterada com sucesso', {
                position: 'top'
            })
        } catch (error) {
            console.log(error);
            if(error.response.status === 400) {
                messageError.value = error.response.data.message
                isLoading.value = false
                return
            } else {
                toast.error('Ocorreu um erro inesperdo', {
                    position: 'top'
                })
            }
        } finally {
            if(!messageError.value) {
                debounced() // Simulando o tempo da api 
            }
        }
    }   

    const debounced = debounce(() => {
        props.closeModal()
    }, 500);  // Simulando o tempo da api 

</script>



<template>
    <div class="container-form-password">
        <Form @submit="updatePassword" :validation-schema="schema" v-slot="{ errors, values }">
            <Field 
                class="container-form-password__input" 
                type="text" 
                name="password"
                placeholder="Senha Atual"
                v-model="password"
            />
            <span class="container-form-password__message-error">{{ errors.password }}</span>
            <Field 
                class="container-form-password__input" 
                type="text" 
                name="newPassword"
                placeholder="Nova senha"
                v-model="newPassword"
            />
            <span class="container-form-password__message-error">{{ errors.newPassword }}</span>
            <span class="container-form-password__message-error" v-if="messageError">{{ messageError }}</span>

            <button 
                type="submit" 
                class="container-form-password__button-submit"
                v-if="!isLoading"
            >
               Editar
            </button>

            <Loader color="secondary" size="medium"  v-else-if="isLoading"/>
           
        </Form>
    </div>
</template>

<style lang="scss" scope>
    .container-form-password {
        display: flex;
        flex-direction: column;
        padding: 15px;
        align-items: center;
        & > form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &__input {
            border: none;
            padding: 10px;
            width: 280px;
            margin-top: 15px;
            background: transparent;
            color: $secondary;
            border-bottom: 1px solid $secondary;
            &:focus {
              border-bottom: 2px solid $secondary;
              outline: unset;
            }
        }
        &__message-error {
            color: $danger;
            font-weight: bold;
            max-width: 240px;
            margin-top: 5px;
            text-align: center;
        } 

        &__button-submit {
            width: 100%;
            padding: 8px;
            margin-top: 15px;
            border-radius: 4px;
            background: $secondary;
            color: $primaryDark;
            &:hover {
                opacity: 0.9;
            }
        }

    }
</style>