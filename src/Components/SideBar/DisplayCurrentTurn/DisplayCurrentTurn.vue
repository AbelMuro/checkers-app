<script setup>
    import useBoardStore from '~/Store';
    import { storeToRefs } from 'pinia';

    const store = useBoardStore();
    const {current_turn} = storeToRefs(store);
</script>

<template>
    <h1 class="title">
        {{current_turn}} to move
    </h1>
</template>

<style scoped>
    .title{
        font-family: 'ubuntu';
        font-size: 2rem;
        font-weight: 800;
        text-transform: capitalize;
        color: white;
    }  
</style>