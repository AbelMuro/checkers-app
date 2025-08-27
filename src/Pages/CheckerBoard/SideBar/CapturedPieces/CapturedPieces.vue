<script setup>
    import useBoardStore from '~/Store';
    import {useMediaQuery} from '~/Hooks'
    import {computed} from 'vue';
    import { storeToRefs } from 'pinia';

    const [tablet] = useMediaQuery('(max-width: 750px)');
    const [mobile] = useMediaQuery('(max-width: 480px)');
    const store = useBoardStore();
    const {captured_pieces} = storeToRefs(store);

    const redPiecesTaken = computed(() => {
        if(mobile.value)
            return 'Red taken: ';
        else if(tablet.value)
            return 'Red pieces taken: '
        else
            return 'Red pieces captured: '
    });

    const blackPiecesTaken = computed(() => {
        if(mobile.value)
            return 'Black taken: ';
        else if(tablet.value)
            return 'Black pieces taken: ';
        else
            return 'Black pieces captured: ';
    })

</script>

<template>
    <div class="capturedPieces">
        <p class="capturedPieces_red">
            {{redPiecesTaken}}
            {{captured_pieces.red}}
        </p>
        <p class="capturedPieces_black">
            {{blackPiecesTaken}}
            {{captured_pieces.black}}
        </p>
    </div>
</template>

<style scoped>
    .capturedPieces{
        height: 80px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .capturedPieces_red, .capturedPieces_black{
        font-family: 'ubuntu';
        font-size: 1.2rem;
        font-weight: 300;
        text-transform: capitalize;
        color: white;
        margin: 0px;
    }

    @media(max-width: 1070px){
        .capturedPieces{
            height: 45px;
        }

        .capturedPieces_red, .capturedPieces_black{
            font-size: 1rem;
        }
    }


    @media(max-width: 480px){
        .capturedPieces{
            align-self: start;
        }
    }
</style>