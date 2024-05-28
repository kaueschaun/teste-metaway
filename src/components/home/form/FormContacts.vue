<script setup>
    import * as Yup from 'yup';
    import { Form, Field, useField } from 'vee-validate';
    import masks from 'src/helpers/masks.js';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import { useUserStore } from 'src/stores/user';
    import personApi from 'src/api/requests/person';
    import { usePersonStore } from 'src/stores/person';
    import contactsApi from 'src/api/requests/contacts';
    import { useToast } from 'vue-toast-notification';
    import Loader from 'src/components/_UI/Loader.vue';
    import { useContactStore } from 'src/stores/contacts';
    import debounce from 'src/helpers/debounce';


    const props = defineProps({
       closeModal: { type: Function},
       action: { type: String},
       data: { type: Object}
    });

    const isLoading = ref(false)
    const toast = useToast()


    const useStoreContact = useContactStore()
    const useStore = useUserStore()
    const useStorePerson = usePersonStore()
    const userId = useStore.$state.id;
    

    const schema = Yup.object().shape({
        telefone: Yup.string().required('O campo telefone é obrigatório!'),
        email: Yup.string().email('O não é um formato de email valido!')
        .required('O campo e-mail é obrigatório!'),  
        tipoContato: Yup.string().required('O campo tipo de contato é obrigatório!'),
        tag: Yup.string(),
    });

    const telefone = ref('');
    const email = ref('');
    const tipoContato = ref('');
    const tag = ref('')
    const idContact = ref(null)
    const idUserContact = ref(null)
    const idPersonContact = ref(null)
    const namePerson = ref(null)
    const { value: privado } = useField('privado', Yup.boolean().default(false));


    const handleSetEditData = (data) => {
        telefone.value = data.telefone || '';
        email.value = data.email || '';
        tipoContato.value = data.tipoContato || '';
        privado.value = data.privado ? true : false;
        tag.value = data.tag || '';
        idContact.value = data.id || '';
        idUserContact.value = data.usuario.id || '';
        idPersonContact.value = data.pessoa.id || '';
        namePerson.value = data.pessoa.nome || '';

    }

    onMounted(() => {
        if (props.data.value) {
            handleSetEditData(props.data.value)
        }
        getPerson()
    })



    const getPerson = async() => {
        try {
            const {data} = await personApi.get(userId)
            useStorePerson.setPerson(data.object)
        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            })
        }
    }

    const submitContact = async(values) => {
        isLoading.value = true
        const payload = {
            id: idContact.value ,
            pessoa: {
                nome: namePerson.value ? namePerson.value : useStorePerson.$state.person.nome ,
                cpf: useStorePerson.$state.person.cpf,
                endereco: {
                    ...useStorePerson.$state.person.endereco,
                },
                id: idPersonContact.value ? idPersonContact.value : useStorePerson.$state.person.id,
            },
            tag: values.tag,
            email: values.email,
            telefone: values.telefone,
            tipoContato: values.tipoContato.toUpperCase(),
            privado: privado.value,
            usuario: {
                id: idUserContact ? idUserContact.value : null
            }

        }

        if (!payload.id) delete payload.id;

        if (!payload.usuario.id) delete payload.usuario;

        if (!payload.pessoa.nome) delete payload.pessoa.nome;

        if (!payload.pessoa.id) delete payload.pessoa.id;

        if (props.data.value) delete payload.privado;


        console.log(payload);
        try {
            const {data} = await contactsApi.create(payload)
            console.log(data)
            toast.success(`Contato ${props.data.value ? 'editado' : 'criado'} com sucesso!`, {
                position: 'top'
            });
            useStoreContact.addContact(data.object);

        } catch (error) {
            toast.error('Ocorreu um erro inesperado!', {
                position: 'top'
            });  
        } finally {
            debounced()  // Simulando o tempo da api 
        }
    }

    const debounced = debounce(() => {
        isLoading.value = false;
        props.closeModal();
    }, 500); // Simulando o tempo da API com debounce


</script>


<template>
    <div class="container-form">
       <Form @submit="submitContact" :validation-schema="schema" v-slot="{ errors, values }">
            <Field 
                class="container-form__input" 
                type="text" 
                name="telefone"
                placeholder="Telefone"
                v-model="telefone"
                v-mask="masks.phone"
            />
            
            <span class="container-form__input-error">{{ errors.telefone }}</span>
            <Field 
                class="container-form__input" 
                type="text" 
                name="email"
                v-model="email"
                placeholder="E-mail"
            />
            <span class="container-form__input-error">{{ errors.email }}</span>
            <Field 
                class="container-form__input" 
                type="text" 
                name="tipoContato"
                v-model="tipoContato"
                placeholder="Tipo de Contato"
            />
            <span class="container-form__input-error">{{ errors.tipoContato }}</span>

            <Field
                class="container-form__input" 
                name="tag"
                type="text"
                v-model="tag"
                placeholder="Tag"
            />

            <div class="container-form__content-checkbox">
                <input 
                    type="checkbox" 
                    v-model="privado"  
                    value="privado" 
                    id="privado"
                    :disabled="props.data.value"
                />
                <label for="privado" >Privado</label>
            </div>

            <button 
                type="submit" 
                class="container-form__button-submit"
                v-if="!isLoading"
            >
               {{props.data.value ? 'Editar' : 'Criar'}}
            </button>
            <div v-else-if="isLoading">
                <Loader color="secondary" size="medium"/>
            </div>
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

        &__input-error {
            color: $danger;
            font-weight: bold;
            max-width: 240px;
            margin-top: 5px;
            text-align: center;
        }   
        &__content-checkbox{
            display: flex;
            flex-direction: row;
            margin-top: 15px;
            width: 100%;
            & > label {
                margin-left: 5px;
                color: $secondary;
                font-size: 14px;
                cursor: pointer;
            }
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