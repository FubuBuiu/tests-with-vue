import Vue from 'vue';
// import { Product } from '@/pages/index.vue';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

export const cartState = Vue.observable({
  isShow: false as boolean,
  productList: [] as Product[],
});
