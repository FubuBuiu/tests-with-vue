<template>
  <v-navigation-drawer
    app
    right
    disable-resize-watcher
    temporary
    v-bind="$attrs"
  >
    <v-container class="pl-8 pr-4">
      <v-row class="pt-3 pb-3">
        <v-col align="left">
          <h2>Your cart</h2>
        </v-col>
        <v-col align="right">
          <v-btn data-testid="closeButton" icon @click="closeDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="cartIsEmpty" class="mt-5 mb-5" justify="center">
        Cart is empty
      </v-row>
      <v-row v-else class="mt-5 mb-5" justify="end">
        <v-btn
          text
          color="red"
          small
          data-testid="clearCartButton"
          @click="clearCart"
          >clear cart</v-btn
        >
        <CartItem
          v-for="product in cartProductList"
          :key="product.id"
          :product="product"
        />
      </v-row>
      <v-btn
        data-testid="checkoutButton"
        block
        class="white--text pa-0"
        elevation="0"
        color="#42A5F5"
      >
        CHECKOUT
        <v-icon>mdi-arrow-right-thin</v-icon>
      </v-btn>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import CartItem from '@/components/cart-item.vue';
import { GlobalTypes } from '@/types/global-types';

export default Vue.extend({
  components: {
    CartItem,
  },
  computed: {
    cartIsEmpty(): boolean {
      return this.cartProductList.length === 0;
    },
    cartProductList(): GlobalTypes.Product[] {
      return this.$cart.getState().productList;
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('close');
    },
    clearCart() {
      this.$cart.clearCart();
    },
  },
});
</script>
