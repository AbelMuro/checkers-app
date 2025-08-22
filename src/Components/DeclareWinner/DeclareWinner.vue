<script setup>
    import useBoardStore from '~/Store';
    import { watch, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import {motion} from 'motion-v';

    const winner = ref('');
    const store = useBoardStore();
    const {board} = storeToRefs(store);

    watch(board, () => {
        const blackPieces = board.value.filter((piece) => {
            return piece?.includes('black');
        });

        const redPieces = board.value.filter((piece) => {
            return piece?.includes('red');
        });

        if(!blackPieces.length)
            winner.value = 'Red'
        else if(!redPieces.length)
            winner.value = 'Black';
    })

</script>

<template>
    <motion.div 
        v-if="winner !== ''"
        :initial="{opacity: 0}"
        :animate="{opacity: 1, transition: {duration: 0.4}}"
        class="overlay">
        <motion.dialog 
            v-if="winner !== ''"
            :initial="{scale: 0}"
            :animate="{scale: 1}"
            open={{true}} 
            class="dialog">
                <h1 class="title">
                    {{winner}} wins!
                </h1>
                <button class="button"> 
                    End Game
                </button>
        </motion.dialog>
    </motion.div>
</template>

<style scoped>
    .overlay{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dialog{
        padding: 15px;
        border: none;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }

    .title{
        font-family: 'ubuntu';
        font-size: 2rem;
        font-weight: 800;
        color: black;
        margin: 0px;
    }

    .button{
        width: 100%;
        height: 70px;
        border: none;
        padding: 0px;
        background-color: black;
        border-radius: 15px;
        cursor: pointer;
        color: white;
        font-family: 'ubuntu';
        font-size: 1.2rem;
        font-weight: 300;
    }

    .button:hover{
        background-color: rgb(46, 46, 46);
    }

    .button:active{
        background-color: rgb(77, 77, 77)
    }
</style>