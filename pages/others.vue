<template lang="pug">
.flex.flex-col.mt-12
  .text-4xl.font-bold.text-center Diğer Ürünler
  .flex.flex-wrap.m-4.justify-center
    product-card.mr-2.mb-2(
      v-for="(product, index) in others",
      :key="product.id",
      :product="product"
      @addToBasket="$store.commit('addToBasket', product)"
    )
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'Others',
  computed: {
    ...mapState(["others"]),
  },
  async created() {
    await this.$store.dispatch("fetchOthers");
  },
}
</script>
