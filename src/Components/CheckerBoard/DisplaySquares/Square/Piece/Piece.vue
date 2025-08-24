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
    const {board, current_turn, piece_can_multi_take, pieces_must_take} = storeToRefs(store);
    const {setPiece, createLegalSquares, createLegalSquaresForQueen} = store;

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
        if(pieces_must_take.value.length){
            const piece = pieces_must_take.value.filter((piece) => piece.pieceId === pieceId.value)
            if(!piece.length) return;
        } 
            
        setPiece({pieceId: pieceId.value, row, column});
        isQueen.value ? createLegalSquaresForQueen() : createLegalSquares();            
    }

</script>


<template>
    <img v-show="pieceId !== ''" class="piece" :src="isQueen ? images[`queen${pieceColor}`] : images[pieceColor]" @click="handlePiece"/>
</template>


<style scoped>
    .piece{
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
</style>