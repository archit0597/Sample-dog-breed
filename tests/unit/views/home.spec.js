import { shallowMount } from '@vue/test-utils'
import home from '@/views/Home.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import dashboard from '@/components/Dashboard.vue'
//import VueRouter from 'vue-router';
//import {routes} from '@/router/index.js';

describe('In Home.vue', () => {
  let homeWrapper;
  //const router = new VueRouter({ routes });
  
  beforeEach(()=>{
    Vue.use(Vuetify);
    //Vue.use(VueRouter);
    homeWrapper = shallowMount(home,{
      Vue
    });
  });
  afterEach(()=>{
    homeWrapper.destroy();
  });

  it('is a Vue instance',()=>{
    expect(homeWrapper.isVueInstance).toBeTruthy();
  });

  it('it renders correct markup',()=>{
    expect(homeWrapper.html()).toContain('v-content-stub');
  });

  describe("it should load Dashboard component", () => {
    it('it should have <app-dashboard>',()=>{
        expect(homeWrapper.html()).toContain('<app-dashboard-stub></app-dashboard-stub>');
    });

    it('it should load dashboard',()=>{
      expect(dashboard).toBeTruthy();
    });
  });
});
