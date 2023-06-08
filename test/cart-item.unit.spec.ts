import { expect } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import CartItem from '@/components/cart-item.vue';
import { makeServer } from '~/miragejs/server';
import { CartManager } from '~/managers/CartManager';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;
let server: any;
let cartManager: CartManager;

function mountCartItem() {
  const product = server.create('product', {
    image:
      'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
    title: 'Relógio bonito',
    price: '45.00',
  }).attrs;

  cartManager.addProduct(product);

  const wrapper = mount(CartItem, {
    localVue,
    vuetify,
    stubs: { Nuxt: true },
    mocks: { $cart: cartManager },
    propsData: {
      product: cartManager.getState().productList[0],
      positionInCart: 0,
    },
  });

  return { wrapper, product };
}

describe('CartItem', () => {
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
    const { wrapper } = mountCartItem();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.vm.$props.product).toBeTruthy();
    expect(typeof wrapper.vm.$props.positionInCart).toBe('number');
    expect(wrapper.text()).toContain('Relógio bonito');
    expect(wrapper.text()).toContain('45.00');
  });

  test('should increase product quantity when plus button is clicked', async () => {
    const { wrapper } = mountCartItem();
    const spy = jest.spyOn(cartManager, 'increaseQuantity');

    await wrapper.find('[data-testid="plusButton"]').trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(wrapper.vm.$props.positionInCart);
    expect(wrapper.vm.$props.product.quantity).toBe(2);
  });
  test('should decrease product quantity when minus button is clicked', async () => {
    const { wrapper } = mountCartItem();
    const spy = jest.spyOn(cartManager, 'decreaseQuantity');

    await wrapper.find('[data-testid="plusButton"]').trigger('click');
    expect(wrapper.vm.$props.product.quantity).toBe(2);
    await wrapper.find('[data-testid="minusButton"]').trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(wrapper.vm.$props.positionInCart);
    expect(wrapper.vm.$props.product.quantity).toBe(1);
  });
  test('should call removeProduct() when quantity is 0', async () => {
    const { wrapper, product } = mountCartItem();

    const spyRemoveProduct = jest.spyOn(cartManager, 'removeProduct');
    const button = wrapper.find('[data-testid="minusButton"]');
    await button.trigger('click');

    expect(wrapper.vm.$props.product.quantity).toBe(0);
    expect(spyRemoveProduct).toHaveBeenCalledTimes(1);
    expect(spyRemoveProduct).toHaveBeenCalledWith(product.id);
  });
  test('should display a trash button', () => {
    const { wrapper } = mountCartItem();

    expect(wrapper.find('[data-testid="removeProductButton"]').exists()).toBe(
      true
    );
  });
  test('should call removeProduct() when trash button gets clicked', async () => {
    const { wrapper, product } = mountCartItem();

    const trashButton = wrapper.find('[data-testid="removeProductButton"]');
    const spyRemoveProduct = jest.spyOn(cartManager, 'removeProduct');
    await trashButton.trigger('click');

    expect(spyRemoveProduct).toHaveBeenCalledTimes(1);
    expect(spyRemoveProduct).toHaveBeenCalledWith(product.id);
  });
});
