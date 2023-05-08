<template>
  <main>
    <v-container fluid class="pa-0">
      <v-row v-if="errorMessage !== undefined" justify="center">
        <h3>
          {{ errorMessage }}
        </h3>
      </v-row>
      <v-row v-else class="ma-0 pa-0" justify="center">
        <v-col v-for="product in products" :key="product.id" cols="auto">
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue';
import ProductCard from '@/components/product-card.vue';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default Vue.extend({
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [] as Product[],
      errorMessage: undefined as string | undefined,
    };
  },
  async created() {
    try {
      this.products = (await this.$axios.get('/api/products')).data.products;
      this.errorMessage = undefined;
    } catch (error) {
      this.errorMessage = 'Error getting product list';
    }
  },
});
</script>
