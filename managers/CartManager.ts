import Vue from 'vue';
import { Product } from '@/state';

interface CartProduct extends Product {
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

  existProductInTheCart(product: Product): boolean {
    // console.log('ID DO PRODUTO----', product.id);
    return !!this.state.productList.find(({ id }) => product.id === id);
  }

  addProduct(product: Product) {
    // console.log('PRODUTO----', product);
    // console.log(
    //   'PRODUTO EXISTO NA LISTA----',
    //   this.existProductInTheCart(product)
    // );
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
