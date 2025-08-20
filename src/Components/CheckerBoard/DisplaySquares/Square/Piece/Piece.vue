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
    const {board, current_turn, piece_can_multi_take} = storeToRefs(store);
    const {setPiece, createLegalSquares} = store;

    const pieceId = computed(() => {
        return board.value[row][column];
    });    

    const pieceColor = computed(() => {
        const temp = board.value[row][column];
        return temp.slice(0, temp.indexOf(' '));
    })

    const isQueen = computed(() => {
        const temp = board.value[row][column];
        return temp?.includes('queen');
    })

    const handlePiece = () => {
        if(pieceColor.value !== current_turn.value) return;
        if(piece_can_multi_take.value) return;
            
        setPiece({pieceId: pieceId.value, row, column});
        createLegalSquares(column, row);            
        
    }

</script>


<template>
    <img v-show="pieceId !== ''" class="piece" :src="isQueen ? images[`queen${pieceColor}`] : images[pieceColor]" @click="handlePiece"/>
</template>


<style scoped>
    .piece{
        width: 80px;
        height: 80px;
        cursor: pointer;
    }
</style>