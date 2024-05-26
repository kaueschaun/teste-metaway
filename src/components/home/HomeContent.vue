<script setup>
  import InputSearch from '../../components/_UI/InputSearch.vue'
  import ListContacts from './ListContacts.vue'
  import contactsApi from 'src/api/requests/contacts';
  import { useContactStore } from '../../stores/contacts.js';
  import { ref } from 'vue';
  import { useToast } from 'vue-toast-notification';
  import debounce from 'src/helpers/debounce';
  const contactStore = useContactStore(); 
  const toast = useToast()

  const isLoading = ref(false)
  const isNotFound = ref(false)
 

  const searchContacts = async (term = '') => {
    isLoading.value = true;
    
    if (!term.trim()) {
      contactStore.setSearchResults(contactStore.initialContacts);
      debounced()  // Simulando o tempo da api 
      isNotFound.value = false;
      return;
    }
    try {
        const { data } = await contactsApi.search({ termo: term });
        if (data.length === 0) {
          contactStore.setSearchResults([]);
          isNotFound.value = true;
        } else {
           contactStore.setSearchResults(data);
        }
    } catch (error) {
        toast.error('Ocorreu um erro inesperado!', {
          position: 'top'
        });
    } finally {
        debounced()  // Simulando o tempo da api 
    }
  };

  const debounced = debounce(() => {
    isLoading.value = false;
  }, 500); 

  const handleInputChange = debounce((searchTerm) => {
    searchTerm ? searchContacts(searchTerm) : searchContacts()
  }, 700) 

</script>

<template>
  <div class="container-home">
    <div class="container-home__content-input">
      <InputSearch 
        placeholder="Pesquise" 
        colorIcon="#fff" 
        :onChangeValue="(e) => handleInputChange(e)"
      />
    </div>
  </div>
  
  <ListContacts :isLoader="isLoading"  :isNotFound="isNotFound"/>

</template>

<style scoped lang="scss">
  .container-home {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    &__content-input{
      bottom: 20px;
      position: relative;
      width: 300px;
      height: 20px;
      margin-bottom: 40px;
      @media (max-width: 450px) {
        margin-top: 20px;
        width: 100%;
        bottom: 0;
        position: relative;
      }
    }

  }

</style>
