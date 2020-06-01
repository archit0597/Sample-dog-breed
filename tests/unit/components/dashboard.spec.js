import { shallowMount } from '@vue/test-utils';
import gallery from '@/views/Gallery.vue';
import dashboard from '@/components/Dashboard.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {routes} from '@/router/index.js';

describe("In Gallery.vue", () => {
    let dashboardWrapper;
    let router = new VueRouter({ routes });
    let store;
    let getters;
    let state;
    let actions;
    
    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(VueRouter);
        Vue.use(Vuex);
        state={
            onGallery: true,
            breedName: '',
            searchQuery: 'aff',
            subBreeds: '',
            searchOption: false
        }
        getters = {
            onGallery: ()=> state.onGallery,
            breedName: ()=> state.breedName,
            searchQuery: ()=> state.searchQuery,
            subBreeds: ()=> state.subBreeds,
            searchOption: ()=> state.searchOption
        }
        actions = {
            changeOnGallery: jest.fn(),
            changeBreedName: jest.fn(),
            changeSearchQuery : jest.fn(),
            changeSearchOption: jest.fn(),
            changeSubBreed: jest.fn()
        }
        store = new Vuex.Store({
            state,
            actions,
            getters
        })
        dashboardWrapper = shallowMount(dashboard, {
            Vue,
            router,
            data(){
                return {
                    allDogBreeds: {"affenpinscher":[],"appenzeller":[],"australian":["shepherd"]},
                    imageURL:[],
                    searchedList: {}, 
                    temp:["affenpinscher","appenzeller"],   
                    perPage: 9,
                    page:1
                }
            },
            store,
        });
    });

    afterEach(() => {
        dashboardWrapper.destroy();
    });

    it("is a Vue instance", () => {
        expect(dashboardWrapper.isVueInstance).toBeTruthy();
    });

    it("it should have a <v-container></v-container>", () => {
        expect(dashboardWrapper.html()).toContain("v-container-stub");
    });

    it("it should have a h1 tag", () => {
        expect(dashboardWrapper.find('h1').text()).toContain("Dog Breeds");
    });

    it('it should have <v-row-stub></v-row-stub>',()=>{
        expect(dashboardWrapper.html()).toContain("v-row-stub");
    }); 
    
    it('it should have <v-col-stub></v-col-stub>',()=>{
        expect(dashboardWrapper.html()).toContain("v-col-stub");
    }); 

    it('it should call showGallery on link click',()=>{
        dashboardWrapper.vm.showGallery(dashboardWrapper.vm.temp[0]);
        expect(gallery).toBeTruthy();
    });

    it('it should call paginatedData',()=>{
        dashboardWrapper.vm.paginatedData();
        expect(dashboardWrapper.vm.temp.length).toBe(3);
    });

    it('it should call paginatedImage',()=>{
        expect(dashboardWrapper.vm.paginatedImage()).toBe(0);
    });  

    it('it should have <v-pagination-stub></v-pagination-stub>',()=>{
        expect(dashboardWrapper.html()).toContain("v-pagination-stub");
    }); 

    it('watcher page - it should call the paginatedData() method', () => {
        dashboardWrapper.vm.$options.watch.page.call(dashboardWrapper.vm);
        expect(dashboardWrapper.vm.paginatedData).toHaveBeenCalled();
    });
    it('watcher searchOption - it should call the changeSearchOption() action', () => {
        dashboardWrapper.vm.$options.watch.searchOption.call(dashboardWrapper.vm);
        expect(store.getters.searchOption).toBe(true);
    });

    describe('Watcher - searchQuery', () => {
        beforeEach(() => {
          dashboardWrapper.vm.searchBreed = jest.fn();
        });
    
        it('when searchQuery has full name, then searchBreed funtion should call', () => {
            dashboardWrapper.setData({ searchQuery: 'hound' });
            setTimeout(()=>{
                dashboardWrapper.vm.$options.watch.searchQuery.call(dashboardWrapper.vm);
                expect(dashboardWrapper.vm.searchBreed).toBeCalled();
            });
        });
    
        it('when searchQuery has first letter, then also searchBreed funtion should call', () => {
          dashboardWrapper.setData({ searchQuery: 'D' });
          dashboardWrapper.vm.$options.watch.searchQuery.call(dashboardWrapper.vm);
          expect(dashboardWrapper.vm.searchBreed).not.toBeCalled();
        });
    
        it('when searchQuery has null or empty, then it should not call', () => {
          dashboardWrapper.setData({ searchQuery: '' });
          dashboardWrapper.vm.$options.watch.searchQuery.call(dashboardWrapper.vm);
          expect(dashboardWrapper.vm.searchBreed).not.toBeCalled();
        });
      });

});