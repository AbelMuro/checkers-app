<script setup>
    import useCounterStore from '~/Store';
    import {watch} from 'vue';
    import { storeToRefs } from 'pinia';
    import images from './images';

    const store = useCounterStore();
    const {count} = storeToRefs(store);
    const {increment} = store;

    const handleClick = () => {
        increment();
    }

    watch(count, (newCount) => {
        console.log(newCount)
    })


</script>


<template>
    <img class="piece" :src="images['red']" @click="handleClick"/>
</template>


<style scoped>
    .piece{
        width: 100px;
        height: 100px;
    }
</style>