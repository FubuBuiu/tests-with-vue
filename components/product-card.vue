<template>
  <v-card>
    <v-img
      width="300px"
      height="190px"
      src="https://www.maxim.com/wp-content/uploads/2021/05/facebook-linked_image___spider-man-rj-skeletonized.jpg"
    />
    <v-card-title>
      <v-row>
        <v-col> MIRANHA WATCH </v-col>
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
    <v-card-subtitle> R$ 2.000.000,01 </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },
})
</script>
