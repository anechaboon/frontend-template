
export const routes = [
  {   
    path: '/', 
    redirect: '/dashboard',
    meta: { requiresAuth: true },
  },
  { 
    path: '/tickets',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/ticket/index.vue'),
        meta: { requiresAuth: true },
      }
    ],
  },
  { 
    path: '/vessels',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/vessels/index.vue'),
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: '/categories',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/category/index.vue'),
        meta: { requiresAuth: true },
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
        path: '/tickets/add',
        component: () => import('@/pages/ticket/ticketFormPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
