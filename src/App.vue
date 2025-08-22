<script setup>
    import CheckerBoard from './Components/CheckerBoard';
    import DeclareWinner from './Components/DeclareWinner';
    import SideBar from './Components/SideBar';
</script>

<template>
    <section class="container">
        <h1 class="title"> 
            World Class Checkers
        </h1>
        <CheckerBoard/>
        <SideBar/>
        <DeclareWinner/>
    </section>
</template>

<style>
    @font-face {
        font-family: 'ubuntu';
        src: url('../public/fonts/Ubuntu-Regular.ttf');
    }

    .container{
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .title{
        grid-row: 1;
        color: white;
        font-size: 1.6rem;
        font-family: 'ubuntu';
        margin: 0px;
        text-align: center;
    }

    body{
        background-color: rgb(36, 36, 36);
    }

    *{
        box-sizing: border-box;
        transition: all 0.2s linear;
    }

</style>