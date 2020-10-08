<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/Products.gql')"
      :variables="{ limit: 40, offset: pageNumber * 40 }"
    >
      <template v-slot="{ result: { loading, data, error } }">
          <div v-if="data && !loading">
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
      <nav style="width: 30%; margin: auto;">
        <ul class="pagination">
          <li :class="`page-item ${pageNumber > 1 ? '' : 'disabled'}`">
            <a :aria-disabled="pageNumber > 1" class="page-link" @click="$router.push(`/list?page=${pageNumber - 1}`)">
              Previous
            </a>
          </li>
          <li v-if="pageNumber > 3" class="page-item">
            <a :aria-disabled="pageNumber > 1" class="page-link" @click="$router.push(`/list?page=1`)">
              1..
            </a>
          </li>
          <li class="page-item disabled" aria-current="page"><a class="page-link">{{ pageNumber }}</a></li>
          <li class="page-item"><a class="page-link" @click="$router.push(`/list?page=${pageNumber + 1}`)">{{ pageNumber + 1 }}</a></li>
          <li class="page-item"><a class="page-link" @click="$router.push(`/list?page=${pageNumber + 2}`)">{{ pageNumber + 2 }}</a></li>
          <li class="page-item"><a class="page-link" @click="$router.push(`/list?page=${pageNumber + 3}`)">Next</a></li>
        </ul>
      </nav>
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

  watch: {
    '$route.query': {
      handler (query) {
        if (query.page === undefined) {
          this.$router.push('list' + { query: { page: 1 } })
          this.pageNumber = 1
        } else {
          this.pageNumber = parseInt(query.page)
        }
      },
      immediate: true,
      deep: true
    }
  },

  data () {
    return {
      currentProduct: null as null | Product,
      pageNumber: +this.$route.query.page
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
}
</style>
