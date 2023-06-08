import { expect } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ProductCard from '@/components/product-card.vue';
import { makeServer } from '~/miragejs/server';
import { CartManager } from '~/managers/CartManager';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;
let server: any;

function mountProductCard() {
  const product = server.create('product', {
    image:
      'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
    title: 'Relógio bonito',
    price: '45.00',
  });

  const cartManager = new CartManager();

  const wrapper = mount(ProductCard, {
    localVue,
    vuetify,
    stubs: { Nuxt: true },
    mocks: {
      $cart: cartManager,
    },
    propsData: {
      product,
    },
  });
  return {
    wrapper,
    product,
    cartManager,
  };
}
describe('ProductCard component - unit', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  test('should match snapshot', () => {
    const { wrapper } = mountProductCard();

    expect(wrapper.element).toMatchSnapshot();
  });
  test('should mount the component', () => {
    const { wrapper } = mountProductCard();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relógio bonito');
    expect(wrapper.text()).toContain('45.00');
  });
  test('should add product to cart when button gets clicked', async () => {
    const { wrapper, cartManager, product } = mountProductCard();

    const spy1 = jest.spyOn(cartManager, 'open');
    const spy2 = jest.spyOn(cartManager, 'addProduct');
    await wrapper.find('button').trigger('click');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(product);
  });
});
