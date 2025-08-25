<script setup>
    import DisplaySquares from './DisplaySquares';
    import { watch, computed } from 'vue';
    import useBoardStore from '~/Store';
    import { storeToRefs } from 'pinia';

    const store = useBoardStore()
    const {board, history, piece_can_multi_take} = storeToRefs(store);
    const {checkForPossibleTakes} = store;

    const time_traveling = computed(() => {
        return history.value.time_traveling;
    })

    watch([board, piece_can_multi_take], ([_, piece_can_multi_take]) => {
        if(piece_can_multi_take) return;

        checkForPossibleTakes();
    }, {deep: true, flush: 'post'})

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