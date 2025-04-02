import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import GastoCadastro from '../views/gastos/cadastro-gastos.vue';
import GastosListagem from '../views/gastos/listagem-gastos.vue';
import GanhosCadastro from '../views/ganhos/cadastro-ganhos.vue';
import GanhosListagem from '../views/ganhos/listagem-ganhos.vue';
import notFound from '../views/notFound/not-found.vue';

const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: notFound },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/gastos',
        name: 'GastosListagem',
        component: GastosListagem
    },
    {
        path: '/gastos-cadastro',
        name: 'GastoCadastro',
        component: GastoCadastro
    },
    {
        path: '/ganhos',
        name: 'GanhosListagem',
        component: GanhosListagem
    },
    {
        path: '/ganhos-cadastro',
        name: 'GanhosCadastro',
        component: GanhosCadastro
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;