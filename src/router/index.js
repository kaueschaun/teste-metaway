import { createRouter, createWebHistory } from 'vue-router';
import Login from '../../src/views/Login.vue';
import paths from './paths';

const isAuthenticated = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token'); 
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: paths.login 
    },
    {
      path: paths.login,
      name: 'login',
      component: Login
    },
    {
      path: paths.home,
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: paths.profile,
      name: 'perfil',
      component: () => import('../views/Perfil.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: paths.users,
      name: 'users',
      component: () => import('../views/Users.vue'),
      meta: { requiresAuth: true } 
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
