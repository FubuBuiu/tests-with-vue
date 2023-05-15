<template>
  <v-app>
    <v-container class="mt-3" fluid>
      <v-row align="center">
        <v-col align="left" cols="3">
          <v-row class="pa-0 ma-0">
            <v-icon class="pa-0 ma-0">mdi-map-marker-outline</v-icon>
            NY
          </v-row>
        </v-col>
        <v-col align="center" cols="6">
          <h2>Brand</h2>
        </v-col>
        <v-col align="right" cols="3">
          <v-btn elevation="0" icon @click="toggleDrawer()">
            <v-icon class="pa-0 ma-0">mdi-cart-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn-toggle dense mandatory borderless>
          <v-btn v-ripple="false" class="text-none" plain text>Home</v-btn>
          <v-btn v-ripple="false" class="text-none" plain text>Shop</v-btn>
          <v-btn v-ripple="false" class="text-none" plain text
            >Categories</v-btn
          >
          <v-btn v-ripple="false" class="text-none" plain text>Constact</v-btn>
          <v-btn v-ripple="false" class="text-none" plain text>About</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-container>
    <CartSideMenu
      v-model="cartIsVisible"
      v-click-outside="{
        handler: toggleDrawer,
        closeConditional: onCloseConditional,
      }"
      width="350"
      @close="toggleDrawer"
    />
    <nuxt />
    <v-footer class="mt-5" color="#E3F2FD">
      <v-row class="pa-0 ma-0" justify="center">
        <v-col
          align="left"
          cols="6"
          style="font-size: 18px; font-weight: 600; color: #97a3b0"
        >
          Brand
        </v-col>
        <v-col
          cols="6"
          align="right"
          align-self="center"
          style="font-weight: 400; font-size: 14px; color: #97a3b0"
        >
          All rights reserved
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import CartSideMenu from '@/components/cart-side-menu.vue';
export default Vue.extend({
  components: {
    CartSideMenu,
  },
  data() {
    return {
      cartIsVisible: false as boolean,
      clickOutsideEnabled: false as boolean,
    };
  },
  watch: {
    cartIsVisible(val) {
      this.clickOutsideEnabled = val;
    },
  },
  methods: {
    toggleDrawer() {
      this.cartIsVisible = !this.cartIsVisible;
    },
    onCloseConditional() {
      return this.clickOutsideEnabled;
    },
  },
});
</script>
