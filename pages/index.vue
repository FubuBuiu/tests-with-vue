<template>
  <main>
    <v-container fluid class="pa-0">
      <SearchField @doSearch="setSearchTerm" />
      <v-row v-if="errorMessage !== undefined" justify="center">
        <h3>
          {{ errorMessage }}
        </h3>
      </v-row>
      <v-container fluid style="padding-left: 70px">
        <v-row class="pa-0 ma-0" style="color: #424242">
          <h2>Wrist Watch</h2>
        </v-row>
        <v-row class="pa-0 ma-0" style="color: #757575">
          <h4 data-testid="totalProductQuantity">
            {{ totalProductQuantityLabel }}
          </h4>
        </v-row>
      </v-container>
      <v-row v-if="loading" justify="center">
        <v-progress-circular indeterminate color="blue" />
      </v-row>
      <v-row v-else class="ma-0 pa-0" justify="center">
        <v-col v-for="product in list" :key="product.id" cols="auto">
          <ProductCard data-testid="productCard" :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue';
import ProductCard from '@/components/product-card.vue';
import SearchField from '@/components/search-field.vue';
import { GlobalTypes } from '@/types/global-types';

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
      products: [] as GlobalTypes.Product[],
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
    totalProductQuantityLabel(): string {
      let label: string;
      if (this.list.length === 1) {
        label = `${this.list.length} Product`;
      } else {
        label = `${this.list.length} Products`;
      }
      return label;
    },
  },
  async created() {
    try {
      this.loading = true;
      this.products = (await this.$axios.get('/api/products')).data.products;
      this.errorMessage = undefined;
    } catch (error) {
      this.errorMessage = 'Error getting product list';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    setSearchTerm(search: Search) {
      this.searchTerm = search.term;
    },
  },
});
</script>
