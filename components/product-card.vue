<template>
  <v-card>
    <v-img width="300px" height="190px" :src="productImage" />
    <v-card-title>
      <v-row>
        <v-col> {{ productTitle }} </v-col>
        <v-col cols="3" class="pa-0" align="right">
          <v-btn
            dense
            fab
            shaped
            small
            color="blue"
            style="transform: translateY(-50%)"
          >
            <v-icon color="white" class="pa-0 ma-0">mdi-cart-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle> $ {{ productPrice }} </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    productImage: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {}
  },
})
</script>
