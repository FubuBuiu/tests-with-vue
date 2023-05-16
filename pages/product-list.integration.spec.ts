import { mount, createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ProductList from './index.vue';
import { makeServer } from '~/miragejs/server';
import ProductCard from '@/components/product-card.vue';
import Search from '@/components/search-field.vue';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;

let server: any;

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('ProductList - integration', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });
  test('should mount the component', () => {
    const wrapper = mount(ProductList, {
      localVue,
      vuetify,
    });
    expect(wrapper.vm);
  });
  test('should mount the Search component as a child', () => {
    const wrapper = mount(ProductList, {
      localVue,
      vuetify,
    });
    expect(wrapper.findComponent(Search)).toBeDefined();
  });
  test('should call axios.get on component mount', () => {
    mount(ProductList, {
      mocks: {
        $axios: axios,
      },
      localVue,
      vuetify,
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });
  test('should mount the ProductCard component 10 times', async () => {
    const products = server.createList('product', 10);

    (axios.get as jest.Mock).mockReturnValue(
      Promise.resolve({ data: { products } })
    );

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
      localVue,
      vuetify,
    });

    await Vue.nextTick();

    const cards = wrapper.findAllComponents(ProductCard);

    expect(cards).toHaveLength(10);
  });
  test('should display the error message when Promises rejects', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.reject(new Error(' ')));

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
      localVue,
      vuetify,
    });

    await Vue.nextTick();

    expect(wrapper.text()).toContain('Error getting product list');
  });
});
