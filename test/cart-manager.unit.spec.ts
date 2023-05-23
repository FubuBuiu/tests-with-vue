import { CartManager } from '@/managers/CartManager';
import { makeServer } from '~/miragejs/server';

let manager: CartManager;
let server: any;

describe('CartManager', () => {
  beforeEach(() => {
    manager = new CartManager();
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  test('should set cart open', () => {
    const state = manager.open();

    expect(state.open).toBe(true);
  });
  test('should set cart closed', () => {
    const state = manager.close();

    expect(state.open).toBe(false);
  });
  test('should add product to the cart only once', () => {
    const product = {
      ...server.create('product'),
      quantity: 1,
    };
    const state = manager.addProduct(product);

    expect(state.productList).toHaveLength(1);
  });
  test('should remove product from the cart', () => {
    const product = {
      ...server.create('product'),
      quantity: 1,
    };

    const state = manager.addProduct(product);
    manager.removeProduct(product.id);

    expect(state.productList).toHaveLength(0);
  });
  fit('should clear cart', () => {
    const product1 = {
      ...server.create('product').attrs,
    };
    const product2 = {
      ...server.create('product').attrs,
    };

    manager.addProduct(product1);
    manager.addProduct(product2);

    expect(manager.state.productList).toHaveLength(2);

    manager.clearCart();

    expect(manager.state.productList).toHaveLength(0);
  });
  test('should return true if cart is not empty', () => {
    const product = {
      ...server.create('product'),
      quantity: 1,
    };

    manager.addProduct(product);

    expect(manager.hasProduct()).toBe(true);
  });
  test('should return true if product is already in the cart', () => {
    const product = {
      ...server.create('product'),
      quantity: 1,
    };

    manager.addProduct(product);

    expect(manager.existProductInTheCart(product)).toBe(true);
  });
});
