<script setup>
</script>

<template>
    <section class="grid_container">
        <h1 class="grid_title"> 
            World Class Checkers
        </h1>
        <slot></slot>
    </section>
</template>

<style scoped>
    .grid_container{
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .grid_title{
        grid-row: 1;
        grid-column: 1/3;
        color: white;
        font-size: 2.6rem;
        font-family: 'ubuntu';
        margin: 0px;
        text-align: center;
    }

    @media(max-width: 1070px){
        .grid_container{
            grid-template-columns: 1fr;
            height: auto;
            margin-top: 40px;
        }

        .grid_title{
            grid-column: 1;
        }
    }

    @media(max-width: 750px){
        .grid_container{
            margin-top: 30px;
        }

        .grid_title{
            font-size: 2rem;
        }
    }

    @media(max-width: 480px){
        .grid_title{
            font-size: 1.4rem;
        }
    }

</style>