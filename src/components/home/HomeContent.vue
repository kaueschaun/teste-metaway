<script setup>
  import InputSearch from '../../components/_UI/InputSearch.vue'
  import ListContacts from './ListContacts.vue'


  const handleInputChange = (value) => {
    console.log('Valor do input:', value);
  };

</script>

<template>
  <div class="container-home">
    <div class="container-home__content-input">
      <InputSearch placeholder="Pesquise" colorIcon="#fff" 
        @update:value="handleInputChange" 
        :onChangeValue="handleInputChange"/>
    </div>
  </div>
  
  <ListContacts />
    

      

      
 
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
