import { shallowMount } from '@vue/test-utils'
import app from '@/App.vue';
import home from '@/views/Home.vue';
import header from '@/components/Header.vue';
import footer from '@/components/Footer.vue';
import Vue from "vue";
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import {routes} from '@/router/index.js';

describe('In App.vue', () => {
  let appWrapper;
  const router = new VueRouter({ routes });
  
  beforeEach(()=>{
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    appWrapper = shallowMount(app,{
      Vue,
      router
    });
  });
  afterEach(()=>{
    appWrapper.destroy();
  });

  it('is a Vue instance',()=>{
    expect(appWrapper.isVueInstance).toBeTruthy();
  });

  it('it renders correct markup',()=>{
    expect(appWrapper.html()).toContain('<div id="app">');
  });

  it('it should have v-app-stub',()=>{
    expect(appWrapper.html()).toContain('v-app');
  });

  describe("it should load Header component", () => {
    it('it should load header',()=>{
      expect(header).toBeTruthy();
    });
    it('it should have a <app-header-stub></app-header-stub>', () => {
      expect(appWrapper.html()).toContain('<app-header-stub></app-header-stub>');
    });
  });

  describe("it should load Footer component", () => {
    it('it should load footer',()=>{
      expect(footer).toBeTruthy();
    });
    it('it should have a <app-footer-stub></app-footer-stub>', () => {
      expect(appWrapper.html()).toContain('<app-footer-stub></app-footer-stub>');
    });
  });

  describe("it should render router view", () => {
    it('it should have v-content"', () => {
      expect(appWrapper.html()).toContain("v-content");
    });
    it("it should load the Home view by default", () => {
      expect(home).toBeTruthy();
    });
  });
});
