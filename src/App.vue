<script setup>
    import CheckerBoard from './Components/CheckerBoard/CheckerBoard.vue';

    /* 
        this is where i left off, i need to learn how to use Pinia as the state management
        for vue. and i also need to fix the issue regarding font files in this app.
    */

</script>

<template>
    <section class="container">
        <h1 class="title"> 
            World Class Checkers
        </h1>
        <CheckerBoard/>
    </section>
</template>

<style>
    @font-face {
        font-family: 'ubuntu';
        src: url('/fonts/Ubuntu-Regular.ttf') format('truetype');
    }

    .container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .title{
        color: white;
        font-size: 1.6rem;
        font-family: 'ubuntu';
        margin: 0px;
    }

    body{
        background-color: rgb(36, 36, 36);
    }

</style>