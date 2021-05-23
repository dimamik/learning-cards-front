import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthComponent from "@/components/auth/AuthComponent";
import SingleCardWindow from "@/components/cards/SingleCardWindow";
import LikedCollectionsWindow from "@/components/collections/LikedCollectionsWindow";
import MyCollectionsWindow from "@/components/collections/MyCollectionsWindow";
import AllCollectionsWindow from "@/components/collections/AllCollectionsWindow";

Vue.use(VueRouter)

const routes = [

    {
        path: '/auth',
        name: 'auth',
        component: AuthComponent
    },
    {
        path: '/',
        alias: ['/collections'],
        name: 'collections',
        component: AllCollectionsWindow
    },
    {
        path: '/my-collections',
        name: 'my-collections',
        component: MyCollectionsWindow
    },
    {
        path: '/liked-collections',
        name: 'liked-collections',
        component: LikedCollectionsWindow
    },

    {
        path: '/collections/:collection_id',
        name: 'learn-collection',
        props: true,
        component: SingleCardWindow
    },

]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
