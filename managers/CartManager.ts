import Vue from 'vue';
import { GlobalTypes } from '@/types/global-types';

export default {
  install: (Vue: any) => {
    // istanbul ignore next
    Vue.prototype.$cart = new CartManager();
  },
};

export interface CartProduct extends GlobalTypes.Product {
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
  }

  close() {
    this.state.open = false;
  }

  getState() {
    return this.state;
  }

  existProductInTheCart(product: GlobalTypes.Product): boolean {
    return !!this.state.productList.find(({ id }) => product.id === id);
  }

  increaseQuantity(index: number) {
    this.state.productList[index].quantity++;
  }

  decreaseQuantity(index: number) {
    this.state.productList[index].quantity--;
  }

  addProduct(product: GlobalTypes.Product) {
    if (this.existProductInTheCart(product)) {
      this.state.productList.find(({ id }) => product.id === id)!.quantity++;
      return;
    }
    const productAux = {
      ...product,
      quantity: 1,
    };
    this.state.productList.push(productAux);
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
