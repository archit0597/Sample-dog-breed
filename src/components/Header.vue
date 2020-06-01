<template>
    <v-app-bar color="deep-purple accent-4" max-height="70px">  
        <v-toolbar-title><router-link to="/" style="color:white;text-decoration: none">K-9s</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="!onGallery">
            <v-form>
                <v-text-field style="margin-top:15px"  @input="searchBreed" class="customInput" solo dense label="Search Breed" v-model="searchQuery">
                </v-text-field>
            </v-form>      
        </div>
        <div v-else> 
            <v-btn @click="backToHome">Home</v-btn>
        </div> 
    </v-app-bar>
</template>

<script>
export default {
    name:'Header',
    data(){
        return{
            searchQuery: '',
        }
    },
    methods:{
        searchBreed(){
            if(!this.searchQuery){
                return
            }
            this.$store.dispatch('changeSearchQuery',this.searchQuery);
        },
        backToHome(){
            this.searchQuery='';
            this.$store.dispatch('changeOnGallery',false);
            this.$store.dispatch('changeSearchQuery','');
            this.$router.push({path:'/'})
        }
    },
    computed:{
        onGallery(){
            return this.$store.getters.onGallery;
        }
    },
    watch:{
        searchQuery(){
            if(this.searchQuery){
                this.$store.dispatch('changeSearchOption',true);
            }
            else{
                this.$store.dispatch('changeSearchOption',false);
            }

        },
        /*onGallery(){
            return this.$store.getters.onGallery;
        }*/
    }
    
}
</script>