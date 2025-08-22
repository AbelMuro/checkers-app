<script setup>
    import {ref, onBeforeMount} from 'vue';
    import Square from './Square';

    const squares = ref([]);

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
        :class="square[0]">
            <Square :column="square[1]" :row="square[2]"/>
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