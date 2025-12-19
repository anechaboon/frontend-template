<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';

import { useAuthStore } from '@/stores/auth.store';
const auth = useAuthStore(); 

async function logout() {
  const res = await auth.logout();
  if (res.status) {
    window.location.href = '/login';
  }
}
</script>

<template>

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Vessels',
      icon: 'ri-ship-2-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/apps/email',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Organizations',
      icon: 'ri-kanban-view',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/apps/chat',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Service Lines',
      icon: 'ri-service-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/apps/calendar',
      target: '_blank',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/account-settings',
    }"
  />

  <!-- 👉 Others -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Others',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Logout',
      icon: 'ri-logout-box-r-line',
    }"
    @click="logout"
  />
</template>
