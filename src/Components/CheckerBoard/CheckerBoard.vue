<script setup>
    import DisplaySquares from './DisplaySquares';
    import { watch } from 'vue';
    import useBoardStore from '~/Store';
    import { storeToRefs } from 'pinia';

    const store = useBoardStore()
    const {current_turn} = storeToRefs(store);
    const {checkForPossibleTakes} = store;

    watch(current_turn, () => {
        checkForPossibleTakes();
    })

</script>

<template>
    <section class="board">
        <DisplaySquares/>
    </section>
</template>


<style scoped>
    .board{
        grid-row: 2;
        grid-column: 1;
        width: 700px;
        height: 700px;
        border-radius: 10px;
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    }
</style>