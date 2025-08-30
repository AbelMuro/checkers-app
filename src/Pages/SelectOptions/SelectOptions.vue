<script setup>
    import {ref} from 'vue';
    import useBoardStore from '~/Store'
    import {useRouter} from 'vue-router';

    const difficulty = ref('');
    const color = ref('');
    const router = useRouter();
    const store = useBoardStore();
    const {setDifficulty, setPlayerColor} = store;

    const handleDifficulty = (diff) => {
        difficulty.value = diff;
    }

    const handleColor = (col) => {
        color.value = col;
    }

    const handleStart = () => {
        setDifficulty(difficulty.value);
        setPlayerColor(color.value);
        router.push('/checkerboard');
    }
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
            <li class="options_title_option" @click="() => handleDifficulty('easy')" :style="difficulty === 'easy' ? {backgroundColor: '#790000'} : {}">
                Easy
            </li>
            <li class="options_title_option" @click="() => handleDifficulty('medium')" :style="difficulty === 'medium' ? {backgroundColor: '#790000'} : {}">
                Medium
            </li>
            <li class="options_title_option" @click="() => handleDifficulty('hard')" :style="difficulty === 'hard' ? {backgroundColor: '#790000'} : {}">
                Hard
            </li>
        </ul>
        <ul class="options_list">
            <li class="options_list_title">
                Select Color
            </li>
            <li class="options_list_option" @click="() => handleColor('red')" :style="color === 'red' ? {backgroundColor: '#790000'} : {}">
                Red
            </li>
            <li class="options_list_option" @click="() => handleColor('black')" :style="color === 'black' ? {backgroundColor: '#790000'} : {}">
                Black
            </li>
        </ul>
        <button class="start" :disabled="!difficulty || !color" @click="handleStart">
            Start
        </button>
    </section>
</template>

<style scoped>
    .options_container{
        width: 400px;
        height: 700px;
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
        height: 50px;
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

    .start{
        width: 100%;
        height: 60px;
        background-color: white;
        border-radius: 10px;
        font-size: 2rem;
        color: red;
        font-family: 'ubuntu';
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        margin-top: 10px;
    }

    .start:hover{
        background-color: rgb(177, 177, 177);
    }

    .start:active{
        background-color: #808080;
    }

    .start:disabled{
        background-color: rgb(77, 77, 77);
        color: rgb(128, 128, 128);
        cursor:not-allowed;
    }
</style>