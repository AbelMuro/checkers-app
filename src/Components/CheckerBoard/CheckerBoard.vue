<script setup>
    import DisplaySquares from './DisplaySquares/DisplaySquares.vue';
</script>

<template>
    <section class="board">
        <DisplaySquares/>
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
        grid-template-rows: repeat(8, 1fr);
    }
</style>