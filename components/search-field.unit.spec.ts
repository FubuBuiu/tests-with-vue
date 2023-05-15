import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Search from '@/components/search-field.vue';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;

describe('Search - unit', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  test('should mount the component', () => {
    const wrapper = mount(Search, {
      localVue,
      vuetify,
    });

    expect(wrapper.vm).toBeDefined();
  });
  test('should emit search event when form is submitted', async () => {
    const wrapper = mount(Search, {
      localVue,
      vuetify,
    });
    const search = 'termo para busca';
    const input = wrapper.getComponent(Search).find('[id="search-input"]');
    await input.setValue(search);
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted().doSearch).toBeTruthy();
    expect(wrapper.emitted().doSearch?.length).toBe(1);
    expect(wrapper.emitted().doSearch![0]).toEqual([{ search }]);
  });
  test('should emit search event when search input is cleared', async () => {
    const wrapper = mount(Search, {
      localVue,
      vuetify,
    });
    const search = 'termo para busca';
    const input = wrapper.getComponent(Search).find('[id="search-input"]');
    await input.setValue(search);
    await input.setValue('');

    expect(wrapper.emitted().doSearch).toBeTruthy();
    expect(wrapper.emitted().doSearch?.length).toBe(1);
    expect(wrapper.emitted().doSearch![0]).toEqual([{ search: '' }]);
  });
});
