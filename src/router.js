import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';
import Index from './views/Index.vue';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const About = () => import(/* webpackChunkName: "About" */ './views/About.vue');
const Terms = () => import(/* webpackChunkName: "TermsOfUse" */ './views/TermsOfUse.vue');
const Register = () => import(/* webpackChunkName: "Register" */ './views/Register.vue');
const Dashboard = () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue');
const AdminDash = () => import(/* webpackChunkName: "Dashboard" */ './components/admin/AdminDash.vue');

Vue.use(Router);

const isAuthenticated = (to, from, next) => {
  Store.dispatch('auth/authenticate')
    .then(() => next()).catch(() => next('/'));
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      beforeEnter(to, from, next) {
        Store.dispatch('auth/authenticate')
          .then(() => next('/dashboard')).catch(() => next());
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/terms_of_use',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/admin',
      name: 'AdminDash',
      component: AdminDash,
      beforeEnter: isAuthenticated,
    },

  ],
});
