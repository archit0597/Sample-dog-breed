import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import footer from '@/components/Footer.vue';

describe("In Footer Component", () => {
    let footerWrapper;

    beforeEach(() => {
        Vue.use(Vuetify);
        footerWrapper = shallowMount(footer, {
            Vue,
        });
    });

    afterEach(() => {
        footerWrapper.destroy();
    });

    it("is a Vue instance", () => {
        expect(footerWrapper.isVueInstance).toBeTruthy();
    });
    it("it should have a <v-footer-stub></v-footer-stub>", () => {
        expect(footerWrapper.html()).toContain("v-footer-stub");
    });
    it("it should have a <v-spacer-stub></v-spacer-stub>", () => {
        expect(footerWrapper.html()).toContain("v-spacer-stub");
    });
    it("it should have a <strong> element", () => {
        expect(footerWrapper.html()).toContain("strong");
    });
    it('it should contain correct footer text',()=>{
        expect(footerWrapper.find('strong').text()).toMatch('K-9s ©2020');
    });
});