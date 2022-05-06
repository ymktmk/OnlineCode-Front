import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/TopPage'
import Python from '@/components/python/Python'
import Python_id from '@/components/python/_id'
import Php from '@/components/php/Php'
import Node from '@/components/Node'
import Ruby from '@/components/Ruby'
import Dart from '@/components/Dart'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: TopPage },
        { path: '/python', component: Python },
        { path: '/python/:id', component: Python_id },
        { path: '/php', component: Php },
        { path: '/node', component: Node },
        { path: '/ruby', component: Ruby },
        { path: '/dart', component: Dart },
    ]
})

export default router