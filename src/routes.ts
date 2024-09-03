import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/home.vue';
import Gastos from './views/gastos/listagem-gastos.vue';
import notFound from './views/notFound/not-found.vue';

const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: notFound },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/gastos',
        name: 'Gastos',
        component: Gastos
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;