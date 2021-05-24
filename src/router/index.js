import Vue from 'vue'
import VueRouter from 'vue-router'
import SingleCardWindow from "@/components/cards/SingleCardWindow";
import LikedCollectionsWindow from "@/components/collections/LikedCollectionsWindow";
import MyCollectionsWindow from "@/components/collections/MyCollectionsWindow";
import AllCollectionsWindow from "@/components/collections/AllCollectionsWindow";
import AuthService from "../services/AuthService";
import SignInComponent from "../components/auth/SignInComponent";
import SignUpComponent from "../components/auth/SignUpComponent";

Vue.use(VueRouter)

function guard_authenticated(to, from, next) {
    if (AuthService.current) {
        next();
    } else {
        next({name: "sign-in"});
    }
}

const routes = [
    {
        path: '/sign-in',
        name: 'sign-in',
        component: SignInComponent,
        beforeEnter: (to, from, next) => {
            if (AuthService.current) {
                next({name: "collections"});
            } else {
                next();
            }
        }
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUpComponent,
        beforeEnter: (to, from, next) => {
            if (AuthService.current) {
                next({name: "collections"});
            } else {
                next();
            }
        }
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
        component: MyCollectionsWindow,
        beforeEnter: guard_authenticated
    },
    {
        path: '/liked-collections',
        name: 'liked-collections',
        component: LikedCollectionsWindow,
        beforeEnter: guard_authenticated
    },
    {
        path: '/collections/:collection_id',
        name: 'learn-collection',
        props: true,
        component: SingleCardWindow,
        beforeEnter: guard_authenticated
    },
    {
        path: "*",
        beforeEnter: (to, from, next) => {
            next("collections")
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})


export default router
