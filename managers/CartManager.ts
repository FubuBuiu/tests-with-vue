import Vue from 'vue';
import { GlobalTypes } from '@/types/global-types';

export default {
  install: (Vue: any) => {
    // istanbul ignore next
    Vue.prototype.$cart = new CartManager();
  },
};

interface CartProduct extends GlobalTypes.Product {
  quantity: number;
}

const initialState = {
  open: false as boolean,
  productList: [] as CartProduct[],
};

export class CartManager {
  state;

  constructor() {
    this.state = Vue.observable(initialState);
  }

  open() {
    this.state.open = true;
    return this.state;
  }

  close() {
    this.state.open = false;
    return this.state;
  }

  getState() {
    return this.state;
  }

  existProductInTheCart(product: GlobalTypes.Product): boolean {
    return !!this.state.productList.find(({ id }) => product.id === id);
  }

  addProduct(product: GlobalTypes.Product) {
    if (!this.existProductInTheCart(product)) {
      const productAux = {
        ...product,
        quantity: 1,
      };
      this.state.productList.push(productAux);
    }

    return this.state;
  }

  removeProduct(productId: string) {
    this.state.productList = [
      ...this.state.productList.filter((product) => product.id !== productId),
    ];
  }

  hasProduct(): boolean {
    return this.state.productList.length > 0;
  }

  clearCart() {
    this.state.productList = [];
  }
}
