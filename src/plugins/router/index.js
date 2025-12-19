import { useAuthStore } from '@/stores/auth.store';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
    const auth = useAuthStore();
    if (auth.user === null) {
        await auth.fetchUser();
    }
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return { name: 'login' };
    }
    if (to.meta.guest && auth.isAuthenticated) {
        return { name: 'dashboard' };
    }
});

export default function (app) {
  app.use(router)
}
export { router };

