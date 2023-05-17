<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="doSearch">
      <v-row justify="center">
        <v-container class="ma-0 pa-0 mt-5" style="width: 500px">
          <v-text-field
            id="search-input"
            v-model="term"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
          />
        </v-container>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      valid: true as boolean,
      term: undefined as string | undefined,
    };
  },
  watch: {
    term() {
      if (this.term === '') {
        this.doSearch();
      }
    },
  },
  methods: {
    doSearch() {
      this.$emit('doSearch', { term: this.term });
    },
  },
});
</script>
