import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ProductCard from '@/components/product-card.vue';
import { makeServer } from '~/miragejs/server';

Vue.use(Vuetify);

describe('ProductCard component - unit', () => {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();
  let server: any;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  test('should match snapshot', () => {
    // const product = server.create('product');
    const wrapper = mount(ProductCard, {
      localVue,
      vuetify,
      propsData: {
        productImage:
          'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
        productTitle: 'Relógio bonito',
        productPrice: '45.00',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  test('should mount the component', () => {
    // const product = server.create('product');
    const wrapper = mount(ProductCard, {
      localVue,
      vuetify,
      propsData: {
        productImage:
          'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
        productTitle: 'Relógio bonito',
        productPrice: '45.00',
      },
    });
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relógio bonito');
    expect(wrapper.text()).toContain('45.00');
  });
});
