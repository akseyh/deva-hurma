<template lang="pug">
div
  b.text-2xl.ml-4 Sepetteki Ürünler
  .my-8.flex.flex-wrap.justify-center
    span İsim Soyisim
    input.b-2.border-gray-600(
      type="text",
      label="İsim Soyisim",
      v-model="name"
    )
    product-card.mr-2.mb-2(
      v-for="product in basket",
      :key="product.id",
      :name="product.name",
      :price="product.price",
      :imageLink="product.pictureUrl",
      :discount="product.discount"
    )
  .flex.justify-end.flex-col.items-end.mr-6
    b.text-xl Toplam Tutar: {{ basketTotal }}TL
    button.bg-green-600.text-white.p-2.rounded-md.w-52(
      @click="$store.dispatch('makeOrder', { name })"
    ) Sipariş Ve
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "basket",
  computed: {
    ...mapState(["basket"]),
    ...mapGetters(["basketTotal"]),
  },
  data() {
    return {
      name: "Your name",
    };
  },
};
</script>