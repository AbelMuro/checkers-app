<script setup>
    import DisplaySquares from './DisplaySquares';
    import { watch, computed } from 'vue';
    import useBoardStore from '~/Store';
    import { storeToRefs } from 'pinia';

    const store = useBoardStore()
    const {current_turn, history, player_color} = storeToRefs(store);
    const {checkForPossibleTakes} = store;

    const time_traveling = computed(() => {
        return history.value.time_traveling;
    });

    watch([current_turn, time_traveling], ([current_turn, time_traveling]) => {
        if(time_traveling) return;
        if(player_color.value !== current_turn) return;

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

    @media(max-width: 1070px){
        .board{
            justify-self: center;
        }
    }

    @media(max-width: 750px){
        .board{
            width: 450px;
            height: 450px;
        }
    }

    @media(max-width: 480px){
        .board{
            width: 330px;
            height: 330px;
        }
    }
</style>