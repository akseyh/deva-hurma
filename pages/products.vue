<template lang="pug">
.flex.flex-row.flex-wrap
  product-card(
    v-for="(product, index) in products",
    :key="product.id",
    :name="product.name",
    :price="product.price",
    :imageLink="product.picture && product.picture.fields.file.url",
    :discount="product.discount",
    @addToBasket="$store.commit('addToBasket', product)"
  )
  div {{ basket }}
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Products",
  computed: {
    ...mapState(["products", "basket"]),
  },
  async created() {
    await this.$store.dispatch("fetchProducts");
  },
};
</script>