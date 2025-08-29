<script setup>
    import icons from './icons';
    import {useRouter} from 'vue-router';

    const router = useRouter();

    const handleGoBack = () => {
        router.push('/');
    }
</script>

<template>
    <section class="rules">
        <a class="back" @click="handleGoBack">
            <img class="arrow" :src="icons['leftArrow']"/>
            Go back
        </a>
        <h1 class="rules_title">
            Rules of Checkers
        </h1>
        <p class="rules_description">
            Each piece can only move one square diagonally.
            A piece can capture other pieces by jumping over 
            the piece, but it must land on an empty square.
            A piece can capture multiple pieces. However, if a
            piece can capture another piece, it must 
            capture the piece.
        </p>
    </section>
</template>


<style scoped>
    .rules{
        width: 470px;
        height: 460px;
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

    .rules_title{
        font-family: 'ubuntu';
        font-size: 3rem;
        color: white;
        margin: 0px;
        white-space: nowrap;
    }

    .rules_description{
        font-size: 1.2rem;
        line-height: 30px;
        font-family: 'ubuntu';
        color: white;
        margin: 0px;
    }

    .back{
        font-size: 1.2rem;
        font-family: 'ubuntu';
        color: white;
        cursor: pointer;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
    }

    .back > img{
        width: 40px;
        object-fit: contain;
    }

    .back:hover{
        text-decoration: underline;
    }

    @media(max-width: 500px){
        .rules{
            width: 300px;
            height: 340px;
            padding: 25px;
            gap: 15px;
        }

        .rules_title{
            font-size: 1.8rem;
        }

        .rules_description{
            font-size: 1rem;
            line-height: 25px;
        }

        .back{
            font-size: 1rem;
        }

        .back > img{
            width: 30px;
        }
    }

</style>
