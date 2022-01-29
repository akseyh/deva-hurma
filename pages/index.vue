<template lang='pug'>
div(class="md:p-0 px-4")
  welcome-board
  .banner-area(v-if="!!banners.length")
    img.banner-area__image(
      v-for="(banner, idx) in banners"
      :key="idx"
      :src="banner.image.fields.file.url",
      @click="$router.push('/contact')"
    )
  .flex.flex-col.mt-12
    .text-4xl.font-bold.text-center Tüm Hurma Çeşitleri
    .flex.flex-wrap.mt-4.justify-center.gap-2
      product-card(
        v-for="(product, index) in products",
        :key="product.id",
        :product="product",
        @addToBasket="$store.commit('addToBasket', product)"
      )
</template>

<script>
import { mapState } from "vuex";
import WelcomeBoard from "../components/WelcomeBoard";
export default {
  name: "Home",
  components: {
    WelcomeBoard,
  },
  computed: {
    ...mapState(["products", "banners"])
  },
  async created() {
    await this.$store.dispatch("fetchProducts");
  },
};
</script>

<style lang="sass" scoped>
.banner-area
  @apply flex flex-row w-full mt-4 justify-between gap-x-4 md:flex-nowrap flex-wrap overflow-x-scroll
  &__image
    @apply cursor-pointer w-full md:w-1/2
</style>
