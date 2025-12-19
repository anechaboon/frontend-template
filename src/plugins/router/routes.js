export const routes = [
  { path: '/', redirect: '/dashboard' },
  { 
    path: '/vessels',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/vessels/index.vue'),
      }
    ],
  },
  { 
    path: '/organizations',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/organizations/index.vue'),
      }
    ],
  },
  {
    path: '/service-lines',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/service-line/index.vue'),
      }
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
