<script setup>
    import {computed} from 'vue';
    import {storeToRefs} from 'pinia';
    import useBoardStore from '~/Store';
    import {useDrop} from 'vue3-dnd';
    import Piece from './Piece'

    const {row, column} = defineProps({
        row: Number,
        column: Number
    });

    const store = useBoardStore();
    const {legal_moves, piece_to_be_moved} = storeToRefs(store);
    const {movePiece} = store;
    const isLegalSquare = computed(() => legal_moves.value[row][column]);


    const handleSquare = () => {
        if(!isLegalSquare.value) return;
        movePiece(column, row);
    }   

    const [collect, drop] = useDrop(() => ({
        accept: 'piece',
        drop: (item, monitor) => {
            if(!monitor.didDrop()) return;
            handleSquare();
        },
    }))

</script>

<template>
    <div
        class="square"
        @click="handleSquare"
        :ref="drop"
        >
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
        position: relative;
    }

    .whiteCircle{
        width: 45px;
        height: 45px;
        border-radius: 100%;
        border: 1px solid white;
    }

    @media(max-width: 750px){
        .whiteCircle{
            width: 35px;
            height: 35px;
        }
    }

    @media(max-width: 480px){
        .whiteCircle{
            width: 28px;
            height: 28px;
        }
    }
</style>