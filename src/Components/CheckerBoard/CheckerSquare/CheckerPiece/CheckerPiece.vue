<script setup>
    import useBoardStore from '~/Store';
    import images from './images';

    const {pieceId} = defineProps({
        pieceId: String
    });    
    const store = useBoardStore()
    const {setPiece} = store;



    const handlePiece = () => {
        setPiece(pieceId)
    }

    /* 
        this is where i left off, i need to finish implementing the rules logic
        in the global store for the checkers app

    */

</script>


<template>
    <img v-if="pieceId !== ''" class="piece" :src="images[pieceId.slice(0, pieceId.indexOf(' '))]" @click="handlePiece"/>
</template>


<style scoped>
    .piece{
        width: 80px;
        height: 80px;
        cursor: pointer;
    }
</style>