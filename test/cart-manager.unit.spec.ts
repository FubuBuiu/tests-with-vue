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
    manager.clearCart();
    server.shutdown();
  });

  test('should set cart open', () => {
    manager.open();
    const state = manager.getState();

    expect(state.open).toBe(true);
  });
  test('should set cart closed', () => {
    manager.close();
    const state = manager.getState();

    expect(state.open).toBe(false);
  });
  test('should return the state ', () => {
    const product = server.create('product').attrs;

    manager.open();
    manager.addProduct(product);
    const state = manager.getState();

    expect(state).toEqual({
      productList: [
        {
          ...product,
          quantity: 1,
        },
      ],
      open: true,
    });
  });
  test('should add product to the cart only once', () => {
    const product = server.create('product').attrs;

    manager.addProduct(product);
    const state = manager.getState();

    expect(state.productList).toHaveLength(1);
  });
  test('should remove product from the cart', () => {
    const product = server.create('product').attrs;

    manager.addProduct(product);
    manager.removeProduct(product.id);
    const state = manager.getState();

    expect(state.productList).toHaveLength(0);
  });
  test('should clear cart', () => {
    const product1 = server.create('product').attrs;
    const product2 = server.create('product').attrs;

    manager.addProduct(product1);
    manager.addProduct(product2);

    expect(manager.state.productList).toHaveLength(2);

    manager.clearCart();

    expect(manager.state.productList).toHaveLength(0);
  });
  test('should return true if cart is not empty', () => {
    const product = server.create('product');

    manager.addProduct(product);

    expect(manager.hasProduct()).toBe(true);
  });
  test('should return true if product is already in the cart', () => {
    const product = server.create('product').attrs;

    manager.addProduct(product);

    expect(manager.existProductInTheCart(product)).toBe(true);
  });
  test('should increase the quantity of the product', () => {
    const product = server.create('product');
    const state = manager.getState();

    manager.addProduct(product);

    expect(state.productList[0].quantity).toBe(1);
    manager.increaseQuantity(0);
    expect(state.productList[0].quantity).toBe(2);
  });
  test('should decrease the quantity of the product', () => {
    const product = server.create('product');
    const state = manager.getState();

    manager.addProduct(product);

    expect(state.productList[0].quantity).toBe(1);
    manager.decreaseQuantity(0);
    expect(state.productList[0].quantity).toBe(0);
  });
  test('should increase the quantity of the product when trying to add a product that already exists in the cart', () => {
    const product = server.create('product').attrs;
    const state = manager.getState();

    manager.addProduct(product);
    expect(state.productList).toHaveLength(1);
    expect(state.productList[0].quantity).toBe(1);
    manager.addProduct(product);
    expect(state.productList).toHaveLength(1);
    expect(state.productList[0].quantity).toBe(2);
  });
});
