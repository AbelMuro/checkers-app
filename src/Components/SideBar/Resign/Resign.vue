<script setup>
    import useBoardStore from '~/Store';

    const store = useBoardStore();
    const {resignGame} = store;

    const handleResign = () => {
        resignGame();
    }

</script>

<template>
    <button class="resign" @click="handleResign">
        Resign
    </button>
</template>

<style scoped>
    .resign{
        grid-column: 1/3;
        grid-row: 2;
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

    .resign:hover{
        background-color: rgb(83, 83, 83);
    }

    .resign:active{
        background-color: rgb(58, 58, 58);
    }
</style>
