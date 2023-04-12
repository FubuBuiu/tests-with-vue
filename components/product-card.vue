<template>
  <v-card max-width="300" min-width="300">
    <v-img height="190" :src="productImage" />
    <v-card-title class="">
      <v-row>
        <v-col class="text-truncate">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ productTitle }}
              </span>
            </template>
            <span>{{ productTitle }}</span>
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
import Vue from 'vue';
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
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
});
</script>
