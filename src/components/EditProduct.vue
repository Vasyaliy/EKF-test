<template>
  <div class="modal">
    <div @click="close()" class="modal-bg"></div>
    <ApolloMutation
      class="modal-content"
      :mutation="require('../graphql/updateProduct.gql')"
      :variables="{ name: product.name, vendor_code: product.vendor_code, id: product.id }"
    >
      <template v-slot="{ mutate }">
        <div>
          <span> Наименование </span>
          <input v-model="product.name">
          <span> Артикул </span>
          <input v-model="product.vendor_code">
        </div>
        <button @click="mutate()">Сохранить </button>
      </template>
    </ApolloMutation>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Product } from '../interfaces/index'

export default Vue.extend({
  props: {
    product: {
      type: Object as () => Product
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
})
</script>

<style lang="scss">

.modal {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-bg {
  width: 100vw;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.2)
}

.modal-content {
  background-color: white;
  padding: 10px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;

}
</style>
