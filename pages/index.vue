<template lang='pug'>
.w-full
  welcome-board
  .banner-area
    img.banner-area__image(
      src="~/assets/hurma-banner.png",
      @click="$router.push('/contact')"
    )
    img.banner-area__image(
      src="~/assets/kargo-banner-new.png",
      @click="$router.push('/contact')"
    )
  .flex.flex-col.mt-12
    .text-4xl.font-bold.text-center Tüm Hurma Çeşitleri
    .flex.flex-wrap.m-4.justify-center
      product-card.mr-2.mb-2(
        v-for="(product, index) in computedProducts",
        :key="product.id",
        :name="product.name",
        :price="product.price",
        :imageLink="product.pictureUrl",
        :discount="product.discount",
        :stok="product.stok",
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
    ...mapState(["products", "basket"]),
    computedProducts() {
      return this.products.map((el) => {
        const pictureUrl = el?.picture?.fields?.file?.url || null;
        return {
          ...el,
          pictureUrl,
        };
      });
    },
  },
  async created() {
    await this.$store.dispatch("fetchProducts");
  },
};
</script>

<style lang="sass" scoped>
.banner-area
  @apply flex flex-row w-full mt-4 justify-center md:flex-nowrap flex-wrap
  &__image
    @apply cursor-pointer mx-2 mt-2 w-full md:w-1/2
</style>
