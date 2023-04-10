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
          <v-btn icon @click="closeDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="cartIsEmpty" class="ma-0 mt-5" justify="center">
        Your cart is empty
      </v-row>
      <CartItem
        v-for="item in listCartProducts"
        v-else
        :key="item.id"
        :product="item"
      />
      <v-row class="mt-5 mb-2">
        <v-col align="left">
          <v-text-field
            dense
            flat
            solo
            hide-details="auto"
            color="blue"
            placeholder="Add promocode"
          />
        </v-col>
        <v-col align="right">
          <v-btn class="white--text" elevation="0" color="#42A5F5">apply</v-btn>
        </v-col>
      </v-row>
      <v-btn block class="white--text" elevation="0" color="#42A5F5">
        CHECKOUT
        <v-icon>mdi-arrow-right-thin</v-icon>
      </v-btn>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import CartItem from '@/components/cart-item.vue'
export default Vue.extend({
  components: {
    CartItem,
  },
  props: {
    listCartProducts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    cartIsEmpty(): boolean {
      return this.listCartProducts.length === 0
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('close')
    },
  },
})
</script>
