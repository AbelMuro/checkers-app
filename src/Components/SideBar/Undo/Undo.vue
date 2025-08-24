<script setup>
    import useBoardStore from '~/Store';

    const store = useBoardStore();
    const {undoMove} = store;

    const handleundo = () => {
        undoMove();
    }
</script>


<template>
    <button class="undo" @click="handleundo">
        Undo
    </button>
</template>

<style scoped>
    .undo{
        grid-column: 1/2;
        grid-row: 1;
        width: 100%;
        height: 60px;
        border: none;
        border-radius: 15px;
        background-color: grey;
        color: white;
        font-family: 'ubuntu';
        font-size: 1.5rem;
        font-weight: 400;
        cursor: pointer;
    }

    .undo:hover{
        background-color: rgb(83, 83, 83);
    }

    .undo:active{
        background-color: rgb(58, 58, 58);
    }
</style>
