<template lang="pug">
div(class="md:p-0 px-4")
  .text-2xl.font-bold.mb-8(class="md:text-4xl") Diğer Ürünler
  .flex.flex-wrap.justify-center(v-if="others.length")
    product-card.mr-2.mb-2(
      v-for="(product, index) in others",
      :key="product.id",
      :product="product"
      @addToBasket="$store.commit('addToBasket', product)"
    )
  .flex.flex-wrap.justify-center.w-full.py-32.bg-green-500(v-else)
    .text-white.text-semibold.text-4xl Çok Yakında!
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
