import store from '@/store/index.js';

describe('in store', () => {
  it('test for breedName',()=>{
      store.dispatch('changeBreedName','husky');
      expect(store.getters.breedName).toBe('husky');
  });

  it('test for searchQuery',()=>{
    store.dispatch('changeSearchQuery','');
    expect(store.getters.searchQuery).toBe('');
    });

it('test for searchOption',()=>{
    store.dispatch('changeSearchOption',false);
    expect(store.getters.searchOption).toBe(false);
});

it('test for onGallery',()=>{
    store.dispatch('changeOnGallery',false);
    expect(store.getters.onGallery).toBe(false);
});

it('test for allDogBreeds',()=>{
    let tempList = {"australian":"sheperd"}
    store.dispatch('changeAllDogBreeds',{"australian":"sheperd"});
    expect(store.getters.allDogBreeds).toEqual(tempList);
});


it('test for subBreeds',()=>{
    store.dispatch('changeSubBreed',"sheperd");
    expect(store.getters.subBreed).toBe('sheperd');
});
})