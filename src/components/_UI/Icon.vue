<script setup>
import { defineProps } from 'vue';

// Definir as props do componente
const props = defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '#A2A0A0' }
});
</script>

<template>
  <svg class="svg"
    :fill="props.color"
  >
    <use :href="`src/assets/svg/icons.svg#${props.name}`" />
</svg>
</template>





