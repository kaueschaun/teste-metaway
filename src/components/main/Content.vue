<script setup>
import Sidebar from './Sidebar.vue';
const props = defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <div class="content">
    <Sidebar />
    <div class="content__main">
        <h2 class="content__title">{{ title }}</h2>
        <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  height: 100vh;
  overflow: hidden; 

  &__main {
    flex: 1;
    padding: 50px 15px;
    background: $primary;
    overflow-y: auto;
    

    @media (min-width: $breakpoint-large) {
      padding: 60px 50px;
    }
  }

  &__title {
    color: $secondary;
  }
}
</style>
