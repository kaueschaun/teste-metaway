<script setup>

// Definir as props do componente
const props = defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '#A2A0A0' },
  size: { type: String, default: 'default' }
});
</script>

<template>
  <svg 
    :class="'styled-' + props.size"
    :fill="props.color"
  >
    <use :href="`src/assets/svg/icons.svg#${props.name}`" />
</svg>
</template>

<style lang="scss">

  .styled-small {
    width: 20px;
    height: 20px;
  }
  .styled-default {
    width: 25px;
    height: 25px;
  }
  .styled-medium {
    width: 40px;
    height: 40px;
  }
  .styled-large {
    width: 80px;
    height: 80px;
  }
</style>


