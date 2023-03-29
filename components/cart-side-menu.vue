<template>
  <v-navigation-drawer app right hide-overlay v-bind="$attrs">
    <v-container class="pl-8 pr-4">
      <v-row class="pt-3 pb-3">
        <v-col align="left">
          <h2>Your cart</h2>
        </v-col>
        <v-col align="right">
          <v-btn icon @click="closeDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-7 mb-2">
        <v-col align="left">
          <v-text-field
            dense
            flat
            solo
            hide-details="auto"
            color="blue"
            placeholder="Add promocode"
          />
        </v-col>
        <v-col align="right">
          <v-btn class="white--text" elevation="0" color="#42A5F5">apply</v-btn>
        </v-col>
      </v-row>
      <v-btn block class="white--text" elevation="0" color="#42A5F5">
        CHECKOUT
        <v-icon>mdi-arrow-right-thin</v-icon>
      </v-btn>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    closeDrawer() {
      this.$emit('close')
    },
  },
})
</script>
