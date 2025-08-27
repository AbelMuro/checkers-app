<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const handleOption = () => {
        router.push('/checkerboard')
    }

</script>

<template>
    <section class="menu_container">
        <ul class="menu_options">
            <li class="menu_option" @click="handleOption">
                Play Game
            </li> 
        </ul>
    </section>
</template>

<style scoped>
    .menu_container{
        width: 400px;
        height: 600px;
        background-color: rgb(12, 12, 12);
        position: fixed;
        inset: 0;
        margin: auto;
    }
</style>