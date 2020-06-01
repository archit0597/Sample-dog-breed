<template>
  <v-content>
    <keep-alive>
      <app-dashboard></app-dashboard>
    </keep-alive>
  </v-content>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'
export default {
  name: 'Home',
  components: {
    appDashboard: Dashboard
  }
}
</script>
