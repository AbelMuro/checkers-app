<script setup>
    import useBoardStore from '~/Store';
    import {computed, watch} from 'vue';
    import {storeToRefs} from 'pinia';
    import images from './images';
    import {motion} from 'motion-v';
    import {useDrag} from 'vue3-dnd';

    const {column, row} = defineProps({
        column: Number,
        row: Number,
    });    
    const store = useBoardStore();
    const {board, current_turn, player_color, piece_can_multi_take, pieces_must_take} = storeToRefs(store);
    const {setPiece, createLegalSquares, createLegalSquaresForQueen} = store;
    const pieceId = computed(() => board.value[row][column]);  

    const [collect, drag] = useDrag(() => ({
        type: 'piece',
        item: () => ({name: pieceId}),
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
        this is where i left off, i need to finish implementing the
        drag and drop feature in this component
    */

</script>


<template>
    <div class='piece_container' :ref="drag">
        <motion.img  
            v-if="!isDragging"      
            v-show="pieceId !== ''"  
            class="piece"                 
            :layoutId="pieceId"
            :src="isQueen ? images[`queen${pieceColor}`] : images[pieceColor]" 
            @click="handlePiece" />
    </div>
</template>


<style scoped>
    .piece_container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        inset: 0;
        margin: auto;
    }

    .piece{
        width: 50px;
        height: 50px;
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