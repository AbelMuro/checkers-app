<script setup>
    import useBoardStore from '~/Store';
    import {computed, watch} from 'vue';
    import {storeToRefs} from 'pinia';
    import images from './images';
    import {motion, AnimatePresence, useAnimationControls} from 'motion-v';
    import {useDrag} from 'vue3-dnd';

    const {column, row} = defineProps({
        column: Number,
        row: Number,
    });    
    const store = useBoardStore();
    const {board, current_turn, player_color, piece_can_multi_take, pieces_must_take} = storeToRefs(store);
    const {setPiece, createLegalSquares, createLegalSquaresForQueen} = store;
    const controls = useAnimationControls();
    const pieceId = computed(() => board.value[row][column]);  

    const [collect, drag] = useDrag(() => ({
        type: 'piece',
        item: () => ({name: pieceId}),
        canDrag: () => {
            if(player_color.value !== current_turn.value) return false;
            if(player_color.value !== pieceColor.value) return false;
            if(piece_can_multi_take.value) return false;
            if(pieces_must_take.value.length){
                const piece = pieces_must_take.value.filter((piece) => piece.pieceId === pieceId.value)
                if(!piece.length) return false;
            } 
            return true;
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }))
    const isDragging = computed(() => collect.value.isDragging);

    const pieceColor = computed(() => {
        const temp = board.value[row][column];
        return temp.slice(0, temp.indexOf(' '));
    });

    const isQueen = computed(() => {
        const temp = board.value[row][column];
        return temp?.includes('queen');
    });

    const handlePiece = () => {
        if(player_color.value !== current_turn.value) return;
        if(player_color.value !== pieceColor.value) return
        if(piece_can_multi_take.value) return;
        if(pieces_must_take.value.length){
            const piece = pieces_must_take.value.filter((piece) => piece.pieceId === pieceId.value)
            if(!piece.length) return;
        } 
            
        setPiece({pieceId: pieceId.value, row, column});
        isQueen.value ? createLegalSquaresForQueen() : createLegalSquares();            
    }

    watch(isDragging, () => {
        if(!isDragging.value) return;

        handlePiece();
    }, {flush: 'post'})


    /* 
        this is where i left off, i need to find a way to identify a piece that is captured by using
        some sort of state that starts an animation when it's updated. This logic may need to be implemented
        in the global store.
    */


</script>


<template>
    <AnimatePresence>
        <div class='piece_container' :ref="drag">
            <motion.img 
                v-if="!isDragging && isQueen"
                v-show="pieceId !== ''"      
                class="piece"     
                :key="`${pieceId} queen`"           
                :layoutId="pieceId"
                :src="images[`queen${pieceColor}`]" 
                :initial="{scale: 1}"
                :animate="controls"
                @click="handlePiece" />   
            <motion.img
                v-else-if="!isDragging"  
                v-show="pieceId !== ''"    
                class="piece"     
                :key="`${pieceId}`"           
                :layoutId="pieceId"
                :src="images[pieceColor]" 
                :initial="{scale: 1}"
                :animate="controls"
                @click="handlePiece"/>         
        </div>
    </AnimatePresence>
</template>


<style scoped>
    .piece_container{
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        inset: 0;
        margin: auto;
        border-radius: 100px;
        transform: translate(0,0);
        transition: all 0s;
    }

    .piece{
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: none;
    }

    @media(max-width: 750px){
        .piece{
            width: 35px;
            height: 35px;
        }
    }

    @media(max-width: 480px){
        .piece{
            width: 30px;
            height: 30px;
        }
    }
</style>