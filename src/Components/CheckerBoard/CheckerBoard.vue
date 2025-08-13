<script setup>
    import {ref} from 'vue';
    import CheckerPiece from './CheckerPiece/CheckerPiece.vue'

    const squares = ref([]);
    let alternate = true;
    let isRed;

    for(let i = 1; i <= 64; i++){
        if(alternate)
            isRed = i % 2 === 0;
        else
            isRed = i % 2 !== 0;

        if(isRed)
            squares.value.push('red')
        else
            squares.value.push('black')

        if(i % 8 === 0)
            alternate = !alternate;
    }

</script>

<template>
    <section class="board">
        <div 
            v-for="(square, i) in squares" 
            :key="`${square} ${i}`" 
            :class="square">
                <CheckerPiece/>
        </div>
    </section>
</template>


<style scoped>
    .board{
        width: 700px;
        height: 700px;
        border-radius: 10px;
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
    }

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