<template>
  <v-container>
    <h1 align="center"><strong>Dog Breeds</strong></h1>
    <v-row v-if="!searchOption">
      <v-col v-for="(item,i) in temp" :key="i">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" width="300" :elevation="hover ? 12 : 2"> 
            <v-img class="white--text align-end" height="150px" :src="imageURL[i+paginatedImage()]">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular> 
                </v-row>
              </template>
            </v-img>
            <v-card-subtitle class="blue--text pb" align="center" @click="showGallery(item)"><strong>{{item | formattedBreedName}}</strong></v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  
    <v-row v-else>
      <v-col v-for="(item,breed) in searchedList" :key="breed">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" shaped:true width="300" :elevation="hover ? 12 : 2">  
            <v-card-subtitle class="blue--text pb" align="center" @click="showGallery(breed)"><strong>{{breed | formattedBreedName}}</strong></v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
      <v-pagination
      v-model="page"
      :length="pageLength"
      ></v-pagination>
  </v-container>
</template>

<script>
import {fetchAllBreeds, fetchBreedRandomImage} from '@/services/dogs-service.js';
import formattedBreedName from '@/filters/capitalize-filter.js';

  export default {
    name: 'Dashboard',
    data: () => ({
      allDogBreeds: {},
      imageURL:[],
      searchedList: {}, 
      temp:[],   
      perPage: 9,
      page:1
    }),
    async created(){
      this.initFunction();
    },
    mounted(){
      setTimeout(() => {
        this.fetchRandomImage(this.allDogBreeds);
        this.paginatedData();
      }, 3000);
    },
    filters:{
      formattedBreedName
    },
    methods:{
      initFunction(){
        fetchAllBreeds().then(response=>{
          this.allDogBreeds = response.data.message;
          this.$store.dispatch('changeAllDogBreeds',this.allDogBreeds);
        });    
        this.$store.dispatch('changeOnGallery',false);
      },
      paginatedData(){
        var start = (this.page-1)*this.perPage;
        var end = this.page*this.perPage - 1;
        end = (Object.keys(this.allDogBreeds).length)<end ?  (Object.keys(this.allDogBreeds).length)-1 : end;
        this.temp = Object.keys(this.allDogBreeds).slice(start,end+1);
      },
      paginatedImage(){
        return (this.page-1)*this.perPage;
      },
      showGallery(value){
        this.$store.dispatch('changeBreedName',value);
        this.$store.dispatch('changeSearchQuery','');
        var subBreed = Object.values(this.allDogBreeds[value]);
        this.$store.dispatch('changeSubBreed',subBreed);
        this.$router.push({path:'/gallery'});
      },
      async fetchRandomImage(list){
          for (var value in list) { 
              await fetchBreedRandomImage(value).then(response => {
                this.imageURL.push(response.data.message); 
          });
        }
      }
    },
    computed:{
      pageLength(){
        return Math.ceil(Object.keys(this.allDogBreeds).length/this.perPage);
      },
        searchQuery(){
          return this.$store.getters.searchQuery;
        },
        searchOption(){
          return this.$store.getters.searchOption;
        }                   
    },
    watch:{
      page(){
      this.paginatedData();
    },
      searchQuery() {
        this.searchedList={};
        this.tempURL=[];
        for (const key in this.allDogBreeds) {
        
            if(key.includes(this.searchQuery)){ 
              this.searchedList[key]=this.allDogBreeds[key];
          }
        }
      }
    },
    searchOption(){
      this.searchOption = this.$store.getters.searchOption;  
    }
  }

</script>
<style scoped>
.pb{
  cursor: pointer;
}
</style>