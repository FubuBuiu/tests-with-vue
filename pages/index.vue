<template>
  <main>
    <v-container fluid class="pa-0">
      <SearchField @doSearch="setSearchTerm" />
      <v-row v-if="errorMessage !== undefined" justify="center">
        <h3>
          {{ errorMessage }}
        </h3>
      </v-row>
      <v-row v-if="loading" justify="center">
        <v-progress-circular indeterminate color="blue" />
      </v-row>
      <v-row v-else class="ma-0 pa-0" justify="center">
        <v-col v-for="product in list" :key="product.id" cols="auto">
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue';
import ProductCard from '@/components/product-card.vue';
import SearchField from '@/components/search-field.vue';

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

export interface Search {
  term: string;
}

export default Vue.extend({
  components: {
    ProductCard,
    SearchField,
  },
  data() {
    return {
      loading: false as boolean,
      products: [] as Product[],
      errorMessage: undefined as string | undefined,
      searchTerm: undefined as string | undefined,
    };
  },
  computed: {
    list() {
      if (this.searchTerm !== undefined && this.searchTerm !== '') {
        return this.products.filter(({ title }) => {
          return title.includes(this.searchTerm!);
        });
      }
      return this.products;
    },
  },
  async created() {
    try {
      this.loading = true;
      this.products = (await this.$axios.get('/api/products')).data.products;
      this.loading = false;
      this.errorMessage = undefined;
    } catch (error) {
      this.errorMessage = 'Error getting product list';
    }
  },
  methods: {
    setSearchTerm(search: Search) {
      this.searchTerm = search.term;
    },
  },
});
</script>
