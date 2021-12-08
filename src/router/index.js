import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/TopPage'
import Python from '@/components/Python'
import PHP from '@/components/PHP'
import Javascript from '@/components/Javascript'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
    {
        path: '/',
        name: 'TopPage',
        component: TopPage
    },
    {
        path: '/python',
        name: 'Python',
        component: Python
    },
    {
        path: '/php',
        name: 'PHP',
        component: PHP
    },
    {
        path: '/javascript',
        name: 'Javascript',
        component: Javascript
    },
    ]
})

export default router