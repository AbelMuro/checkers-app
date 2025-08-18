<script setup>
    import {ref, onBeforeMount} from 'vue';
    import {storeToRefs} from 'pinia';
    import CheckerPiece from './CheckerPiece/CheckerPiece.vue';
    import useBoardStore from '~/Store';

    const store = useBoardStore();
    const {legal_moves} = storeToRefs(store);
    const {movePiece, changeTurn} = store;
    const squares = ref([]);

    const handleSquare = (column, row) => {
        if(!legal_moves.value[row][column]) return;

        movePiece(column, row);
    }

    onBeforeMount(() => {
        let alternate = true;
        let isRed;

        for(let row = 1; row <= 8; row++){
            for(let column = 1; column <= 8; column++){
                if(alternate)
                    isRed = column % 2 === 0;
                else
                    isRed = column % 2 !== 0;    

                if(isRed)
                    squares.value.push(['red', column - 1, row - 1])
                else
                    squares.value.push(['black', column - 1, row - 1]);
            }
            alternate = !alternate;
        }   
    })


</script>


<template>
    <div 
        v-for="(square, i) in squares" 
        :key="`${square[0]} ${i}`" 
        :class="square[0]"
        @click="() => handleSquare(square[1], square[2])">
            <CheckerPiece :column="square[1]" :row="square[2]"/>
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