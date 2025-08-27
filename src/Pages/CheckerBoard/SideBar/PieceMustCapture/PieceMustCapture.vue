<script setup>
    import useBoardStore from '~/Store';
    import {storeToRefs} from 'pinia';

    const store = useBoardStore();
    const {current_turn, pieces_must_take} = storeToRefs(store);
</script>

<template>
    <p v-show="pieces_must_take.length !== 0" class="capture_message">
        {{current_turn}} must capture
    </p>
</template>

<style scoped>
    .capture_message{
        font-family: 'ubuntu';
        font-size: 1.2rem;
        font-weight: 300;
        text-decoration: underline;
        text-transform: capitalize;
        color: white;
        margin: 0px;
    }

    @media(max-width: 1070px){
        .capture_message{
            align-self: start;
        }
    }

    @media(max-width: 480px){
        .capture_message{
            font-size: 1rem;
            white-space: nowrap;
        }
    }
</style>