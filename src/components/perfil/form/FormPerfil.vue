<script setup>
    import * as Yup from 'yup';
    import { Form, Field, useField } from 'vee-validate';
    import masks from 'src/helpers/masks';
    import { useUserStore } from 'src/stores/user';
    import { onMounted, ref } from 'vue';
    import userApi from 'src/api/requests/users';
    import date from 'src/helpers/date';
    import { useToast } from 'vue-toast-notification';
    import debounce from 'src/helpers/debounce';
    import Loader from 'src/components/_UI/Loader.vue';

    const props = defineProps({
       closeModal: { type: Function},
    });

    const toast = useToast()
    const formatDate  = dateContent => date.format(dateContent)

    const userStore = useUserStore()
    const userId = userStore.id;
    const telefone = ref('');
    const username = ref('');
    const birthDate = ref('');
    const cpf = ref('');
    const name = ref('');
    const email = ref('');

    const isLoading = ref(false);

    const handleSetData = (data) => {
        username.value = data.username
        birthDate.value = formatDate(data.birthDate)
        email.value = data.email
        cpf.value = data.cpf
        telefone.value = data.telefone
        name.value = data.name
    }

    onMounted(() => {
        if(userStore) {
            handleSetData(userStore)
        }
       
    })

    const schema = Yup.object().shape({
        telefone: Yup.string().min(14, 'O telefone deve ter no mínimo 10 dígitos!').required('O campo telefone é obrigatório!'),
        username: Yup.string().required('O campo nome de usuário é obrigatório!'),
        email: Yup.string().email('O não é um formato de email valido!'),
        name: Yup.string().required('O campo nome é obrigatório!'),
        birthDate: Yup.string().min(10, 'O data de nascimento deve ter no mínimo 8 dígitos!').required('O campo data de nascimento é obrigatório!'),
        cpf: Yup.string().min(14, 'O campo cpf deve ter no mínimo 11 dígitos!').required('O campo cpf é obrigatório!'),
    });

    const updateUser = async(values) => {
        isLoading.value = true

        const payload = {
            cpf: values.cpf,
            dataNascimento: date.unformat(values.birthDate),
            email: values.email,
            nome: values.name,
            id: userId,
            telefone: values.telefone,
            username: values.username,
        }
        try {
            const {data} = await userApi.update(payload)
            userStore.setUser(
                {
                    id: data.object.id,
                    email: data.object.email,
                    name: data.object.nome,
                    birthDate: data.object.dataNascimento,
                    cpf: data.object.cpf,
                    telefone: data.object.telefone,
                    username: data.object.username,
                    role: userStore.role
                }
            );
            toast.success('Dados editados com sucesso!', {
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
    }, 500);  // Simulando o tempo da api 


   

</script>

<template>
    <div class="container-form-perfil">
        <Form @submit="updateUser" :validation-schema="schema" v-slot="{ errors, values }">
            <Field 
                class="container-form-perfil__input" 
                type="text" 
                name="username"
                placeholder="Nome de Usuário"
                v-model="username"
            />
            <span class="container-form-perfil__input-error">{{ errors.username }}</span>
            <Field 
                class="container-form-perfil__input" 
                type="text" 
                name="telefone"
                placeholder="Telefone"
                v-model="telefone"
                v-mask="masks.phone"
            />
            <span class="container-form-perfil__input-error">{{ errors.telefone }}</span>

            <Field 
                class="container-form-perfil__input" 
                type="text" 
                name="email"
                v-model="email"
                placeholder="E-mail"
            />
            <span class="container-form-perfil__input-error">{{ errors.email }}</span>


            <Field 
                class="container-form-perfil__input" 
                type="text" 
                name="name"
                v-model="name"
                placeholder="Nome"
            />

            <span class="container-form-perfil__input-error">{{ errors.name }}</span>

            <Field 
                class="container-form-perfil__input" 
                type="text" 
                name="birthDate"
                v-model="birthDate"
                v-mask="masks.date"
                placeholder="Data de Nascimento"
            />

            <span class="container-form-perfil__input-error">{{ errors.birthDate }}</span>

            <Field 
                class="container-form-perfil__input" 
                type="text" 
                name="cpf"
                v-model="cpf"
                placeholder="CPF"
                v-mask="masks.cpf"
            />
            <span class="container-form-perfil__input-error">{{ errors.cpf }}</span>

            <button 
                type="submit" 
                class="container-form-perfil__button-submit"
                v-if="!isLoading"
            >
               Editar
            </button>
            <Loader size="medium" color="secondary" v-else-if="isLoading"/>
        </Form>
    </div>
</template>

<style lang="scss" scoped>
    .container-form-perfil {
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

        &__input-error {
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