<script setup>
    import useBoardStore from '~/Store';
    import {computed, watch} from 'vue';
    import {storeToRefs} from 'pinia';
    import images from './images';
    import {motion, useAnimate} from 'motion-v';
    import {useDrag} from 'vue3-dnd';

    const {column, row} = defineProps({
        column: Number,
        row: Number,
    });    
    const store = useBoardStore();
    const {board, current_turn, player_color, piece_can_multi_take, pieces_must_take} = storeToRefs(store);
    const {setPiece, createLegalSquares, createLegalSquaresForQueen, capturePiece} = store;
    const [scope, animate] = useAnimate();
    const pieceId = computed(() => board.value[row][column]);  
    const captured = computed(() => board.value[row][column].includes('captured'));

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


    watch(captured, (captured) => {
        if(!captured) return;

        const result = animate(scope.value, {opacity: 0}, {duration: 0.2});      
        result.then(() => {
            capturePiece(row, column)                                                 
        })
        .catch(() => {;
            console.log('animation error')
        })        
        
    }, {flush: 'post'});


    /* 
        this is where i left off, i want to update my notes on framer-motion,
        i may need to create two separate sections, one for vue and one for react
    */

</script>


<template>
        <div class='piece_container' :ref="drag">
            <motion.img 
                ref="scope"
                v-if="!isDragging && isQueen && pieceId !== ''"    
                class="piece"     
                :key="`${pieceId} queen`"        
                :layoutId="pieceId"
                :src="images[`queen${pieceColor}`]" 
                @click="handlePiece" />   
            <motion.img
                ref="scope"
                v-else-if="!isDragging && pieceId !== ''"   
                class="piece"     
                :key="`${pieceId}`"     
                :layoutId="pieceId"
                :src="images[pieceColor]" 
                @click="handlePiece"/>  
        </div>
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
        display: inline-block;
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