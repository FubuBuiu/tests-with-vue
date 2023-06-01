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
      <v-row v-if="cartIsEmpty" class="ma-0 mt-5" justify="center">
        Cart is empty
      </v-row>
      <CartItem
        v-for="product in cartProductList"
        v-else
        :key="product.id"
        :product="product"
      />
      <v-btn
        data-testid="checkoutButton"
        block
        class="white--text"
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
import Vue, { PropOptions } from 'vue';
import CartItem from '@/components/cart-item.vue';
import { GlobalTypes } from '@/types/global-types';

export default Vue.extend({
  components: {
    CartItem,
  },
  props: {
    cartProductList: {
      type: Array,
      default: () => [],
    } as PropOptions<Array<GlobalTypes.Product>>,
  },
  computed: {
    cartIsEmpty(): boolean {
      return !this.$cart.hasProduct();
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('close');
    },
  },
});
</script>
