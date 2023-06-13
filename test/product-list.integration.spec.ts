import { expect } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ProductList from '@/pages/index.vue';
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
    jest.clearAllMocks();
  });

  const getProducts = (quantity: number, overrides: Array<Object>) => {
    let overridesList = [];

    if (overrides.length > 0) {
      overridesList = overrides.map((override) => {
        return server.create('product', override);
      });
    }

    const products = [
      ...server.createList('product', quantity),
      ...overridesList,
    ];
    return products;
  };

  const mountProductList = async (
    quantity = 10,
    overrides: Array<Object> = [],
    shouldReject = false
  ) => {
    const products = getProducts(quantity, overrides);

    if (shouldReject) {
      (axios.get as jest.Mock).mockReturnValue(Promise.reject(new Error(' ')));
    } else {
      (axios.get as jest.Mock).mockReturnValue(
        Promise.resolve({ data: { products } })
      );
    }

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
      localVue,
      vuetify,
    });

    await Vue.nextTick();

    return { wrapper, products };
  };

  test('should mount the component', async () => {
    const { wrapper } = await mountProductList();
    expect(wrapper.vm);
  });
  test('should mount the Search component as a child', async () => {
    const { wrapper } = await mountProductList();
    expect(wrapper.findComponent(Search)).toBeDefined();
  });
  test('should call axios.get on component mount', async () => {
    await mountProductList();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });
  test('should mount the ProductCard component 10 times', async () => {
    const { wrapper } = await mountProductList();

    const cards = wrapper.findAllComponents(ProductCard);

    expect(cards).toHaveLength(10);
  });
  test('should display the error message when Promises rejects', async () => {
    const { wrapper } = await mountProductList(undefined, undefined, true);

    expect(wrapper.text()).toContain('Error getting product list');
  });
  test('should filter the product list when a search is performed', async () => {
    // Arange
    const { wrapper } = await mountProductList(10, [
      { title: 'Meu relógio amado' },
      { title: 'Meu outro relógio estimado' },
    ]);

    // Act
    const search = wrapper.findComponent(Search);
    await search.find('[id="searchInput"]').setValue('relógio');
    await search.find('form').trigger('submit');
    // Assert
    const cards = wrapper.findAllComponents(ProductCard);
    expect(wrapper.vm.$data.searchTerm).toEqual('relógio');
    expect(cards).toHaveLength(2);
  });
  test('should filter the product list when a search is performed', async () => {
    // Arange
    const { wrapper } = await mountProductList(10, [
      { title: 'Meu relógio amado' },
    ]);

    // Act
    const search = wrapper.findComponent(Search);
    await search.find('[id="searchInput"]').setValue('relógio');
    await search.find('form').trigger('submit');
    await search.find('[id="searchInput"]').setValue('');
    await search.find('form').trigger('submit');
    // Assert
    const cards = wrapper.findAllComponents(ProductCard);
    expect(wrapper.vm.$data.searchTerm).toEqual('');
    expect(cards).toHaveLength(11);
  });
  test('should display quantity of products', async () => {
    const { wrapper, products } = await mountProductList(10);
    const quantityProductsText = `${products.length} Products`;

    const quantityLabel = wrapper.find('[data-testid="totalProductQuantity"]');

    expect(quantityLabel.text()).toEqual(quantityProductsText);
  });
  test('should display "Product" when there is only 1 product', async () => {
    const { wrapper, products } = await mountProductList(1);
    const quantityProductsText = `${products.length} Product`;

    const quantityLabel = wrapper.find('[data-testid="totalProductQuantity"]');

    expect(quantityLabel.text()).toEqual(quantityProductsText);
  });
});
