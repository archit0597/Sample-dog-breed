import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breedName: '',
    searchQuery: '',
    searchOption: false,
    onGallery: false,
    subBreed:[],
    allDogBreeds: {},
  },
  mutations: {
    'BREED_NAME'(state,payload){
      state.breedName = payload;
    },
    'SEARCH_QUERY'(state,payload){
      state.searchQuery = payload;
    },
    'SEARCH_OPTION'(state,payload){
      state.searchOption = payload;
    },
    'ON_GALLERY'(state,payload){
      state.onGallery = payload;
    },
    'SUB_BREED'(state,payload){
      state.subBreed = payload;
    },
    'ALL_DOG_BREEDS'(state,payload){
      state.allDogBreeds = payload;
    }
  },
  actions: {
    changeBreedName({commit},payload){
      commit('BREED_NAME',payload);
    },
    changeSearchQuery({commit},payload){
      commit('SEARCH_QUERY',payload);
    },
    changeSearchOption({commit},payload){
      commit('SEARCH_OPTION',payload);
    },
    changeOnGallery({commit},payload){
      commit('ON_GALLERY',payload);
    },
    changeSubBreed({commit},payload){
      commit('SUB_BREED',payload);
    },
    changeAllDogBreeds({commit},payload){
      commit('ALL_DOG_BREEDS',payload);
    }
  },
  getters:{
    breedName: (state)=> (state.breedName),
    searchQuery: (state)=> (state.searchQuery),
    searchOption: (state)=> (state.searchOption),
    onGallery: (state)=> (state.onGallery),
    subBreed: (state)=> (state.subBreed),
    allDogBreeds: (state) => (state.allDogBreeds)
  },
  modules: {
  }
})
