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
        margin: 0px;
    }  

    @media(max-width: 1070px){
        .title{
            font-size: 1.5rem;
            align-self: start;
        }
    }

    @media(max-width: 750px){
        .title{
            font-size: 1rem;
        }
    }
</style>