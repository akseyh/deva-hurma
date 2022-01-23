<template lang="pug">
.product-card
  img.product-card__picture(:src="'https:' + imageLink")
  .product-card__name {{ product.name || '-' }}
  .product-card__price(v-if="hasPrice")
    .product-card__discount-text(
      :class="product.discountPrice ? 'product-card__discount-text--has' : 'product-card__discount-text--not'"
    ) {{ product.discountPrice + '₺' }}
    .product-card__price-text(
      :class="product.discountPrice ? 'product-card__price-text--has' : 'product-card__price-text--not'"
    ) {{ product.price + '₺' }}
  button.product-card__add-button(
    @click="$emit('addToBasket')",
    v-if="!productInBasket && product.stok && hasPrice"
  ) Sepete Ekle
  button(v-else-if="!product.stok || !hasPrice") Stokta Yok
  .flex.flex-col.justify-center.items-center.gap-y-2.w-full(v-else)
    .flex.justify-between.w-full
      button.bg-gray-500.w-8.text-white.rounded-sm(
        @click="$store.commit('subtractFromBasket', product.name)"
      ) -
      span {{ productInBasket.piece }}
      button.bg-green-500.w-8.text-white(
        @click="$store.commit('addToBasket', { name: product.name, price: product.price, discount: product.discountPrice, imageLink })"
      ) +
    .flex.justify-between.w-full.bg-red-500.text-sm.py-2.rounded-xl.text-white
      button(class="focus:outline-none", @click="$store.commit('removeFromBasket', product.name)").w-full Sepetten Çıkar
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductCard",
  props: {
    product: Object
  },
  computed: {
    ...mapState(["basket"]),
    productInBasket() {
      return this.basket.find((el) => el.name === this.product.name && el.piece > 0);
    },
    hasPrice() {
      return !isNaN(this.product.price) && (this.product.discountPrice === undefined || !isNaN(this.product.discountPrice)) && this.product.stok
    },
    imageLink() {
      return this.product?.picture?.fields?.file?.url || null
    }
  }
};
</script>

<style lang="sass" scoped>
.product-card
  @apply w-40 h-auto p-4 bg-gray-100 rounded-xl flex flex-col justify-between
  &__picture
    @apply w-32 h-28 rounded-xl bg-gray-200 bg-contain bg-no-repeat bg-center
  &__name
    @apply font-bold mt-2 text-green-600 text-lg break-words
  &__price
    @apply flex items-end justify-start
  &__price-text
    @apply font-thin
    &--has
      @apply text-xl line-through text-red-600
    &--not
      @apply text-3xl
  &__discount-text
    @apply font-thin text-3xl mr-4
    &--has
      @apply block
    &--not
      @apply hidden
  &__add-button
    border: 1px solid gray
    @apply w-full rounded-xl p-2 text-gray-400 hover:text-green-600 transition
  &__add-button:hover
    border: 1px solid green
</style>
