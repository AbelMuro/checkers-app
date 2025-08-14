import {defineStore} from 'pinia';
import {ref} from 'vue';

const useCounterStore = defineStore('counter', {
    state: () => ({count: 0}),
    actions: {
        increment(){
            this.count++;
        }
    }
})

export default useCounterStore;