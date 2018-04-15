import VueRouter from 'vue-router'
import agents from '../components/agents'
import account from '../components/account'
import login from '../components/login'
import artist from '../components/artist'
import home from '../components/Home'
import Vue from 'vue'
import event from '../components/event'
import agency from '../components/agency'


// Configure routes for all Applets



Vue.use(VueRouter)

// Instantiate `router`
const router =
     new VueRouter({
        routes:[
            {
                path: '/',
                name: 'home',
                component: home
            },
            {
                path: '/agents',
                name: 'agent',
                component: agents
            },
            {
              name:'agency',
              path:'/agency',
              component:agency
            },
            {
                path: '/Profile',
                name:'profile',
                component:account
            },
            {
                path: '/login',
                name:'Login',
                component:login
            },
            {
                path:'/artist',
                name:'artists',
                component:artist
            },
            {
                path:'/event',
                name:'event',
                component:event
            }
        ]
        ,
        mode: 'history'
    })


export default router