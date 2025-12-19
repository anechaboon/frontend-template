import * as authApi from '@/api/auth.api';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.user,
    },

    actions: {
        async login(credentials) {
            this.loading = true;

            try {
                // 1. get csrf cookie
                await authApi.csrf();

                // 2. login
                await authApi.login(credentials);

                // 3. fetch user
                const { data } = await authApi.me();
                this.user = data.data;
                return { ...data };
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            const { data }  = await authApi.logout();
            this.user = null;
            return { ...data };
        },

        async fetchUser() {
            try {
                const { data } = await authApi.me();
                this.user = data.data;
            } catch {
                this.user = null;
            }
        },
    },
});
