<script setup>
    /* 
        this is where i left off, i need to finish implementing this component

        i need to create the click event handlers for the <li> tags below
    */
</script>

<template>
    <section class="options_container">
        <h1 class="options_title">
            Select Game Options
        </h1>
        <ul class="options_list">
            <li class="options_list_title">
                Select Difficulty
            </li>
            <li class="options_title_option">
                Easy
            </li>
            <li class="options_title_option">
                Medium
            </li>
            <li class="options_title_option">
                Hard
            </li>
        </ul>
        <ul class="options_list">
            <li class="options_list_title">
                Select Color
            </li>
            <li class="options_list_option">
                Red
            </li>
            <li class="options_list_option">
                Black
            </li>
        </ul>
    </section>
</template>

<style scoped>
    .options_container{
        width: 400px;
        height: 650px;
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

    .options_title{
        margin: 0px;
        font-family: 'ubuntu';
        font-size: 2.1rem;
        color: white;
        white-space: nowrap;
        text-align: center;
    }

    .options_list{
        display: flex;
        flex-direction: column;
        gap: 25px;
        list-style-type: none;
        margin: 0px;
        padding: 0px;
    }

    .options_list_title, .options_list_title{
        font-family: 'ubuntu';
        font-size: 1.5rem;
        color: white;
        white-space: nowrap;
        text-align: center;
    }

    .options_title_option, .options_list_option{
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

    .options_title_option:hover, .options_list_option:hover{
        background-color: #b80000;
    }

    .options_title_option:active, .options_list_option:active{
        background-color: #790000;
    }
</style>