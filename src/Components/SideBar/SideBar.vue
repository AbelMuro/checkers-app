<script setup>
    import Resign from './Resign';
    import Undo from './Undo';
    import Redo from './Redo'
    import PieceMustCapture from './PieceMustCapture';
    import DisplayCurrentTurn from './DisplayCurrentTurn';
    import CapturedPieces from './CapturedPieces'
</script>

<template>
    <section class="container">
        <div className="header">
            <DisplayCurrentTurn/>
            <CapturedPieces/>
            <PieceMustCapture/>
        </div>

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
        justify-content: space-between;
        align-items: center;
        border-radius: 15px;
        background-color: rgb(12, 12, 12);
    }

    .header{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 15px;
    }  

    .buttons{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 15px;
    }
</style>