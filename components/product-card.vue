<template>
  <v-card max-width="300" min-width="300">
    <v-img height="190" :src="product.image" />
    <v-card-title class="">
      <v-row>
        <v-col class="text-truncate">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ product.title }}
              </span>
            </template>
            <span>{{ product.title }}</span>
          </v-tooltip>
        </v-col>
        <v-col cols="3" class="pa-0" align="right">
          <v-btn
            dense
            fab
            shaped
            small
            color="blue"
            style="transform: translateY(-50%)"
            @click="addToCart"
          >
            <v-icon color="white" class="pa-0 ma-0"> mdi-cart-outline </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle> $ {{ product.price }} </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { GlobalTypes } from '@/types/global-types';

export default Vue.extend({
  props: {
    product: {
      type: Object,
      required: true,
    } as PropOptions<GlobalTypes.Product>,
  },
  methods: {
    addToCart() {
      this.$cart.open();
      this.$cart.addProduct(this.product);
    },
  },
});
</script>
