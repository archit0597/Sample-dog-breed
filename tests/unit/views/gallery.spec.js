import { shallowMount } from '@vue/test-utils';
import gallery from '@/views/Gallery.vue';
import { fetchBreedImages } from "@/services/dogs-service.js";
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {routes} from '@/router/index.js';

describe("In Gallery.vue", () => {
    let galleryWrapper;
    let router = new VueRouter({ routes });
    let store;
    let getters;
    let state;
    let actions;
    let mutations;
    
    
    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(VueRouter);
        Vue.use(Vuex);
        state={
            onGallery: true,
            breedName: 'australian',
            searchQuery: 'australian',
            subBreeds: 'sheperd'
        }
        getters = {
            onGallery: ()=> state.onGallery,
            breedName: ()=> state.breedName,
            searchQuery: ()=> state.searchQuery,
            subBreeds: ()=> state.subBreeds
        }
        mutations = {
            'CHANGE_ON_GALLERY'(payload){
                state.onGallery = payload;
            },
            'CHANGE_BREED_NAME'(payload){
                state.breedName = payload;
            },
            'CHANGE_SEARCH_QUERY'(payload){
                state.searchQuery = payload;
            }
        }
        actions = {
            changeOnGallery({commit},payload){
                commit('CHANGE_ON_GALLERY',payload);
            },
            changeBreedName({commit},payload){
               commit('CHANGE_BREED_NAME',payload);
            },
            changeSearchQuery({commit},payload){
                commit('CHANGE_SEARCH_QUERY',payload);
            },
        }
        store = new Vuex.Store({
            state,
            mutations,
            actions,
            getters
        })
        galleryWrapper = shallowMount(gallery, {
            Vue,
            router,
            data(){
                return {
                    searchQuery: 'australian',
                    breedImageURL: ["pic"],
                    subBreeds: ['sheperd']
                }
            },
            store,
        });
    });

    afterEach(() => {
        galleryWrapper.destroy();
    });

    it("is a Vue instance", () => {
        expect(galleryWrapper.isVueInstance).toBeTruthy();
    });

    it("it should have a <v-app-stub></v-app-stub>", () => {
        expect(galleryWrapper.html()).toContain("v-app-stub");
    });

    it("it should have a h1 tag with field husky", () => {
        expect(galleryWrapper.find('h1').text()).toContain("Australian");
    });

    it('it should have <v-row-stub></v-row-stub>',()=>{
        expect(galleryWrapper.html()).toContain("v-row-stub");
    }); 
});