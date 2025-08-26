<script setup>
    import useBoardStore from '~/Store';
    import { storeToRefs } from 'pinia';

    const store = useBoardStore();
    const {captured_pieces} = storeToRefs(store);

    /* 
        this is where i left off, i need to find a way to make sure the selectors
        in css are actually scoped, if i use .container for the div, it will inherit the styles
        from the .container selector in the parent component,
    */

</script>

<template>
    <div class="box">
        <p class="pieces">
            Red pieces taken: {{captured_pieces.red}}
        </p>
        <p class="pieces">
            Black pieces taken: {{captured_pieces.black}}
        </p>
    </div>
</template>

<style scoped>
    .box{
        height: 300px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }


    .pieces{
        font-family: 'ubuntu';
        font-size: 1.2rem;
        font-weight: 300;
        text-transform: capitalize;
        color: white;
        margin: 0px;
    }
</style>