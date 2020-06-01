<template>
  <v-app>
    <h1 align="center"><strong>{{breedName | formattedBreedName}}</strong></h1>
    <v-row max-height="auto">
      <v-col v-for="item in subBreeds" :key="item" align="center">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" shaped width="300" :elevation="hover ? 12 : 2">  
            <v-card-subtitle class="blue--text pb" align="center"><strong>{{item | formattedBreedName}}</strong></v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>   
    <v-row>
      <v-col v-for="image in breedImageURL" :key=image.id>
        <v-card class="mx-auto" width="300" :elevation="10">  
          <v-img class="white--text align-end" height="150px" :src="image">
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular> 
                </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { fetchBreedImages } from "@/services/dogs-service.js";
import formattedBreedName from '@/filters/capitalize-filter.js';

export default {
  data: () => ({
    breedImageURL: [],
    subBreeds:[]
  }),
  computed:{
    breedName(){
      return this.$store.getters.breedName;
    }
  },
  filters:{
    formattedBreedName
  },
  created(){
    this.$store.dispatch('changeOnGallery',true);
    this.$store.dispatch('changeSearchQuery','');
    this.subBreeds = this.$store.getters.subBreed;
    fetchBreedImages(this.breedName).then(response=>{
      this.breedImageURL = response.data.message;
    });
  }
}
</script>