import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/TopPage'
import Python from '@/components/Python'

Vue.use(Router)

const router = new Router({
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
    ]
})

export default router