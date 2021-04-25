import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () =>
            import('../components/Home.vue'),
    },
    {
        path: '/stats',
        name: 'Stats',
        component: () =>
            import('../components/Stats.vue'),
    },	
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import('../components/Register.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import('../components/Dashboard.vue'),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/history',
        name: 'History',
        component: () =>
            import('../components/History.vue'),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: () =>
            import('../components/Detail.vue'),
        meta: {
            authRequired: true,
        },
    },	
    {
        path: '/draw',
        name: 'Draw',
        component: () =>
            import('../components/Draw.vue'),		
        meta: {
            authRequired: true,
        },
    },	
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (firebase.auth().currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});

export default router;