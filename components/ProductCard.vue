<template lang="pug">
.product-card
  img.product-card__picture(:src="'https:' + imageLink")
  .product-card__name {{ name }}
  .product-card__price
    .product-card__discount-text(
      :class="discount ? 'product-card__discount-text--has' : 'product-card__discount-text--not'"
    ) {{ discount + '₺' }}
    .product-card__price-text(
      :class="discount ? 'product-card__price-text--has' : 'product-card__price-text--not'"
    ) {{ price + '₺' }}
  button.product-card__add-button(
    @click="$emit('addToBasket')",
    v-if="!productInBasket"
  ) Sepete Ekle
  .flex.justify-between(v-else)
    button.bg-gray-500.w-8.text-white(
      @click="$store.commit('removeToBasket', name)"
    ) -
    span {{ productInBasket.piece }}
    button.bg-gray-500.w-8.text-white(
      @click="$store.commit('addToBasket', { name, price, discount, imageLink })"
    ) +
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductCard",
  props: {
    name: String,
    price: Number,
    discount: Number,
    imageLink: {
      type: String,
      default:
        "//piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
    },
  },
  computed: {
    ...mapState(["basket"]),
    productInBasket() {
      return this.basket.find((el) => el.name === this.name && el.piece > 0);
    },
  },
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