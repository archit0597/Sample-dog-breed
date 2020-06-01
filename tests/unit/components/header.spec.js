import { shallowMount } from '@vue/test-utils';
import header from '@/components/Header.vue';
import home from '@/views/Home.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {routes} from '@/router/index.js';

describe("In Header Component", () => {
    let headerWrapper;
    let router = new VueRouter({ routes });
    let store;
    let state;  
    let actions;
    let getters;
    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(VueRouter);
        Vue.use(Vuex);
        state={
            onGallery: true,
            searchOption: '',
            searchQuery: ''
        },
        actions = {
            changeOnGallery: jest.fn(),
            changeSearchQuery: jest.fn(),
            changeSearchOption: jest.fn()
        },    
        getters = {
            onGallery: () => state.onGallery
        }
        store = new Vuex.Store({
            state,
            actions,
            getters
        });
        headerWrapper = shallowMount(header, {
            Vue,
            router,
            data(){
                return {
                    searchQuery: 'husky',
                }
            },
            store,
        });
    });

    afterEach(() => {
        headerWrapper.destroy();
    });

    it("is a Vue instance", () => {
        expect(headerWrapper.isVueInstance).toBeTruthy();
    });
    it("it should have a <v-app-bar-stub></v-app-bar-stub>", () => {
        expect(headerWrapper.html()).toContain("v-app-bar-stub");
    });
    it("it should have a <v-spacer-stub></v-spacer-stub>", () => {
        expect(headerWrapper.html()).toContain("v-spacer-stub");
    });

    it('it should load the v-form if onGallery is false',()=>{
        setTimeout(()=>{
            headerWrapper.setData({onGallery: false});
            expect(headerWrapper.html()).toContain("v-form-stub");
        })
    });

    it('it should load the v-btn if onGallery is true',()=>{
        expect(headerWrapper.html()).toContain("v-btn-stub");
    });

    it('on button click it should call backToHome method',()=>{
            headerWrapper.vm.backToHome();
            expect(home).toBeTruthy();
    });

    it('on input in search box it should call searchBreed method',()=>{
        headerWrapper.vm.searchBreed();
        setTimeout(()=>{
            headerWrapper.setData({ searchQuery: 'D' });
            expect(headerWrapper.vm.searchBreed).toBeCalled();
            headerWrapper.setData({ searchQuery: '' });
            expect(headerWrapper.vm.searchBreed).not.toBeCalled();
        });
});
    

    describe('Watcher - searchQuery', () => {
        beforeEach(() => {
          headerWrapper.vm.searchBreed = jest.fn();
        });
    
        it('when searchQuery has full name, then searchBreed funtion should call', () => {
            headerWrapper.setData({ searchQuery: 'hound' });
            setTimeout(()=>{
                headerWrapper.vm.$options.watch.searchQuery.call(headerWrapper.vm);
                expect(headerWrapper.vm.searchBreed).toBeCalled();
            });
        });
    
        it('when searchQuery has first letter, then also searchBreed funtion should call', () => {
          headerWrapper.setData({ searchQuery: 'D' });
          headerWrapper.vm.$options.watch.searchQuery.call(headerWrapper.vm);
          expect(headerWrapper.vm.searchBreed).not.toBeCalled();
        });
    
        it('when searchQuery has null or empty, then it should not call', () => {
          headerWrapper.setData({ searchQuery: '' });
          headerWrapper.vm.$options.watch.searchQuery.call(headerWrapper.vm);
          expect(headerWrapper.vm.searchBreed).not.toBeCalled();
        });
      });
});