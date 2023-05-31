import { CartManager } from './managers/CartManager';

declare module 'vue/types/vue' {
  interface Vue {
    $cart: CartManager;
  }
}
