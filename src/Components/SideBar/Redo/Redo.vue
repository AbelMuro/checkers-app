<script setup>
    import useBoardStore from '~/Store';

    const store = useBoardStore();
    const {redoMove} = store;

    const handleRedo = () => {
        redoMove();
    }
</script>


<template>
    <button class="redo" @click="handleRedo">
        Redo
    </button>
</template>

<style scoped>
    .redo{
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

    .redo:hover{
        background-color: rgb(83, 83, 83);
    }

    .redo:active{
        background-color: rgb(58, 58, 58);
    }
</style>
