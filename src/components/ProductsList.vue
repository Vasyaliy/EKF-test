<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/Products.gql')"
      :variables="{ limit: 10 }"
    >
      <template v-slot="{ result: { loading, data, error } }">
          <div v-if="data">
            <table
              align="center"
              style="border: solid 1px; width: 90%; margin: auto;"
            >
              <tr style="border: solid 1px;">
                <th class="table-row">Наименование</th>
                <th class="table-row">Артикул</th>
                <th class="table-row">Серия</th>
                <th class="table-row">Цена</th>
                <th></th>
              </tr>
              <tr
                v-for="product in data.products"
                :key="product.id"
              >
                <th class="table-row">{{ product.name }}</th>
                <th class="table-row">{{ product.vendor_code }}</th>
                <th class="table-row">{{ product.series }}</th>
                <th class="table-row">{{ Math.floor(product.prices[0].price) }}</th>
                <th>
                  <button
                    @click="currentProduct = product"
                    class="btn primary-btn"
                  > Редактировать
                </button>
                </th>
              </tr>
            </table>
          </div>
          <div v-if="error">
            Error
          </div>
      </template>
    </ApolloQuery>
    <edit-product
      v-if="currentProduct"
      :product="currentProduct"
      @close="currentProduct = null"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Product } from '../interfaces/index'
import EditProduct from './EditProduct.vue'

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    EditProduct
  },

  data () {
    return {
      currentProduct: null as null | Product
    }
  },

  methods: {
    edit (product: Product) {
      this.currentProduct = product
    }
  }
})
</script>

<style scoped lang="scss">
.table-row {
  min-width: 25%;
  // border-bottom: solid 1px;
}
</style>
