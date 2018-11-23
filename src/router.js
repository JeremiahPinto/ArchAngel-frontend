import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const About = import(/* webpackChunkName: "about" */ './views/About.vue');
const Dashboard = import(/* webpackChunkName: "about" */ './views/Dashboard.vue');

// const Register = import(/* webpackChunkName: "about" */ './components/Register.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/about',
      name: 'about',
      component: () => About,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => Dashboard,
    },
  ],
});
