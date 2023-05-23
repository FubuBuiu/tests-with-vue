<template>
  <v-container>
    <v-row class="ma-0" justify="center">
      <v-card color="grey lighten-3" width="330" height="95" elevation="0">
        <v-row>
          <v-col cols="auto" class="ma-0 pr-0" align="left">
            <v-avatar class="rounded" size="95">
              <v-img :src="itemImage" />
            </v-avatar>
          </v-col>
          <v-col class="pl-2">
            <v-card class="pa-0" color="transparent" elevation="0" height="65">
              <v-row class="fill-height text-body-2">
                <v-col>{{ itemTitle }}</v-col>
                <v-col class="pl-0 pb-0" align="right" cols="auto">
                  {{ itemPrice }}$
                </v-col>
              </v-row>
            </v-card>
            <v-card-actions class="pa-0 ma-0 mt-3">
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
              {{ itemQuantity }}
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
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Product } from '@/state';
export default Vue.extend({
  props: {
    product: {
      type: Object,
      required: true,
    } as PropOptions<Product>,
  },
  data() {
    return {
      itemTitle: undefined as string | undefined,
      itemPrice: 0,
      itemQuantity: 1,
      itemImage: undefined as string | undefined,
    };
  },
  watch: {
    itemQuantity() {
      if (this.itemQuantity === 0) {
        this.$emit('remove');
      }
    },
  },
  created() {
    if (this.product !== undefined || Object.keys(this.product).length !== 0) {
      this.itemTitle = this.product.title;
      this.itemPrice = this.product.price;
      this.itemImage = this.product.image;
    }
  },
  methods: {
    increaseQuantity() {
      this.itemQuantity++;
    },
    decreaseQuantity() {
      if (this.itemQuantity > 0) {
        this.itemQuantity--;
      }
    },
  },
});
</script>
