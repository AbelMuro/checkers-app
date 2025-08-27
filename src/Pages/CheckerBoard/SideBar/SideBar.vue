<script setup>
    import Resign from './Resign';
    import Undo from './Undo';
    import Redo from './Redo'
    import PieceMustCapture from './PieceMustCapture';
    import DisplayCurrentTurn from './DisplayCurrentTurn';
    import CapturedPieces from './CapturedPieces'
</script>

<template>
    <section class="sidebar">
        <div className="sidebar_header">
            <DisplayCurrentTurn/>
            <CapturedPieces/>
            <PieceMustCapture/>
        </div>
        <div class="sidebar_buttons">
            <Undo/>
            <Redo/>
            <Resign/>
        </div>
    </section>
</template>

<style scoped>
    .sidebar{
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

    .sidebar_header{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 15px;
    }  

    .sidebar_buttons{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 15px;
    }

    @media(max-width: 1070px){
        .sidebar{
            flex-direction: row;
            justify-self: center;            
            align-self: center;
            grid-column: 1;
            grid-row: 3/4;
            width: 700px;
            height: auto;
        }

        .sidebar_buttons{
            width: 200px;
        }
    }

    @media(max-width: 750px){
        .sidebar{
            width: 450px;
        }
    }

    @media(max-width: 480px){
        .sidebar{
            width: 330px;
        }

        .sidebar_buttons{
            width: 130px;
            column-gap: 5px;
            row-gap: 10px;
        }
    }
</style>