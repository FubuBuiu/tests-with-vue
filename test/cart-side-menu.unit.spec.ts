import { expect } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import CartSideMenu from '@/components/cart-side-menu.vue';
import CartItem from '@/components/cart-item.vue';
import DefaultLayout from '@/layouts/default.vue';
import { makeServer } from '@/miragejs/server';
import { CartManager } from '@/managers/CartManager';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;
let server: any;
let cartManager: CartManager;

function mountCartSideMenu(quantityProducts = 0) {
  for (let i = 1; i <= quantityProducts; i++) {
    const product = server.create('product');
    cartManager.addProduct(product);
  }

  const wrapper = mount(CartSideMenu, {
    localVue,
    vuetify,
    mocks: { $cart: cartManager },
  });

  return { wrapper, cartManager };
}

describe('Cart', () => {
  beforeEach(() => {
    cartManager = new CartManager();
    localVue = createLocalVue();
    vuetify = new Vuetify();
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    cartManager.clearCart();
    server.shutdown();
  });
  test('should mount the component', () => {
    const { wrapper } = mountCartSideMenu();

    expect(wrapper.vm).toBeDefined();
  });
  test('should emit close event button gets clicked', async () => {
    const { wrapper } = mountCartSideMenu();

    await wrapper.find('[data-testid="closeButton"]').trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close).toHaveLength(1);
  });
  test('should hide the cart when variable cartIsVisible is not true', () => {
    // TODO Tenta encontrar outra forma de alterar o model do componente CartSideMenu
    const wrapper = mount(DefaultLayout, {
      localVue,
      vuetify,
      mocks: {
        $cart: new CartManager(),
      },
      stubs: { Nuxt: true },
      computed: {
        cartIsVisible(): boolean {
          return false;
        },
      },
    });

    const cartMenu = wrapper.findComponent(CartSideMenu);

    expect(cartMenu.classes()).toContain('v-navigation-drawer--close');
  });
  test('should display the cart when variable cartIsVisible is true', () => {
    // TODO Tenta encontrar outra forma de alterar o model do componente CartSideMenu
    const wrapper = mount(DefaultLayout, {
      localVue,
      vuetify,
      mocks: {
        $cart: new CartManager(),
      },
      stubs: { Nuxt: true },
      computed: {
        cartIsVisible(): boolean {
          return true;
        },
      },
    });

    const cartMenu = wrapper.findComponent(CartSideMenu);

    expect(cartMenu.classes()).toContain('v-navigation-drawer--open');
  });
  test('should display "Cart is empty" when there are no products', () => {
    const { wrapper } = mountCartSideMenu();

    expect(wrapper.text()).toContain('Cart is empty');
  });
  test('should display 2 instances of CartItem when 2 products are provided', () => {
    const { wrapper } = mountCartSideMenu(2);

    expect(wrapper.findAllComponents(CartItem)).toHaveLength(2);
    expect(wrapper.text()).not.toContain('Cart is empty');
  });
  test('should display "Clear cart" button', () => {
    const { wrapper } = mountCartSideMenu(2);

    const clearCartButton = wrapper.find('[data-testid="clearCartButton"]');

    expect(clearCartButton.exists()).toBe(true);
  });
  test('should hide "Clear cart" button when there is no product', () => {
    const { wrapper } = mountCartSideMenu();

    const clearCartButton = wrapper.find('[data-testid="clearCartButton"]');

    expect(clearCartButton.exists()).toBe(false);
  });
  test('should clear cart when "CLEAR CART" button gets cliked', async () => {
    const { wrapper, cartManager } = mountCartSideMenu(2);

    const clearCartButton = wrapper.find('[data-testid="clearCartButton"]');
    const spy = jest.spyOn(cartManager, 'clearCart');

    expect(cartManager.getState().productList).toHaveLength(2);
    await clearCartButton.trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(cartManager.getState().productList).toHaveLength(0);
  });
});
