import { createApp } from 'vue'
import {createPinia} from 'pinia';
import {createWebHistory, createRouter} from 'vue-router';
import CheckerBoard from './Pages/CheckerBoard';
import Menu from './Pages/Menu';
import GameRules from './Pages/GameRules';
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Menu},
        {path: '/checkerboard', component: CheckerBoard},
        {path: '/gamerules', component: GameRules}
    ],
})

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#root');  