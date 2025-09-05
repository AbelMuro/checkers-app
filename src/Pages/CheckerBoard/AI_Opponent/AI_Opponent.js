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
    const {current_turn, history, player_color} = storeToRefs(store);

    const calculateMove = async () => {
        try{
            const response = await fetch('http://localhost:4000/ai_move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({moves: history.value.past})
            });
            if(response.status === 200){
                const result = await response.text();
                console.log(result);
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

    watch([current_turn], ([current_turn]) => {
        if(current_turn.value === player_color.value) return;
        calculateMove();
    })
}

export default AI_Opponent;