import {defineStore} from 'pinia';

const useBoardStore = defineStore('board', {
    state: () => ({
        board: [
            ['black 9', '', 'black 10', '', 'black 11', '', 'black 12', ''],
            ['', 'black 5', '', 'black 6', '', 'black 7', '', 'black 8'],
            ['black 1', '', 'black 2', '', 'black 3', '', 'black 4', '',],
            ['', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '',],
            ['red 1', '', 'red 2', '', 'red 3', '', 'red 4', '',],
            ['', 'red 5', '', 'red 6', '', 'red 7', '', 'red 8'],
            ['red 9', '', 'red 10', '', 'red 11', '', 'red 12', ''],
        ],
        player: 'red',
        piece_to_be_moved: ''
    }),
    actions: {
        setPiece(piece) {
            this.piece_to_be_moved = piece;
            console.log(piece)
        }
    }
})

export default useBoardStore;