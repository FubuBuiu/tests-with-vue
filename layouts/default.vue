<template>
  <v-app>
    <v-container class="mt-3" fluid>
      <v-row align="center">
        <v-col align="left" cols="3">
          <v-row class="pa-0 ma-0">
            <v-icon class="pa-0 ma-0">mdi-map-marker-outline</v-icon>
            NY
          </v-row>
        </v-col>
        <v-col align="center" cols="6">
          <h2>Brand</h2>
        </v-col>
        <v-col align="right" cols="3">
          <v-btn elevation="0" icon>
            <v-icon class="pa-0 ma-0">mdi-cart-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn-toggle dense mandatory borderless>
          <v-btn v-ripple="false" class="text-none" plain text>Home</v-btn>
          <v-btn v-ripple="false" class="text-none" plain text>Shop</v-btn>
          <v-btn v-ripple="false" class="text-none" plain text
            >Categories</v-btn
          >
          <v-btn v-ripple="false" class="text-none" plain text>Constact</v-btn>
          <v-btn v-ripple="false" class="text-none" plain text>About</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="mx-16 px-16">
        <v-text-field
          v-model="ee"
          outlined
          dense
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
        />
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
