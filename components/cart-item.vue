<template>
  <v-container>
    <v-row class="ma-0" justify="center">
      <v-card color="grey lighten-3" width="330" height="95" elevation="0">
        <v-row>
          <v-col cols="auto" class="ma-0 pr-0" align="left">
            <v-avatar class="rounded" size="95">
              <v-img :src="product.image" />
            </v-avatar>
          </v-col>
          <v-col class="pl-2">
            <v-card class="pa-0" color="transparent" elevation="0" height="65">
              <v-row class="fill-height text-body-2">
                <v-col>{{ product.title }}</v-col>
                <v-col class="pl-0 pb-0" align="right" cols="auto">
                  ${{ product.price }}
                </v-col>
              </v-row>
            </v-card>
            <v-card-actions class="pa-0 ma-0 mt-3">
              <v-row class="pa-0 ma-0">
                <v-col class="pa-0 ma-0">
                  <v-btn
                    class="ma-0 mr-1"
                    x-small
                    icon
                    elevation="0"
                    outlined
                    plain
                    data-testid="minusButton"
                    @click="decreaseQuantity"
                  >
                    <v-icon color="black">mdi-minus</v-icon>
                  </v-btn>
                  <label data-testid="productQuantityText">
                    {{ product.quantity }}
                  </label>
                  <v-btn
                    class="ma-0 ml-1"
                    x-small
                    icon
                    elevation="0"
                    outlined
                    plain
                    data-testid="plusButton"
                    @click="increaseQuantity"
                  >
                    <v-icon color="black">mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-col class="pa-0 ma-0">
                <v-btn
                  class="ma-0 ml-1"
                  x-small
                  icon
                  elevation="0"
                  data-testid="removeProductButton"
                  @click="removeProduct"
                >
                  <v-icon color="red">mdi-trash-can</v-icon>
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { CartProduct } from '@/managers/CartManager';
export default Vue.extend({
  props: {
    product: {
      type: Object,
      required: true,
    } as PropOptions<CartProduct>,
    positionInCart: {
      type: Number,
      required: true,
    },
  },
  watch: {
    'product.quantity'(val) {
      if (val === 0) {
        this.removeProduct();
      }
    },
  },
  methods: {
    increaseQuantity() {
      this.$cart.increaseQuantity(this.positionInCart);
    },
    decreaseQuantity() {
      this.$cart.decreaseQuantity(this.positionInCart);
    },
    removeProduct() {
      this.$cart.removeProduct(this.product.id);
    },
  },
});
</script>
