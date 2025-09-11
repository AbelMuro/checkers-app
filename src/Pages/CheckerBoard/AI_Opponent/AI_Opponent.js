import useBoardStore from "~/Store";
import {watch} from 'vue';
import {storeToRefs} from 'pinia';

/* 
    this is where i left off, i finally have the best move for the AI opponent,
    now what i need to do is translate the best move from square-to-square notation
    into a 2D array
*/

function AI_Opponent() {
    const store = useBoardStore();
    const {current_turn, board, player_color, history, piece_can_multi_take} = storeToRefs(store);
    const {AImovePiece} = store;

    const calculateMove = async () => {
        const AI_color = player_color.value === 'red' ? 'black' : 'red';
        try{
            const response = await fetch('https://world-class-checkers-server.netlify.app/ai_move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({board: board.value, color: AI_color})
            });
            if(response.status === 200){
                const result = await response.json();
                AImovePiece(result);
            }
            else if(response.status === 501){
                const result = await response.text();
                console.log(result);
            } 
        }
        catch(error){
            const message = error.message;
            console.log('Server is offline, please try again later', message);
        }
    }

    watch([current_turn, board, history, piece_can_multi_take], ([current_turn,_ , {time_traveling}, piece_can_multi_take]) => {
        if(current_turn === player_color.value) return;
        if(time_traveling) return;
        if(piece_can_multi_take) return;
        
        setTimeout(() => {
           calculateMove(); 
        }, 1000)
        
    }, {flush: 'post', immediate: true})
}

export default AI_Opponent;