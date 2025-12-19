<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue';
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
  <!-- 👉 Front Pages -->
  <VerticalNavGroup
    :item="{
      title: 'Tickets',
      icon: 'ri-coupon-3-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Tickets List',
        href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/apps/email',
        target: '_blank',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Add Tickets',
        href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/apps/email',
      }"
    />
  </VerticalNavGroup>

  <VerticalNavLink
    :item="{
      title: 'Vessels',
      icon: 'ri-ship-2-line',
      href: '/vessels',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Organizations',
      icon: 'ri-kanban-view',
      href: 'organizations',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Service Lines',
      icon: 'ri-service-line',
      href: '/service-lines',
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
