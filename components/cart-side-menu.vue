<template>
  <v-navigation-drawer
    app
    right
    disable-resize-watcher
    hide-overlay
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
        v-for="(product, index) in cartProductList"
        v-else
        :key="product.id"
        :product="product"
        @remove="removeProductFromCart(index)"
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
import { Product } from '~/state';
export default Vue.extend({
  components: {
    CartItem,
  },
  props: {
    productList: {
      type: Array,
      default: () => [],
    } as PropOptions<Array<Product>>,
  },
  data() {
    return {
      cartProductList: [] as Product[],
    };
  },
  computed: {
    cartIsEmpty(): boolean {
      return this.cartProductList.length === 0;
    },
  },
  created() {
    this.cartProductList = this.productList;
  },
  methods: {
    closeDrawer() {
      this.$emit('close');
    },
    removeProductFromCart(index: number) {
      this.cartProductList.splice(index, 1);
    },
  },
});
</script>
