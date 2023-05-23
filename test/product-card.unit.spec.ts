import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ProductCard from '@/components/product-card.vue';
import { makeServer } from '~/miragejs/server';

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
  return {
    wrapper: mount(ProductCard, {
      localVue,
      vuetify,
      propsData: {
        product,
      },
    }),
    product,
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
  test('should emit the event addToCart with product object when button gets clicked', async () => {
    const { wrapper, product } = mountProductCard();

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().addToCart).toBeTruthy();
    expect(wrapper.emitted().addToCart?.length).toBe(1);
    expect(wrapper.emitted().addToCart![0]).toEqual([{ product }]);
  });
});
