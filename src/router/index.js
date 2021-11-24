import Vue from 'vue'
import Router from 'vue-router'
// import TopPage from '@/components/TopPage'
import Python from '@/components/Python'
import PHP from '@/components/PHP'

Vue.use(Router)

const router = new Router({
    routes: [
    // {
    //     path: '/',
    //     name: 'TopPage',
    //     component: TopPage
    // },
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
    ]
})

export default router