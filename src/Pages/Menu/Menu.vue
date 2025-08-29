<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const handleOption = (route) => {
        router.push(route);
    }


</script>

<template>
    <section class="menu_container">
        <h1 class="menu_title">
            World Class Checkers
        </h1>
        <ul class="menu_options">
            <li class="menu_option" @click="() => handleOption('/checkerboard')">
                Play Game
            </li> 
            <li class="menu_option" @click="() => handleOption('/gamerules')">
                Game Rules
            </li>   
        </ul>
    </section>
</template>

<style scoped>
    .menu_container{
        width: 400px;
        height: 300px;
        padding: 40px;
        background-color: rgb(12, 12, 12);
        border-radius: 20px;
        position: fixed;
        inset: 0;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .menu_title{
        margin: 0px;
        font-family: 'ubuntu';
        font-size: 2.1rem;
        color: white;
        white-space: nowrap;
        text-align: center;
    }

    .menu_options{
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        list-style-type: none;
    }

    .menu_option{
        width: 100%;
        height: 60px;
        background-color: red;
        border-radius: 10px;
        font-size: 2rem;
        color: white;
        font-family: 'ubuntu';
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .menu_option:hover{
        background-color: #b80000;
    }

    .menu_option:active{
        background-color: #790000;
    }

    @media(max-width: 500px){
        .menu_container{
            width: 300px;
            height: 220px;
            padding: 25px;
            gap: 15px;
        }

        .menu_title{
            font-size: 1.5rem;
        }

        .menu_option{
            font-size: 1.4rem;
            height: 50px;
        }
    }
</style>