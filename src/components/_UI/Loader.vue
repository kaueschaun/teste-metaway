<template>
  <div class="container-loader">
    <div :class="'spinner spinner-' + props.color"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  margin: { type: String },
  color: { type: String, default: 'secondary' } 
});
</script>

<style lang="scss" scoped>

.container-loader {
  width: auto;
  height: auto;
  background-color: transparent;
}

.spinner {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  animation: spin .5s linear 0s infinite;
}

@mixin spinner-color($border-color) {
  border: 3px solid $border-color;
  border-top: 3px solid transparent;
  animation: spin .5s linear 0s infinite; 
}

.spinner-primary {
  @include spinner-color($primary);
}

.spinner-secondary {
  @include spinner-color($secondary);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
