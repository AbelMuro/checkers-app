<script setup>
    import {computed} from 'vue';
    import {storeToRefs} from 'pinia';
    import useBoardStore from '~/Store';
    import Piece from './Piece/Piece.vue'

    const {row, column} = defineProps({
        row: Number,
        column: Number
    });

    const store = useBoardStore();
    const {legal_moves, piece_can_multi_take} = storeToRefs(store);
    const {movePiece} = store;

    const isLegalSquare = computed(() => {
        return legal_moves.value[row][column];
    })

    const handleSquare = () => {
        if(!legal_moves.value[row][column]) return;

        movePiece(column, row);
    }
</script>

<template>
    <div 
        class="square"
        @click="handleSquare">
            <Piece :row="row" :column="column"/>
            <div class="whiteCircle" v-show="isLegalSquare"></div>
    </div>
</template>

<style scoped>
    .square{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .whiteCircle{
        width: 45px;
        height: 45px;
        border-radius: 100%;
        border: 1px solid white;
    }
</style>