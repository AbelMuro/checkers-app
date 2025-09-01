import useBoardStore from "~/Store";
import {watch} from 'vue';
import {storeToRefs} from 'pinia';

/* 
    this is where i left off, i should finish implementing the logic
    for the following hook and also finish the logic for the /ai_move 
    endpoint.
*/

function AI_Opponent() {
    const store = useBoardStore();
    const {current_turn, board, player_color} = storeToRefs(store);

    const calculateMove = async () => {
        try{
            const response = await fetch('http://localhost:4000/ai_move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({board: board.value})
            });
            if(response.status === 200){
                const result = await response.text();
                console.log('200', result);
            }
            else if(response.status === 501){
                const result = await response.text();
                console.log('501', result);
            } 
        }
        catch(error){
            const message = error.message;
            console.log('Server is offline, please try again later', message);
        }
    }

    watch([current_turn, board], ([current_turn, board]) => {
        if(current_turn.value === player_color.value) return;
        calculateMove();
    })
}

export default AI_Opponent;