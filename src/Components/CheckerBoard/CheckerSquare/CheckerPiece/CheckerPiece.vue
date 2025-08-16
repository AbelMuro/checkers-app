<script setup>
    import useBoardStore from '~/Store';
    import {computed} from 'vue';
    import {storeToRefs} from 'pinia';
    import images from './images';

    const {column, row} = defineProps({
        column: Number,
        row: Number,
    });    
    const store = useBoardStore();
    const {board, current_turn} = storeToRefs(store);
    const {setPiece, createLegalSquares} = store;

    const pieceId = computed(() => {
        return board.value[row][column];
    });    

    const pieceColor = computed(() => {
        const temp = board.value[row][column];
        return temp.slice(0, temp.indexOf(' '));
    })

    const handlePiece = () => {
        if(pieceColor.value !== current_turn.value) return;

        setPiece({pieceId: pieceId.value, row, column});
        createLegalSquares(column, row);
    }

</script>


<template>
    <img v-show="pieceId !== ''" class="piece" :src="images[pieceId.slice(0, pieceId.indexOf(' '))]" @click="handlePiece"/>
</template>


<style scoped>
    .piece{
        width: 80px;
        height: 80px;
        cursor: pointer;
    }
</style>