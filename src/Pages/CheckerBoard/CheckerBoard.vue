<script setup>
    import Grid from './Grid';
    import Board from './Board';
    import DeclareWinner from './DeclareWinner';
    import SideBar from './SideBar';
</script>

<template>
    <Grid>
        <Board/>
        <SideBar/>
        <DeclareWinner/>
    </Grid>
</template>
