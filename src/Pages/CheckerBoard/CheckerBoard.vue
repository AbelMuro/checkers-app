<script setup>
    import Grid from './Grid';
    import Board from './Board';
    import DeclareWinner from './DeclareWinner';
    import SideBar from './SideBar';
    import AI_Opponent from './AI_Opponent';

    AI_Opponent();
</script>

<template>
    <Grid>
        <Board/>
        <SideBar/>
        <DeclareWinner/>
    </Grid>
</template>
