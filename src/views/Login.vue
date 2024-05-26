<script setup>
  import { onMounted, ref } from 'vue';
  import Icon from '../components/_UI/Icon.vue'
  import loginApi from '../api/requests/login.js';
  import { useRouter } from 'vue-router';
  import Loader from '../components/_UI/Loader.vue'
  const router = useRouter();
  import {useToast} from 'vue-toast-notification';
  import * as Yup from 'yup';
  import { Form, Field } from 'vee-validate';
  import auth from 'src/middlewares/auth';
  import paths from 'src/router/paths';
  import { useUserStore } from '../stores/user.js';
  import debounce from 'src/helpers/debounce';


  onMounted(() => {
    if(auth) {
      router.push(paths.home)
    }
  })
  
  
  const toast = useToast()
  const rememberMe = ref(false);
  const isLoader = ref(false)
  const store = useUserStore();

  

  const schema = Yup.object().shape({
    username: Yup.string()
      .required('O campo usuário é obrigatório!'),
    password: Yup.string()
      .min(8, 'O campo senha deve conter no mínimo 8 dígitos!')
      .required('O campo senha é obrigatório!'),
  });


  const handleLogin = async (values) => {
    isLoader.value = true
    const payload = {
      ...values
    }
    try {
      const {data} = await loginApi.signIn(payload)
      store.setUser({ id: data.id, role: data.tipos[0] });
      if (rememberMe.value) {
        localStorage.setItem('token', data.accessToken);
      } else {
        sessionStorage.setItem('token', data.accessToken);
      }

      debounced()
      
    } catch (error) {
      isLoader.value = false
      if(error.response.status === 401) {
        toast.error('Usuário ou Senha incorretos', {
          position: 'top'
        })
        return
      } else {
        toast.error('Ocorreu um erro inesperado', {
          position: 'top'
        })
        return
      }
    }     
  };


  const debounced = debounce(() => {
    router.push('/home')
  }, 500); // Simulando o tempo da API com debounce

</script>

<template>
  <div class="container">
    <div class="header">
      <div class="content-icon">
        <Icon  name="menu-book" color="#fff" size="large"/>
      </div>
      <h2 class="title">Agenda Pessoal</h2>
    </div>

    <div class="content-inputs">
      <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ errors }" >
        <div class="form">
          <div class="input-icon">
            <Field 
              class="user-input" 
              type="text" 
              name="username"

              placeholder="Usuário"
            /> <br>
           
            <Icon name="user" class="icon-user"  color="#fff"/>
          </div>
          <div class="content-error">
            <span class="input-error">{{ errors.username }}</span>
          </div>
          
          <div class="input-icon">
            <Field 
              class="password-input" 
              type="password" 
              name="password"
              placeholder="Senha"
            />
            
            <Icon name="lock" class="icon-lock" color="#fff" />
          </div>
          <div class="content-error">
            <span class="input-error">{{ errors.password }}</span>
          </div>

          <div class="checkbox-container">
            <input  type="checkbox" id="rememberMe" v-model="rememberMe">
            <label for="rememberMe">Lembrar-me</label>
          </div>

          <div class="content-btn" v-if="!isLoader">
            <button class="button-submit" >Entrar</button>
          </div>

          <div class="content-loader" v-else-if="isLoader">
            <Loader />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>


<style lang="scss">
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $primary;
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        color: $secondary;
        text-transform: uppercase;
        margin-left: 10px;
      }
      .content-icon {
        flex-direction: column;
        display: flex;
        height: 55px;
        width: 55px;
        margin-right: 15px;
      }
    }
    .content-inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      width: 100%;
      .form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .input-icon {
          position: relative;
          display: flex;
          align-items: center;  
          margin-top: 20px;
          
          .user-input, .password-input {
            position: relative;
            text-indent: 20px;
            border: none;
            padding: 10px;
            width: 280px;
            color: $secondary;
            background: transparent;
            border-bottom: 1px solid $secondary;
            &:focus {
              border-bottom: 2px solid $secondary;
              outline: unset;
            }
          }
          .icon-user,
          .icon-lock {
            color: $secondary;
            width: 20px;
            height: 20px;
            position: absolute;
            top: 1;
            left: 0;        
          }
           
        }
        .content-error {
          width: 100%;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          .input-error {
            color: $danger;
            font-weight: bold;
            max-width: 240px;
            text-align: center;
          }
        }
      }
      .checkbox-container {
        display: flex;
        align-items: center;
        margin-top: 10px;
        input[type='checkbox'] {
          margin-right: 5px;
          border-radius: 4px;
          border: none;
        }
        label {
          color: $secondary;
          font-size: 14px;
        }
      }
      .content-btn {
        width: 100%;
        display: flex;
        margin-top: 25px;
        justify-content: center;
        flex-direction: row;
        .button-submit {
          width: 100%;
          padding: 10px;
          background: $secondary;
          color: $primaryDark;
          border-radius: 4px;
          font-weight: bold;
          font-size: 16px;
          opacity: 0.8;
          &:hover {
            opacity: 0.9;
          }
        }
      }
      .content-loader {
        margin-top: 25px;
        display: flex;
        align-items: center;
        flex-direction: row;
        height: 40px;
        justify-content: center;
        width: 100%;
      }
    }
  }

</style>