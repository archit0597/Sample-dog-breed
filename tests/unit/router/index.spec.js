import { shallowMount} from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Gallery from "@/views/Gallery.vue";
import VueRouter from "vue-router";
import {routes} from "@/router/index.js";
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(VueRouter);
Vue.use(Vuetify);

describe("In index.js Router file", () => {
  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes })
    const wrapper = shallowMount(Home, { 
      router
    });
    router.push("/gallery")
    await wrapper.vm.$nextTick()
    expect(wrapper.find(Gallery).exists()).toBe(false)
  });
})

