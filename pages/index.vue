<template>
  <main>
    <v-container fluid class="pa-0">
      <v-row class="ma-0 pa-0" justify="start">
        <v-col v-for="product in products" :key="product.id" cols="auto">
          <ProductCard
            :product-image="product.image"
            :product-price="product.price"
            :product-title="product.title"
          />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue';
import ProductCard from '@/components/product-card.vue';
export default Vue.extend({
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    this.products = (await this.$axios.get('/api/products')).data.products;
  },
});
</script>
