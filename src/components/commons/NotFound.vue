<script setup>
import Icon from '../_UI/Icon.vue';
  const props = defineProps({
    title: { type: String},
    size: { type: String},
  });
</script>

<template>
    <div class="container-not-found">
        <div class="container-not-found__content">
            <Icon name="search-not-found" :size="props.size" />
        </div>
        <h2 class="container-not-found__title">{{ props.title }}</h2>
    </div>
</template>

<style lang="scss" scope>
    .container-not-found {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        &__content{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title {
            color: $primaryDark;
            text-align: center;
            size: 14px;
        }
    }
</style>