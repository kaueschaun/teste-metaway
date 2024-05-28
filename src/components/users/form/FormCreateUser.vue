<script setup>
    import users from 'src/api/requests/users';
    import masks from 'src/helpers/masks';
    import { Form, Field, useField } from 'vee-validate';
    import { ref } from 'vue';
    import * as Yup from 'yup';
    import date from 'src/helpers/date';
    import { useToast } from 'vue-toast-notification';
    import debounce from 'src/helpers/debounce';
    import { useUsersStore } from 'src/stores/users';
    import Loader from 'src/components/_UI/Loader.vue';
    const props = defineProps({
       closeModal: { type: Function},
    });

    const usersSore  = useUsersStore()


    const toast = useToast()

    const telefone = ref('');
    const username = ref('');
    const birthDate = ref('');
    const cpf = ref('');
    const name = ref('');
    const email = ref('');
    const role = ref('');
    const password = ref('');
    
    const isLoading = ref(false);

    const schema = Yup.object().shape({
        telefone: Yup.string().min(14, 'O telefone deve ter no mínimo 10 dígitos!').required('O campo telefone é obrigatório!'),
        username: Yup.string().required('O campo nome de usuário é obrigatório!'),
        email: Yup.string().required('O campo email é obrigatório').email('O não é um formato de email valido!'),
        name: Yup.string().required('O campo nome é obrigatório!'),
        birthDate: Yup.string().min(10, 'O data de nascimento deve ter no mínimo 8 dígitos!').required('O campo data de nascimento é obrigatório!'),
        cpf: Yup.string().min(14, 'O campo cpf deve ter no mínimo 11 dígitos!').required('O campo cpf é obrigatório!'),
        role: Yup.string().required('O campo permissão é obrigatório!'),
        password: Yup.string()
            .min(8, 'O campo senha  deve ter no mínimo 8 caracteres!')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'O campo senha deve conter pelo menos uma letra e um número')
            .required('O campo senha é obrigatório!'),
    });


    
    const createUser = async(values) => {
        isLoading.value = true
        
        const payload = {
            tipos: [
                role.value
            ],
            usuario: {
                username: values.username,
                telefone: values.telefone,
                email: values.email,
                nome: values.name,
                dataNascimento: date.unformat(values.birthDate),
                cpf: values.cpf,
                id: null,
                password: values.password
            }
        }

        try {
            const {data} = await users.create(payload)
            console.log('response' , data);
            usersSore.addUser(data.object.usuario)
            toast.success('Usuário criado com sucesso!', {
                position: 'top'
            })
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            })
        } finally {
            debounced() // Simulando o tempo da api 
        }
    }

    const debounced = debounce(() => {
        isLoading.value = false
        props.closeModal()
    }, 700); // Simulando o tempo da api 

</script>

<template>
    <div class="container-form">
        <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors, values }">
            <Field 
                class="container-form__input" 
                type="text" 
                name="username"
                placeholder="Nome de Usuário"
                v-model="username"
            />
            <span class="container-form__message-error">{{ errors.username }}</span>
            <Field 
                class="container-form__input" 
                type="text" 
                name="telefone"
                placeholder="Telefone"
                v-model="telefone"
                v-mask="masks.phone"
            />
            <span class="container-form__message-error">{{ errors.telefone }}</span>

            <Field 
                class="container-form__input" 
                type="text" 
                name="email"
                v-model="email"
                placeholder="E-mail"
            />
            <span class="container-form__message-error">{{ errors.email }}</span>


            <Field 
                class="container-form__input" 
                type="text" 
                name="name"
                v-model="name"
                placeholder="Nome"
            />

            <span class="container-form__message-error">{{ errors.name }}</span>

            <Field 
                class="container-form__input" 
                type="text" 
                name="birthDate"
                v-model="birthDate"
                v-mask="masks.date"
                placeholder="Data de Nascimento"
            />

            <span class="container-form__message-error">{{ errors.birthDate }}</span>

            <Field 
                class="container-form__input" 
                type="text" 
                name="cpf"
                v-model="cpf"
                placeholder="CPF"
                v-mask="masks.cpf"
            />
            <span class="container-form__message-error">{{ errors.cpf }}</span>
            
            <Field 
                name="role" 
                v-model="role" 
                as="select"
                class="container-form__input" 
            >
                <option value="" disabled>Selecione uma permissão</option>
                <option value="ROLE_USER">Usuário</option>
                <option value="ROLE_ADMIN">Administrador</option>
            </Field>
        
            <span class="container-form__message-error">{{ errors.role }}</span>

            <Field 
                class="container-form__input" 
                type="password" 
                name="password"
                v-model="password"
                placeholder="Senha"
            />
            <span class="container-form__message-error">{{ errors.password }}</span>

            <button 
                type="submit" 
                class="container-form__button-submit"
                v-if="!isLoading"
            >
               Criar
            </button>

            <Loader size="medium" color="secondary" v-else-if="isLoading"/>

        </Form>
    </div>
</template>

<style lang="scss" scoped>
    .container-form {
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