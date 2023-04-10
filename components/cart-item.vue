<template>
  <v-container>
    <v-row class="ma-0" justify="center">
      <v-card color="grey lighten-3" width="230" height="80" elevation="0">
        <v-row>
          <v-col cols="5" class="ma-0 pr-0" align="left">
            <v-avatar class="rounded" size="80">
              <v-img eager :src="itemImage" />
            </v-avatar>
          </v-col>
          <v-col cols="7" class="pl-0">
            <v-card class="pa-0" color="transparent" elevation="0" height="65">
              <v-row class="fill-height text-body-2">
                <v-col>{{ itemName }}</v-col>
                <v-col class="pl-0 pb-0" align="right" cols="auto"
                  >{{ itemPrice }}$</v-col
                >
              </v-row>
            </v-card>
            <v-card-actions class="pa-0 ma-0">
              <v-btn
                class="ma-0 mr-1"
                x-small
                icon
                elevation="0"
                outlined
                plain
              >
                <v-icon color="black">mdi-plus</v-icon>
              </v-btn>
              {{ itemQuantity }}
              <v-btn
                class="ma-0 ml-1"
                x-small
                icon
                elevation="0"
                outlined
                plain
              >
                <v-icon color="black">mdi-minus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    product: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      itemName: undefined as string | undefined,
      itemPrice: 0,
      itemQuantity: 1,
      itemImage: undefined as string | undefined,
    }
  },
  created() {
    if (this.product !== undefined || Object.keys(this.product).length !== 0) {
      this.itemName = this.product.title
      this.itemPrice = this.product.price
      this.itemImage = this.product.image
    }
  },
})
</script>
