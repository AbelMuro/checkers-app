<script setup>
    import useBoardStore from '~/Store';
    import { storeToRefs } from 'pinia';
    import Resign from './Resign';
    import Undo from './Undo';
    import Redo from './Redo'

    const store = useBoardStore();
    const {current_turn} = storeToRefs(store);

    /* 
        this is where i left off, i need to finish implementing 
        the logic for this component (redo, undo moves, resign, etc...)
    */

</script>

<template>
    <section class="container">
        <h1 class="title">
            {{current_turn}} to move
        </h1>

        <div class="buttons">
            <Undo/>
            <Redo/>
            <Resign/>
        </div>
    </section>
</template>

<style scoped>
    .container{
        grid-row: 2/3;
        grid-column: 2;
        width: 300px;
        height: 700px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        border-radius: 15px;
        background-color: rgb(12, 12, 12);
    }

    .title{
        font-family: 'ubuntu';
        font-size: 2rem;
        font-weight: 800;
        text-transform: capitalize;
    }

    .buttons{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 15px;
    }
</style>