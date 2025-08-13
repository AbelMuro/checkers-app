<script setup>
    import images from './images';

</script>


<template>
    <img class="piece" :src="images['red']"/>
</template>


<style scoped>
    .piece{
        width: 100px;
        height: 100px;
    }
</style>