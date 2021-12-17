import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/TopPage'
import Python from '@/components/Python'
import Node from '@/components/Node'
import Ruby from '@/components/Ruby'
import Go from '@/components/Golang'
import Dart from '@/components/Dart'

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
        path: '/node',
        name: 'Node',
        component: Node
    },
    {
        path: '/ruby',
        name: 'Ruby',
        component: Ruby
    },
    {
        path: '/go',
        name: 'Go',
        component: Go
    },
    {
        path: '/dart',
        name: 'Dart',
        component: Dart
    },
    ]
})

export default router