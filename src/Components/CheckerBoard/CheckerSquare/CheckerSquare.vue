<script setup>
    import {ref, watch} from 'vue';
    import {storeToRefs} from 'pinia';
    import CheckerPiece from './CheckerPiece/CheckerPiece.vue';
    import useBoardStore from '~/Store';

    const store = useBoardStore();
    const {board} = storeToRefs(store);

    const squares = ref([]);
    const pieces = ref([]);
    let alternate = true;
    let isRed;


    for(let column = 1; column <= 8; column++){
        for(let row = 1; row <= 8; row++){
            if(alternate)
                isRed = row % 2 === 0;
            else
                isRed = row % 2 !== 0;    

            if(isRed)
                squares.value.push('red')
            else
                squares.value.push('black');
        }
        alternate = !alternate;
    }

    watch(board, () => {
        pieces.value.push(...board.value.flat())
    }, {flush: 'post', immediate: true})
</script>


<template>
    <div 
        v-for="(square, i) in squares" 
        :key="`${square} ${i}`" 
        :class="square">
            <CheckerPiece :pieceId="pieces[i]"/>
    </div>
</template>


<style scoped>
    .red, .black{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .red{
        background-color: red;
    }

    .black{
        background-color: black;
    }

</style>