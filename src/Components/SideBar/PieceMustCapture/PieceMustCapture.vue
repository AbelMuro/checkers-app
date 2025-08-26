<script setup>
    import useBoardStore from '~/Store';
    import {storeToRefs} from 'pinia';

    const store = useBoardStore();
    const {current_turn, pieces_must_take} = storeToRefs(store);
</script>

<template>
    <p v-show="pieces_must_take.length !== 0" class="message">
        {{current_turn}} must capture
    </p>
</template>

<style scoped>
    .message{
        font-family: 'ubuntu';
        font-size: 1.2rem;
        font-weight: 300;
        text-transform: capitalize;
        color: white;
        margin: 0px;
    }
</style>