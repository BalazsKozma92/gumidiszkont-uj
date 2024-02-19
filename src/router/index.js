import { createRouter, createWebHistory } from '@ionic/vue-router';
import { authGuard } from './authGuard';

const routes = [
  {
    path: '/',
    component: () => import('../views/layouts/AuthWrapper.vue'),
    children: [
      {
        path: '/',
        redirect: '/main-page',
        meta: { requiresAuth: true }
      },
      {
        path: '/main-page',
        component: () => import ('../views/Authenticated/Fooldal.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/tyre',
        component: () => import ('../views/Authenticated/Gumiabroncs.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/rim',
        component: () => import ('../views/Authenticated/Felni.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/tyre-service',
        component: () => import ('../views/Authenticated/Gumiszerviz.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/car-service',
        component: () => import ('../views/Authenticated/Autoszerviz.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/rim-repair',
        component: () => import ('../views/Authenticated/Felnijavitas.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/air-conditioner-repair',
        component: () => import ('../views/Authenticated/Klimatisztitas.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/gear-adjustment',
        component: () => import ('../views/Authenticated/FutomuAllitas.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/coupons',
        component: () => import ('../views/Authenticated/Kuponok.vue'),
        meta: { requiresAuth: true }
      },
      // {
      //   path: '/appointment',
      //   component: () => import ('../views/Authenticated/Idopontfoglalas.vue'),
      //   meta: { requiresAuth: true }
      // },
      {
        path: '/map',
        component: () => import ('../views/Authenticated/Terkep.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/fleet',
        component: () => import ('../views/Authenticated/Flottak.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/help',
        component: () => import ('../views/Authenticated/Segitseg.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/scanner',
        component: () => import ('../views/Authenticated/Szkenner.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/verify-email/:token',
    component: () => import('../views/VerificationPage.vue'),
    props: true
  },
  {
    path: '/password-reset/:token',
    component: () => import('../views/PasswordReset.vue'),
    props: true
  },
  {
    path: '/registration',
    component: () => import ('../views/RegistrationForm.vue')
  },
  {
    path: '/password-request',
    component: () => import ('../views/PasswordRequest.vue')
  },
  {
    path: '/login',
    component: () => import ('../views/LoginForm.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(authGuard);

export default router
