<template lang='pug'>
.md_p-0.px-4
  welcome-board(@scrollDown="scrollDown")
  .banner-area(v-if="!!banners.length")
    img.banner-area__image(
      v-for="(banner, idx) in banners"
      :key="idx"
      :src="banner.image.fields.file.url",
      @click="scrollDown"
    )
  .flex.flex-col.mt-12
    .text-4xl.font-bold.text-center#hurma-container Tüm Hurma Çeşitleri
    .flex.flex-wrap.mt-4.justify-center.gap-2(v-if="$fetchState.pending")
      spinner
    .flex.flex-wrap.mt-4.justify-center.gap-2(v-else)
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
  async fetch() {
    const { store } = this.$nuxt.context

    await store.dispatch("fetchProducts");
  },
  methods: {
    scrollDown() {
      var container = this.$el.querySelector('#hurma-container')
      container.scrollIntoView({behavior: 'smooth'})
    }
  }
};
</script>

<style lang="sass" scoped>
.banner-area
  @apply flex flex-row w-full mt-4 justify-between gap-x-4 md_flex-nowrap flex-wrap overflow-x-scroll
  &__image
    @apply cursor-pointer w-full md_w-1/2
</style>
