<template>
  <div class="about">
    <h1>List</h1>
    <products-list />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ProductsList from '@/components/ProductsList.vue'

export default Vue.extend({
  components: {
    ProductsList
  }
})
</script>
