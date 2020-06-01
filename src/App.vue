<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <v-content>
        <keep-alive include="Dashboard">
          <router-view></router-view>
        </keep-alive> 
      </v-content>
      <app-footer></app-footer>
    </v-app>
  </div>  
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    appHeader: Header,
    appFooter: Footer
  },
};
</script>
<style>
</style>
